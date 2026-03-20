import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | 認知コンディション AI",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text-primary">利用規約</h1>
        <p className="mt-2 text-base text-text-secondary">最終更新日: 2026年3月15日</p>

        <div className="mt-8 space-y-8 text-lg leading-relaxed text-slate-700">

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第1条（サービスの概要）</h2>
            <p className="mt-3">
              「認知コンディション AI」（以下「本サービス」）は、日々の認知コンディションの変化を可視化し、
              生活習慣の振り返りを支援するWebアプリケーションです。
              反応速度・短期記憶・注意切替の3つのチェックを通じて、ご自身のコンディション変化を記録・確認できます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第2条（医療機器非該当の明示）</h2>
            <p className="mt-3">
              本サービスは医療機器ではありません。本サービスで提供されるスコア、AI分析、コメント等の情報は、
              医学的な診断、治療、予防を目的としたものではなく、PMDA（独立行政法人 医薬品医療機器総合機構）が
              定める医療機器プログラムには該当しません。
            </p>
            <p className="mt-2">
              本サービスの結果をもとに医学的判断を行うことはできません。
              気になる点がある場合は、医療の専門家にご相談ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第3条（利用条件）</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>本サービスの利用には、メールアドレスによるアカウント登録が必要です。</li>
              <li>利用者は、正確な情報を提供し、登録情報を最新の状態に保つものとします。</li>
              <li>利用者は、自己の責任において本サービスを利用するものとします。</li>
              <li>18歳未満の方は、保護者の同意を得た上でご利用ください。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第4条（料金プラン）</h2>
            <p className="mt-3">
              本サービスには無料プランとプレミアムプラン（月額580円 / 年額4,800円、税込）があります。
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>無料プラン: 1日1回の認知チェック、7日目に1回のAI分析体験が含まれます。</li>
              <li>プレミアムプラン: AI詳細分析、AIトーク、履歴グラフ（90日）、データエクスポート等の追加機能が利用できます。</li>
              <li>決済はStripeを通じて処理されます。クレジットカード情報は運営者が直接取り扱うことはありません。</li>
              <li>サブスクリプションの解約は設定画面からいつでも可能です。解約後も有効期間内はプレミアム機能をご利用いただけます。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第5条（AI機能について）</h2>
            <p className="mt-3">
              本サービスではAI（人工知能）を活用した分析・対話機能を提供しています。
              AI機能の出力は統計的な傾向の提示であり、確定的な判断や助言ではありません。
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>AIの出力は「〜傾向があります」「〜かもしれません」等の表現を用い、断定的な表現は行いません。</li>
              <li>AIの出力内容の正確性・完全性を保証するものではありません。</li>
              <li>AI機能の改善のため、匿名化されたデータを分析に使用する場合があります。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第6条（個人情報の取り扱い）</h2>
            <p className="mt-3">
              運営者は、利用者の個人情報を適切に管理し、以下の目的以外には使用しません。
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>本サービスの提供・運営のため</li>
              <li>利用者からのお問い合わせへの対応のため</li>
              <li>本サービスの改善・新機能開発のため（匿名化処理後）</li>
              <li>利用規約に違反する行為への対応のため</li>
            </ol>
            <p className="mt-3">
              チェック結果やAI対話の内容は暗号化された状態で保存され、利用者本人のみがアクセスできます。
              利用者はいつでもデータの削除を要請できます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第7条（禁止事項）</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>本サービスを医療行為の代替として使用すること</li>
              <li>本サービスの結果を第三者に対する医学的助言として使用すること</li>
              <li>不正アクセス、サーバーへの過負荷を生じさせる行為</li>
              <li>他の利用者の情報を不正に取得する行為</li>
              <li>本サービスのリバースエンジニアリングや複製</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第8条（免責事項）</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>本サービスは現状有姿で提供され、特定の目的への適合性を保証するものではありません。</li>
              <li>本サービスの利用に起因して利用者に生じた損害について、運営者は故意または重過失がある場合を除き責任を負いません。</li>
              <li>サーバーの障害、メンテナンス等により、サービスを一時的に停止する場合があります。</li>
              <li>本サービスは予告なく機能変更・終了する場合があります。終了の際は30日前までに通知します。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第9条（知的財産権）</h2>
            <p className="mt-3">
              本サービスに関するすべての知的財産権は運営者に帰属します。
              利用者が本サービスに入力したデータの権利は利用者に帰属しますが、
              匿名化されたデータの統計的利用権は運営者に付与されるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第10条（規約の変更）</h2>
            <p className="mt-3">
              運営者は、必要に応じて本規約を変更できるものとします。
              変更の際は、本サービス上での掲示により利用者に通知します。
              変更後の利用規約は、掲示された時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">第11条（準拠法・管轄）</h2>
            <p className="mt-3">
              本規約は日本法に準拠し、解釈されるものとします。
              本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section className="rounded-xl border border-sky-100 bg-sky-50 p-6">
            <h2 className="text-xl font-semibold text-text-primary">運営者情報</h2>
            <dl className="mt-3 space-y-2">
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-base text-text-secondary">運営者</dt>
                <dd>黒川 将大</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-base text-text-secondary">連絡先</dt>
                <dd>アプリ内の設定画面よりお問い合わせください</dd>
              </div>
            </dl>
          </section>

        </div>
      </div>
    </div>
  );
}
