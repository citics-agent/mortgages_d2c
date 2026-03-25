const uspCards = [
  {
    modifier: 'usp-card--1',
    title: 'Độ Tin Cậy Cao',
    desc: 'Kết nối với 8+ ngân hàng uy tín, hồ sơ được xét duyệt đúng tiêu chí từng ngân hàng.',
    tag: 'Kết nối 8+ ngân hàng',
  },
  {
    modifier: 'usp-card--2',
    title: 'Lãi Suất Ưu Đãi',
    desc: 'Mức lãi suất ưu đãi dành riêng cho đối tác chiến lược của Citics Mortgages.',
    tag: 'Lãi suất đặc quyền',
  },
  {
    modifier: 'usp-card--3',
    title: 'Xử Lý Nhanh Chóng',
    desc: 'Phản hồi trong 24–48 giờ làm việc sau khi nhận hồ sơ đầy đủ.',
    tag: 'Phản hồi 24–48h',
  },
  {
    modifier: 'usp-card--4',
    title: 'Hỗ Trợ Hồ Sơ',
    desc: 'Hướng dẫn chuẩn bị đúng từ đầu, tăng tỷ lệ duyệt vay tối đa.',
    tag: 'Hỗ trợ toàn diện',
  },
  {
    modifier: 'usp-card--5',
    title: 'Hoàn Toàn Miễn Phí',
    desc: 'Không phát sinh chi phí tư vấn ban đầu. Minh bạch, rõ ràng từ đầu đến cuối.',
    tag: 'Tư vấn miễn phí',
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function USP() {
  return (
    <section className="section" id="usp">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">
            Vì sao nên tìm khoản vay qua<br />
            Citics Mortgages?
          </h2>
        </div>
        <div className="usp-cards reveal">
          {uspCards.map((card) => (
            <a key={card.modifier} href="#form1" className={`usp-card ${card.modifier}`}>
              <div className="usp-card-top">
                <h3 className="usp-card-title">{card.title}</h3>
                <p className="usp-card-desc">{card.desc}</p>
              </div>
              <div className="usp-card-shape" aria-hidden="true"></div>
              <div className="usp-card-footer">
                <span className="usp-card-tag">{card.tag}</span>
                <span className="usp-card-btn" aria-label="Tìm hiểu thêm">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
