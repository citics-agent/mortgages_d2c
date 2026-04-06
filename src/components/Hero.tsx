const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-inner">
        <div className="hero-top">
          <h1 className="hero-headline">
            La Bàn Cho Vay<br />
            Thế Chấp Bất Động Sản
          </h1>
          <p className="hero-sub">
            Giúp bạn kết nối hồ sơ vay thế chấp với ngân hàng phù hợp, tăng khả năng phê duyệt và tiết kiệm thời gian chuẩn bị thủ tục.
          </p>
        </div>
        <div className="hero-bottom">
          <div className="hero-content">
            <ul className="hero-checks">
              <li><span className="check-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3l9 7.5" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12v7a1 1 0 001 1h4v-4a2 2 0 014 0v4h4a1 1 0 001-1v-7" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><strong className="hero-keyword">Miễn phí</strong> định giá bất động sản (sơ bộ)</span></li>
              <li><span className="check-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="var(--amber)" strokeWidth="2"/><path d="M9 9h6M9 13h4" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round"/></svg></span><span><strong className="hero-keyword">Miễn phí</strong> tư vấn hồ sơ vay</span></li>
              <li><span className="check-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="1" y="6" width="22" height="14" rx="3" stroke="var(--amber)" strokeWidth="2"/><path d="M6 13h3M15 13h3" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="13" r="2" fill="var(--amber)" opacity="0.4"/></svg></span><span>Đánh giá độ phù hợp với <strong className="hero-keyword">8+ ngân hàng</strong></span></li>
              <li><span className="check-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="var(--amber)" strokeWidth="2"/><path d="M12 7v5l3 2" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span>Ngân hàng phản hồi trong vòng <strong className="hero-keyword">24h</strong> <span className="hero-tooltip-wrap" tabIndex={0}>(*)<span className="hero-tooltip">Thời gian trung bình</span></span></span></li>
              <li><span className="check-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5z" stroke="var(--amber)" strokeWidth="2" strokeLinejoin="round"/></svg></span><span>Ưu đãi <strong className="hero-keyword">độc quyền</strong> từ Ngân hàng &amp; Citics</span></li>
              <li><span className="check-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="var(--amber)" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><strong className="hero-keyword">Minh bạch</strong> chi phí</span></li>
            </ul>
            <div className="hero-cta-row">
              <a href="#form1" className="btn btn-amber btn-lg">
                Nhận tư vấn miễn phí
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={`${bp}/assets/hero-banner.png`}
              alt="Citics Mortgages – Tư vấn vay thế chấp"
              className="hero-visual-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
