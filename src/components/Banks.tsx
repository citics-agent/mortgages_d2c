const banks = [
  { className: 'bank-name--vcb', name: 'Vietcombank' },
  { className: 'bank-name--bidv', name: 'BIDV' },
  { className: 'bank-name--sacom', name: 'Sacombank' },
  { className: 'bank-name--tcb', name: 'Techcombank' },
  { className: 'bank-name--vpb', name: 'VPBank' },
  { className: 'bank-name--msb', name: 'MSB' },
  { className: 'bank-name--mb', name: 'MB Bank' },
  { className: 'bank-name--ocb', name: 'OCB' },
  { className: 'bank-name--vtb', name: 'VietinBank' },
  { className: 'bank-name--agr', name: 'Agribank' },
  { className: 'bank-name--acb', name: 'ACB' },
  { className: 'bank-name--shb', name: 'SHB' },
];

export default function Banks() {
  return (
    <section className="section banks" id="banks">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">32 ngân hàng đối tác</h2>
        </div>

        <div className="banks-grid reveal">
          {banks.map((bank, i) => (
            <div className="bank-card" key={i}>
              <span className={bank.className}>{bank.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
