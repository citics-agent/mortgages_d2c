const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const newsItems = [
  {
    img: `${bp}/assets/news-vpb.jpg`,
    source: "VPBank",
    title: "Citics Mortgages ký kết hợp tác chiến lược với VPBank mở rộng gói vay ưu đãi",
    href: "https://cafef.vn/citics-va-vpbank-hop-tac-xay-dung-he-sinh-thai-tai-chinh-bat-dong-san-so-188250923163751796.chn",
  },
  {
    img: `${bp}/assets/news-msb.jpg`,
    source: "MSB",
    title: "Hợp tác với MSB: thêm lựa chọn lãi suất ưu đãi cho khách hàng Citics",
    href: "https://citics.vn/tin-tuc/msb-va-citics-ky-ket-hop-tac-chien-luoc-tang-toc-so-hoa-cho-vay-the-chap-va-huong-toi-tich-hop-api-toan-dien",
  },
  {
    img: `${bp}/assets/news-mbv.jpg`,
    source: "MBV",
    title: "Citics và ngân hàng MBV hợp tác toàn diện tiên phong đưa công nghệ AI vào hành trình vay mua nhà",
    href: "https://citics.vn/tin-tuc/citics-va-ngan-hang-mbv-hop-tac-toan-dien-tien-phong-dua-cong-nghe-ai-vao-hanh-trinh-vay-mua-nha",
  },
  {
    img: `${bp}/assets/news-ocb.jpg`,
    source: "OCB",
    title: "Citics Mortgages ký kết hợp tác chiến lược với Ngân hàng TMCP Phương Đông OCB",
    href: "https://citics.vn/tin-tuc/citics-mortgages-ky-ket-hop-tac-chien-luoc-voi-ngan-hang-tmcp-phuong-dong-ocb",
  },
];

function NewsCard({ item }: { item: typeof newsItems[number] }) {
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="news-card">
      <div className="news-img">
        <img src={item.img} alt={item.source} loading="lazy" />
      </div>
      <div className="news-body">
        <h3 className="news-title">{item.title}</h3>
        <span className="news-link">Xem chi tiết →</span>
      </div>
    </a>
  );
}

export default function News() {
  return (
    <section className="section news" id="news">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">Citics có gì mới?</h2>
        </div>
        <div className="news-static-grid reveal">
          {newsItems.map((item, i) => (
            <NewsCard item={item} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
