import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 認知コンディション AI",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text-primary">プライバシーポリシー</h1>
        <p className="mt-2 text-base text-text-secondary">最終更新日: 2026年3月18日</p>

        <div className="mt-8 space-y-8 text-lg leading-relaxed text-slate-700">

          <section>
            <h2 className="text-xl font-semibold text-text-primary">1. はじめに</h2>
            <p className="mt-3">
              認知コンディション AI（以下「本サービス」）を運営する黒川 将大（以下「運営者」）は、
              お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">2. 収集する情報</h2>
            <p className="mt-3">本サービスでは、以下の情報を収集します。</p>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">2-1. お客様から直接提供される情報</h3>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>メールアドレス（アカウント登録時）</li>
              <li>パスワード（暗号化して保存）</li>
              <li>AIトークでの入力内容</li>
              <li>ひとことメモの入力内容</li>
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">2-2. サービス利用時に自動的に収集される情報</h3>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>認知チェックの結果（反応速度・短期記憶・注意切替のスコア）</li>
              <li>チェック実施日時</li>
              <li>AI分析の結果</li>
              <li>サービスの利用状況（アクセスログ）</li>
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">2-3. 決済に関する情報</h3>
            <p className="mt-2">
              クレジットカード情報は運営者が直接取り扱うことはありません。
              決済処理はStripe, Inc.が行い、同社のプライバシーポリシーに基づき管理されます。
              運営者が保持するのは、Stripeが発行する顧客IDおよびサブスクリプションIDのみです。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">3. 情報の利用目的</h2>
            <p className="mt-3">収集した情報は、以下の目的で利用します。</p>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>本サービスの提供・運営・維持</li>
              <li>認知コンディションの可視化・AI分析の提供</li>
              <li>お問い合わせへの対応</li>
              <li>サービスの改善および新機能の開発（匿名化処理後）</li>
              <li>利用規約への違反行為の検知・対応</li>
              <li>お客様への重要なお知らせの通知</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">4. 情報の保管とセキュリティ</h2>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>データはSupabase（クラウドデータベース）に暗号化された状態で保存されます。</li>
              <li>Row Level Security（RLS）により、お客様ご本人のデータにのみアクセスできるよう制御されています。</li>
              <li>通信はすべてSSL/TLSにより暗号化されています。</li>
              <li>パスワードはハッシュ化（bcrypt）された状態で保存され、平文での保存は行いません。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">5. 第三者への情報提供</h2>
            <p className="mt-3">
              運営者は、以下の場合を除き、お客様の個人情報を第三者に提供しません。
            </p>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>お客様の同意がある場合</li>
              <li>法令に基づく開示請求があった場合</li>
              <li>人の生命・身体・財産の保護のために必要な場合</li>
              <li>サービスの提供に必要な業務委託先（以下参照）への提供</li>
            </ol>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">利用している外部サービス</h3>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li><strong>Supabase</strong>（データベース・認証）— データの保管・ユーザー認証</li>
              <li><strong>Stripe</strong>（決済処理）— サブスクリプション決済</li>
              <li><strong>Anthropic Claude API</strong>（AI分析）— 認知チェック結果に基づくAI分析・AIトーク</li>
              <li><strong>Vercel</strong>（ホスティング）— Webアプリケーションの配信</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">6. AI機能における情報の取り扱い</h2>
            <p className="mt-3">
              本サービスのAI機能（AI分析・AIトーク）では、お客様の認知チェック結果および入力内容を
              Anthropic社のClaude APIに送信して分析を行います。
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>送信されるデータにはお客様のメールアドレスや個人を特定できる情報は含まれません。</li>
              <li>Anthropic社はAPIを通じて受信したデータをモデルの学習に使用しません（Anthropic社の利用規約に基づく）。</li>
              <li>AI分析の結果は本サービス内でのみ使用され、第三者に提供されることはありません。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">7. お客様の権利</h2>
            <p className="mt-3">お客様は、以下の権利を有します。</p>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li><strong>アクセス権</strong>: ご自身のデータの開示を請求する権利</li>
              <li><strong>訂正権</strong>: ご自身のデータの訂正を請求する権利</li>
              <li><strong>削除権</strong>: ご自身のデータの削除を請求する権利</li>
              <li><strong>データポータビリティ</strong>: ご自身のデータをエクスポートする権利（設定画面から可能）</li>
            </ol>
            <p className="mt-2">
              上記の権利を行使される場合は、メールアドレス（cognicondition@gmail.com）までご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">8. Cookieの使用</h2>
            <p className="mt-3">
              本サービスでは、認証状態の維持のためにCookie（セッションCookie）を使用しています。
              広告目的のCookieやトラッキングCookieは使用しておりません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">9. 未成年者の利用</h2>
            <p className="mt-3">
              18歳未満の方が本サービスを利用する場合は、保護者の同意が必要です。
              運営者が18歳未満の方の個人情報を意図せず収集したことが判明した場合、速やかに当該情報を削除します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">10. ポリシーの変更</h2>
            <p className="mt-3">
              運営者は、必要に応じて本ポリシーを変更する場合があります。
              重要な変更を行う場合は、本サービス上での掲示またはメールにより事前にお知らせします。
            </p>
          </section>

          <section className="rounded-xl border border-sky-100 bg-sky-50 p-6">
            <h2 className="text-xl font-semibold text-text-primary">お問い合わせ窓口</h2>
            <dl className="mt-3 space-y-2">
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-base text-text-secondary">運営者</dt>
                <dd>黒川 将大</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-base text-text-secondary">メール</dt>
                <dd>cognicondition@gmail.com</dd>
              </div>
            </dl>
          </section>

        </div>
      </div>
    </div>
  );
}
