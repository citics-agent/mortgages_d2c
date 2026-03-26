export default function Solutions() {
  return (
    <section className="section solutions" id="solutions">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Citics Mortgages kết nối người có nhu cầu vay thế chấp bất động sản với ngân hàng phù hợp</h2>
        </div>
        <div className="bento-grid">
          {/* Large — spans 2 cols */}
          <div className="bento-card bento-card--lg reveal reveal-delay-1">
            <div className="bento-card-inner">
              <div className="solution-icon">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                  <path d="M4 28l6-8 4 4 6-10 6 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="28" cy="6" r="4" fill="rgba(17,218,239,0.25)" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="bento-title">Phân tích hồ sơ vay</h3>
              <p className="bento-desc">Đánh giá khả năng vay dựa trên thu nhập và tài sản</p>
            </div>
            <div className="bento-deco bento-deco--chart">
              <svg viewBox="0 0 200 120" fill="none">
                <path d="M0 100 L40 70 L80 85 L120 40 L160 55 L200 20" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.15" />
                <path d="M0 100 L40 70 L80 85 L120 40 L160 55 L200 20 V120 H0 Z" fill="url(#chartGrad)" opacity="0.06" />
                <defs><linearGradient id="chartGrad" x1="100" y1="20" x2="100" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="var(--blue)" /><stop offset="1" stopColor="var(--blue)" stopOpacity="0" /></linearGradient></defs>
              </svg>
            </div>
          </div>

          {/* Regular */}
          <div className="bento-card reveal reveal-delay-2">
            <div className="solution-icon">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="8" width="28" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
                <path d="M8 17h4M20 17h4M8 21h3M21 21h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="17" r="3" fill="currentColor" opacity="0.15" />
              </svg>
            </div>
            <h3 className="bento-title">So sánh nhiều ngân hàng</h3>
            <p className="bento-desc">Đề xuất ngân hàng phù hợp với hồ sơ và mục tiêu ưu tiên: lãi suất, tốc độ giải ngân, hạn mức vay,...</p>
          </div>

          {/* Accent — 1 col */}
          <div className="bento-card bento-card--accent reveal reveal-delay-3">
            <div className="solution-icon">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <path d="M16 4l3 9h9l-7.5 5.5 3 9L16 23l-7.5 5.5 3-9L4 13h9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="bento-title">Chính sách ưu đãi</h3>
            <p className="bento-desc">Các chính sách ngân hàng cho đối tác chiến lược</p>
          </div>

          {/* Large — spans 2 cols */}
          <div className="bento-card bento-card--lg reveal reveal-delay-4">
            <div className="bento-card-inner">
              <div className="solution-icon">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                  <rect x="7" y="4" width="18" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 13h8M12 17h6M12 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 9l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="bento-title">Hỗ trợ chuẩn bị hồ sơ</h3>
              <p className="bento-desc">Tư vẫn hồ sơ miễn phí. giúp tăng khả năng phê duyệt khoản vay</p>
            </div>
            <div className="bento-deco bento-deco--chart">
              <svg viewBox="0 0 200 120" fill="none">
                <rect x="10" y="80" width="24" height="30" rx="4" fill="var(--blue)" opacity="0.08" />
                <rect x="44" y="55" width="24" height="55" rx="4" fill="var(--blue)" opacity="0.1" />
                <rect x="78" y="35" width="24" height="75" rx="4" fill="var(--blue)" opacity="0.12" />
                <path d="M18 75l22-20 22-10 22-15" stroke="var(--turquoise)" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
              </svg>
            </div>
          </div>

          {/* Wide bottom — spans full */}
          <div className="bento-card bento-card--wide reveal reveal-delay-4">
            <div className="solution-icon">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <path d="M6 16c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 16h12M16 10l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="bento-title">Quy trình giải ngân</h3>
              <p className="bento-desc">Kết nối hồ sơ &amp; Quy trình giải ngân minh bạch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
