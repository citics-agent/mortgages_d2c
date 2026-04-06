'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.querySelector('.news-card')?.clientWidth || 1;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, newsItems.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateIndex);
  }, [updateIndex]);

  function scrollTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelectorAll('.news-card')[index] as HTMLElement;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
    }
  }

  return (
    <section className="section news" id="news">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">Citics có gì mới?</h2>
        </div>

        {/* Desktop: static grid */}
        <div className="news-static-grid reveal">
          {newsItems.map((item, i) => (
            <NewsCard item={item} key={i} />
          ))}
        </div>

        {/* Mobile: snap carousel */}
        <div className="news-carousel reveal">
          <div className="news-carousel-track" ref={scrollRef}>
            {newsItems.map((item, i) => (
              <NewsCard item={item} key={i} />
            ))}
          </div>
          <div className="news-carousel-controls">
            <button
              className="news-carousel-btn"
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="news-carousel-dots">
              {newsItems.map((_, i) => (
                <button
                  key={i}
                  className={`news-carousel-dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="news-carousel-btn"
              onClick={() => scrollTo(Math.min(newsItems.length - 1, activeIndex + 1))}
              disabled={activeIndex === newsItems.length - 1}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
