'use client';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const customers = [
  {
    title: 'Người mua nhà lần đầu',
    desc: 'Cần tư vấn lãi suất, hồ sơ vay lần đầu',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFBF01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Người nâng cấp nhà',
    desc: 'Muốn đổi sang nhà lớn hơn, cần tái cấu trúc khoản vay',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFBF01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
        <polyline points="7.5 19.79 7.5 14.6 3 12"/>
        <polyline points="21 12 16.5 14.6 16.5 19.79"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    title: 'Nhà đầu tư BĐS',
    desc: 'Cần vay nhanh, tỷ lệ cao, nhiều khoản vay song song',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFBF01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    title: 'Chủ doanh nghiệp SMEs',
    desc: 'Thế chấp tài sản cho vốn kinh doanh',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFBF01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      </svg>
    ),
  },
  {
    title: 'Người tái cấu trúc khoản vay',
    desc: 'Giảm lãi suất, kéo dài kỳ hạn, chuyển ngân hàng',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFBF01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
    ),
  },
];

const bankLogos = [
  { name: 'VPBank', logo: `${bp}/assets/banks/vpb.png` },
  { name: 'OCB', logo: `${bp}/assets/banks/ocb.png` },
  { name: 'HDBank', logo: `${bp}/assets/banks/hdbank.png` },
  { name: 'VIB', logo: `${bp}/assets/banks/vib.png` },
  { name: 'MSB', logo: `${bp}/assets/banks/msb.png` },
  { name: 'MB', logo: `${bp}/assets/banks/mb.png` },
];

export default function OperatingModel() {
  // viewBox: 896 x 560 — left cards end at x=310, hub center ~448, right block starts ~586
  // 5 rows: y = 56, 168, 280, 392, 504  (row height ~112, centered)
  // hub center y = 280
  // right block center y = 280
  return (
    <section className="section opmodel" id="opmodel">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">Citics Mortgages hoạt động ra sao?</h2>
          <p className="section-subtitle opmodel-sub">Mô hình hoạt động</p>
        </div>

        {/* Labels row */}
        <div className="opmodel-labels reveal">
          <span className="opmodel-label opmodel-label--left">Khách hàng</span>
          <span className="opmodel-label opmodel-label--right">Ngân hàng đối tác</span>
        </div>

        <div className="opmodel-diagram reveal">
          {/* SVG connector lines — exact CACN style */}
          <svg className="opmodel-lines" viewBox="0 0 896 560" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="opm-arr-gray" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 L3,6 Z" fill="#9ca3af" />
              </marker>
              <marker id="opm-arr-blue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 L3,6 Z" fill="#0741DA" />
              </marker>
            </defs>
            {/* Left: 5 cards → hub center */}
            <polyline points="280,56 340,56 420,230" fill="none" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#opm-arr-gray)" />
            <polyline points="280,168 340,168 420,250" fill="none" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#opm-arr-gray)" />
            <polyline points="280,280 425,280" fill="none" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#opm-arr-gray)" />
            <polyline points="280,392 340,392 420,310" fill="none" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#opm-arr-gray)" />
            <polyline points="280,504 340,504 420,330" fill="none" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#opm-arr-gray)" />
            {/* Right: hub center → bank block */}
            <polyline points="475,280 630,280" fill="none" stroke="#0741DA" strokeWidth="2.5" markerEnd="url(#opm-arr-blue)" />
          </svg>

          {/* LEFT: Customer segments */}
          <div className="opmodel-side opmodel-side--left">
            {customers.map((c, i) => (
              <div className="opmodel-card opmodel-card--white" key={i}>
                <div className="opmodel-card-icon">{c.icon}</div>
                <div className="opmodel-card-text">
                  <div className="opmodel-card-title">{c.title}</div>
                  <div className="opmodel-card-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER HUB */}
          <div className="opmodel-hub-wrap">
            <div className="opmodel-center">
              <img
                className="opmodel-logo"
                src={`${bp}/assets/logo-mortgages-w.png`}
                alt="Citics Mortgages"
              />
            </div>
          </div>

          {/* RIGHT: Bank partners — single block, full height */}
          <div className="opmodel-side opmodel-side--right">
            <div className="opmodel-bank-block">
              <div className="opmodel-bank-logos">
                {bankLogos.map((b, i) => (
                  <img key={i} className="opmodel-bank-logo" src={b.logo} alt={b.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
