import EForm from './EForm';

export default function Policies() {
  return (
    <section className="section policies" id="policies">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title section-title--white">
            Chính sách &amp; Ưu đãi Độc Quyền
          </h2>
        </div>

        <div className="policy-grid">
          {/* Card 1: Cashback */}
          <div className="policy-card reveal reveal-delay-1">
            <div className="policy-accent">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="10.5"
                  stroke="white"
                  strokeWidth="1.75"
                />
                <path
                  d="M14 7.5v13"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5 11.5c0-1.38 1.57-2.5 3.5-2.5s3.5 1.12 3.5 2.5-1.57 2.5-3.5 2.5-3.5 1.12-3.5 2.5 1.57 2.5 3.5 2.5 3.5-1.12 3.5-2.5"
                  stroke="#FFBF01"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="policy-value">0.3%</div>
            <h3 className="policy-title">Cashback độc quyền</h3>
          </div>

          {/* Card 2: Sơ bộ giá trị tài sản */}
          <div className="policy-card reveal reveal-delay-2">
            <div className="policy-accent">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="7"
                  y="4"
                  width="14"
                  height="20"
                  rx="2.5"
                  stroke="white"
                  strokeWidth="1.75"
                />
                <path
                  d="M10.5 4V3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="10"
                  y1="11"
                  x2="18"
                  y2="11"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <line
                  x1="10"
                  y1="15"
                  x2="16"
                  y2="15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M15 19l2 2 4-3.5"
                  stroke="#FFBF01"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="policy-value policy-value--text">Miễn phí</div>
            <h3 className="policy-title">Sơ bộ giá trị tài sản</h3>
          </div>
        </div>

        {/* Inline EForm */}
        <div className="policies-form-wrap">
          <EForm
            variant="compact"
            id="form3"
            formId="mortgageForm3"
            title="Nhận ưu đãi độc quyền từ Citics Mortgages"
            buttonText="Nhận ưu đãi"
            inline
          />
        </div>
      </div>
    </section>
  );
}
