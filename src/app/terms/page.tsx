export default function TermsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary">利用規約</h1>
      <div className="mt-4 space-y-4 text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-text-primary">免責事項</h2>
          <p className="mt-2">
            本サービスは医療機器ではありません。提供される情報は、日々の認知コンディションの変化を
            可視化するためのものであり、医学的診断、治療、予防を目的としたものではありません。
          </p>
          <p className="mt-2">
            気になる症状がある場合は、医療専門家にご相談ください。
          </p>
        </section>
      </div>
    </div>
  );
}
