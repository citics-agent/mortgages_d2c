const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const banks = [
  { logo: `${bp}/assets/banks/vpb.png`, name: 'VPBank', scale: '80%' },
  { logo: `${bp}/assets/banks/woori.png`, name: 'Woori', scale: '55%' },
  { logo: `${bp}/assets/banks/msb.png`, name: 'MSB', scale: '60%' },
  { logo: `${bp}/assets/banks/vib.png`, name: 'VIB', scale: '60%' },
  { logo: `${bp}/assets/banks/mbv.png`, name: 'MBV', scale: '45%' },
  { logo: `${bp}/assets/banks/ocb.png`, name: 'OCB', scale: '60%' },
  { logo: `${bp}/assets/banks/hdbank.png`, name: 'HDBank', scale: '70%' },
  { logo: `${bp}/assets/banks/bvb.png`, name: 'BVB', scale: '65%' },
];

export default function Banks() {
  return (
    <section className="section banks" id="banks">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">8 ngân hàng đối tác</h2>
        </div>

        <div className="banks-grid reveal">
          {banks.map((bank, i) => (
            <div className="bank-card" key={i}>
              <img
                src={bank.logo}
                alt={bank.name}
                className="bank-logo"
                style={{ maxWidth: bank.scale }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
