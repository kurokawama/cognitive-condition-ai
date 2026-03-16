import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/terms", "/check-demo", "/about", "/subscription"];
const PUBLIC_PREFIXES = ["/blog"];

function isPublicPath(pathname: string): boolean {
  return (
    PUBLIC_PATHS.some((p) => pathname === p) ||
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))
  );
}

/** Prevent LINE in-app browser and other aggressive caches from serving stale HTML */
function setNoCacheHeaders(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Skip auth when Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const pathname = request.nextUrl.pathname;
    if (isPublicPath(pathname)) {
      return setNoCacheHeaders(supabaseResponse);
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return setNoCacheHeaders(NextResponse.redirect(url));
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Public paths — no auth required
  if (isPublicPath(pathname)) {
    return setNoCacheHeaders(supabaseResponse);
  }

  // Protected paths — redirect to login if no user
  if (!user && pathname.startsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return setNoCacheHeaders(NextResponse.redirect(url));
  }

  return setNoCacheHeaders(supabaseResponse);
}
