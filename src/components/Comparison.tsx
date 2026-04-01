const iconSize = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5" } as const;

const problems = [
  {
    title: "Thiếu kiến thức vay",
    desc: "Lần đầu đi vay, không biết quy trình, lãi suất, hồ sơ",
    icon: <svg {...iconSize}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  },
  {
    title: "Chọn sai ngân hàng",
    desc: "Nhu cầu vốn cao nhưng chọn ngân hàng hạn mức thấp",
    icon: <svg {...iconSize}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><line x1="9" y1="14" x2="15" y2="14" strokeWidth="2" /></svg>,
  },
  {
    title: "Bỏ lỡ ưu đãi",
    desc: "Thuộc nhóm đặc biệt nhưng lại chọn gói vay tiêu chuẩn",
    icon: <svg {...iconSize}><path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5z" strokeLinejoin="round" /></svg>,
  },
  {
    title: "Hồ sơ bị từ chối",
    desc: "Cần vốn nhanh nhưng bị từ chối liên tục, giải ngân chậm",
    icon: <svg {...iconSize}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>,
  },
];

const solutions = [
  {
    title: "Tư vấn chuyên sâu miễn phí",
    desc: "Hướng dẫn quy trình, hồ sơ, lãi suất từ A-Z",
    icon: <svg {...iconSize}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  },
  {
    title: "So sánh 8+ ngân hàng",
    desc: "Đề xuất ngân hàng phù hợp nhất với hồ sơ",
    icon: <svg {...iconSize}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  },
  {
    title: "Ưu đãi độc quyền",
    desc: "Chính sách đặc biệt từ ngân hàng đối tác Citics",
    icon: <svg {...iconSize}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>,
  },
  {
    title: "Tối ưu hồ sơ & giải ngân nhanh",
    desc: "Hỗ trợ chuẩn bị hồ sơ, tăng tỷ lệ duyệt vay",
    icon: <svg {...iconSize}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
];

export default function Comparison() {
  return (
    <section className="section comparison" id="comparison">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">Vì sao chọn Citics Mortgages?</h2>
          <p className="section-subtitle comparison-subtitle">
            Người vay đang đối mặt với nhiều khó khăn khi tự tìm khoản vay phù hợp. Citics Mortgages giải quyết tất cả.
          </p>
        </div>

        {/* Labels */}
        <div className="comparison-labels reveal">
          <span className="comparison-label comparison-label--problem">Khó khăn khi tự vay</span>
          <span className="comparison-label comparison-label--solution">Citics Mortgages giải quyết</span>
        </div>

        {/* Hub diagram */}
        <div className="comparison-diagram reveal">
          {/* SVG connector lines */}
          <svg className="comparison-lines" viewBox="0 0 896 456" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arr-gray" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#9ca3af" />
              </marker>
              <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#0741DA" />
              </marker>
            </defs>
            {/* Left: cards → hub */}
            <polyline points="310,48 334,48 381,168" fill="none" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr-gray)" />
            <polyline points="310,168 334,168 363,198" fill="none" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr-gray)" />
            <polyline points="310,288 334,288 363,258" fill="none" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr-gray)" />
            <polyline points="310,408 334,408 381,288" fill="none" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr-gray)" />
            {/* Right: hub → cards */}
            <polyline points="515,168 562,48 586,48" fill="none" stroke="#0741DA" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
            <polyline points="533,198 562,168 586,168" fill="none" stroke="#0741DA" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
            <polyline points="533,258 562,288 586,288" fill="none" stroke="#0741DA" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
            <polyline points="515,288 562,408 586,408" fill="none" stroke="#0741DA" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
          </svg>

          {/* Left: Problems */}
          <div className="comparison-col comparison-col--left">
            {problems.map((item, i) => (
              <div key={i} className="comparison-row">
                <div className="comparison-icon comparison-icon--amber">{item.icon}</div>
                <div className="comparison-card comparison-card--white">
                  <strong className="comparison-card-title">{item.title}</strong>
                  <small className="comparison-card-desc">{item.desc}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Center Hub */}
          <div className="comparison-hub">
            <div className="comparison-hub-ring">
              <div className="comparison-hub-inner">
                <img src="/assets/logo-mortgages-w.png" alt="Citics Mortgages" className="comparison-hub-logo" />
              </div>
            </div>
          </div>

          {/* Right: Solutions */}
          <div className="comparison-col comparison-col--right">
            {solutions.map((item, i) => (
              <div key={i} className="comparison-row comparison-row--right">
                <div className="comparison-card comparison-card--blue">
                  <strong className="comparison-card-title">{item.title}</strong>
                  <small className="comparison-card-desc">{item.desc}</small>
                </div>
                <div className="comparison-icon comparison-icon--blue">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
