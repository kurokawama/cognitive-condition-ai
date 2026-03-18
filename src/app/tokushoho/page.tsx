import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | 認知コンディション AI",
};

export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text-primary">特定商取引法に基づく表記</h1>
        <p className="mt-2 text-base text-text-secondary">最終更新日: 2026年3月18日</p>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-lg">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">販売事業者</th>
                <td className="px-6 py-4 text-slate-700">黒川 雅史</td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">運営統括責任者</th>
                <td className="px-6 py-4 text-slate-700">黒川 雅史</td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">所在地</th>
                <td className="px-6 py-4 text-slate-700">（バーチャルオフィス契約後に記載予定）</td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">電話番号</th>
                <td className="px-6 py-4 text-slate-700">（バーチャルオフィス契約後に記載予定）</td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">メールアドレス</th>
                <td className="px-6 py-4 text-slate-700">cognicondition@gmail.com</td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">販売URL</th>
                <td className="px-6 py-4 text-slate-700">https://cognitive-condition-ai.vercel.app</td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">販売価格</th>
                <td className="px-6 py-4 text-slate-700">
                  <ul className="list-inside list-disc space-y-1">
                    <li>無料プラン: 0円</li>
                    <li>プレミアム月額プラン: 580円（税込）</li>
                    <li>プレミアム年額プラン: 4,800円（税込）</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">販売価格以外の必要料金</th>
                <td className="px-6 py-4 text-slate-700">
                  インターネット接続に必要な通信料はお客様のご負担となります。
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">お支払い方法</th>
                <td className="px-6 py-4 text-slate-700">
                  クレジットカード（Visa、Mastercard、American Express、JCB）
                  <br />
                  <span className="text-base text-text-secondary">※ 決済処理はStripe, Inc.が行います</span>
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">お支払い時期</th>
                <td className="px-6 py-4 text-slate-700">
                  サブスクリプション登録時に初回決済が行われ、以降は契約期間（月次または年次）ごとに自動更新されます。
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">サービス提供時期</th>
                <td className="px-6 py-4 text-slate-700">
                  お支払い確認後、即時にプレミアム機能をご利用いただけます。
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">キャンセル・解約について</th>
                <td className="px-6 py-4 text-slate-700">
                  <ul className="list-inside list-disc space-y-1">
                    <li>解約はアプリ内の設定画面からいつでも可能です。</li>
                    <li>解約後も、現在の請求期間の終了日までプレミアム機能をご利用いただけます。</li>
                    <li>日割り返金は行っておりません。</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">返品・返金について</th>
                <td className="px-6 py-4 text-slate-700">
                  デジタルコンテンツの性質上、お支払い後の返品・返金はお受けしておりません。
                  ただし、サービスに重大な不具合がある場合は、個別にご対応いたします。
                  お問い合わせはメールアドレスまでご連絡ください。
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">動作環境</th>
                <td className="px-6 py-4 text-slate-700">
                  <ul className="list-inside list-disc space-y-1">
                    <li>Google Chrome（最新版）</li>
                    <li>Safari（最新版）</li>
                    <li>Microsoft Edge（最新版）</li>
                    <li>iOS Safari / Android Chrome（最新版）</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="w-1/3 bg-slate-50 px-6 py-4 text-left font-semibold text-text-primary">特記事項</th>
                <td className="px-6 py-4 text-slate-700">
                  本サービスは医療機器ではなく、医学的な診断・治療・予防を目的としたものではありません。
                  健康に関する懸念がある場合は、医療の専門家にご相談ください。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
