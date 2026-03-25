'use client';

import { useEffect, useRef } from 'react';

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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure the width of one set (first N children = newsItems.length)
    const cards = Array.from(track.children);
    const setSize = newsItems.length;
    let setWidth = 0;
    for (let i = 0; i < setSize; i++) {
      const card = cards[i] as HTMLElement;
      setWidth += card.offsetWidth;
    }
    const gap = 24;
    setWidth += setSize * gap;
    track.style.setProperty('--news-set-width', `-${setWidth}px`);

    // Touch swipe support
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const marquee = track.parentElement;
    if (!marquee) return;

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      scrollLeft = marquee.scrollLeft;
      track.style.animationPlayState = 'paused';
      track.style.animation = 'none';
      marquee.style.overflow = 'auto';
      marquee.style.scrollBehavior = 'auto';
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].clientX;
      const diff = startX - x;
      marquee.scrollLeft = scrollLeft + diff;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    marquee.addEventListener('touchstart', onTouchStart, { passive: true });
    marquee.addEventListener('touchmove', onTouchMove, { passive: true });
    marquee.addEventListener('touchend', onTouchEnd);

    return () => {
      marquee.removeEventListener('touchstart', onTouchStart);
      marquee.removeEventListener('touchmove', onTouchMove);
      marquee.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section className="section news" id="news">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">Citics có gì mới?</h2>
        </div>
      </div>
      <div className="news-marquee reveal">
        <div className="news-track" ref={trackRef}>
          {/* Set 1 */}
          {newsItems.map((item, i) => (
            <NewsCard item={item} key={`s1-${i}`} />
          ))}
          {/* Set 2 — duplicate for seamless loop */}
          {newsItems.map((item, i) => (
            <NewsCard item={item} key={`s2-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
