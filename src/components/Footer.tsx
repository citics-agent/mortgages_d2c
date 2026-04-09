'use client';

import { useState } from 'react';

const footerSections = [
  {
    title: 'Về Citics',
    links: [
      { label: 'Giới thiệu', href: 'https://www.citics.vn/ve-chung-toi', external: true },
      { label: 'Tin tức', href: 'https://www.citics.vn/ds-tin-tuc', external: true },
      { label: 'Tuyển dụng', href: 'https://www.citics.vn/tuyen-dung', external: true },
      { label: 'Liên hệ', href: 'https://www.citics.vn/lien-he', external: true },
    ],
  },
  {
    title: 'Dịch vụ',
    links: [
      { label: 'Quy trình vay', href: '#flow' },
      { label: 'Chính sách ưu đãi', href: '#policies' },
      { label: 'Ngân hàng đối tác', href: '#banks' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Tài liệu ứng dụng', href: 'https://docs.citics.vn/', external: true },
      { label: 'Câu hỏi thường gặp', href: 'https://www.citics.vn/cau-hoi-thuong-gap', external: true },
    ],
  },
  {
    title: 'Văn bản & Pháp lý',
    links: [
      { label: 'Điều khoản sử dụng', href: 'https://www.citics.vn/phap-ly-chi-tiet/dieu-khoan-su-dung', external: true },
      { label: 'Chính sách bảo mật', href: 'https://www.citics.vn/phap-ly-chi-tiet/chinh-sach-bao-mat', external: true },
      { label: 'Chính sách riêng tư', href: 'https://www.citics.vn/phap-ly-chi-tiet/chinh-sach-rieng-tu', external: true },
      { label: 'Pháp lý', href: 'https://www.citics.vn/phap-ly', external: true },
      { label: 'Thông báo xử lý dữ liệu', href: 'https://www.citics.vn/phap-ly-chi-tiet/thong-bao-xu-ly-du-lieu', external: true },
      { label: 'Điều khoản xử lý dữ liệu cá nhân', href: 'https://www.citics.vn/phap-ly-chi-tiet/dieu-khoan-va-dieu-kien-ve-xu-ly-du-lieu-ca-nhan', external: true },
    ],
  },
];

function FooterAccordion({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`footer-accordion${open ? ' open' : ''}`}>
      <button className="footer-accordion-btn" onClick={() => setOpen(!open)}>
        <h4>{title}</h4>
        <svg className="footer-accordion-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul className="footer-accordion-list">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        {/* Link columns — desktop: grid, mobile: accordion */}
        <div className="footer-links footer-links--desktop">
          {footerSections.map((section, i) => (
            <div key={i}>
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-download">
            <h4>Tải ứng dụng</h4>
            <div className="footer-qr-group">
              <div className="footer-qr">
                <img src={`${bp}/assets/qr-android.png`} alt="QR Android" className="footer-qr-img" />
                <a href="https://play.google.com/store/apps/details?id=vn.citics.agent" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play" className="footer-store-badge" />
                </a>
              </div>
              <div className="footer-qr">
                <img src={`${bp}/assets/qr-ios.png`} alt="QR iOS" className="footer-qr-img" />
                <a href="https://apps.apple.com/vn/app/citics-agent/id6504488573" target="_blank" rel="noopener noreferrer">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store" className="footer-store-badge" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="footer-links footer-links--mobile">
          {footerSections.map((section, i) => (
            <FooterAccordion key={i} title={section.title} links={section.links} />
          ))}
          <div className="footer-download">
            <h4>Tải ứng dụng</h4>
            <div className="footer-qr-group">
              <div className="footer-qr">
                <img src={`${bp}/assets/qr-android.png`} alt="QR Android" className="footer-qr-img" />
                <a href="https://play.google.com/store/apps/details?id=vn.citics.agent" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play" className="footer-store-badge" />
                </a>
              </div>
              <div className="footer-qr">
                <img src={`${bp}/assets/qr-ios.png`} alt="QR iOS" className="footer-qr-img" />
                <a href="https://apps.apple.com/vn/app/citics-agent/id6504488573" target="_blank" rel="noopener noreferrer">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store" className="footer-store-badge" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company info */}
        <div className="footer-company">
          <div className="footer-company-top">
            <img src={`${bp}/assets/logo-mortgages-w.png`} alt="Citics Mortgages" className="footer-logo" />
          </div>
          <p className="footer-slogan">La Bàn Cho Vay Thế Chấp Bất Động Sản.<br />
            Giúp bạn kết nối hồ sơ vay thế chấp với ngân hàng phù hợp, tăng khả năng phê duyệt và tiết kiệm thời gian.</p>
          <p className="footer-company-address">Căn VE-S01 và VE-S02, Khu Thương Mại Tòa nhà VENICE, Khu Dân Cư New City tại 17 Mai Chí Thọ, Phường An Khánh, Thành phố Hồ Chí Minh</p>
          <div className="footer-company-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              {' '}Số điện thoại&ensp;<strong>1900 633075</strong>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
              {' '}Email&ensp;<strong>mortgages@citics.com.vn</strong>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
              {' '}Giấy ĐKKD số&ensp;<strong>0315391639</strong>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {' '}Ngày cấp&ensp;<strong>15/11/2018</strong>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
              {' '}Nơi cấp&ensp;<strong>Sở KH&amp;ĐT TP. Hồ Chí Minh</strong>
            </span>
          </div>
        </div>

        {/* Bottom: copyright + social */}
        <div className="footer-bottom">
          <p>&copy; 2026 Bản quyền thuộc về Citics.vn</p>
          <div className="footer-social">
            <a href="https://www.facebook.com/CiticsAgent" target="_blank" rel="noopener noreferrer" aria-label="Facebook Fanpage">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="https://www.facebook.com/groups/citicsagenthub" target="_blank" rel="noopener noreferrer" aria-label="Facebook Group">
              <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="2" /><line x1="16" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="2" /></svg>
            </a>
            <a href="https://www.tiktok.com/@citics_agent" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 32 32"><path d="M16.708 0.027C18.453 0 20.188 0.016 21.921 0C22.052 1.979 22.786 3.978 24.188 5.391C25.59 6.828 27.56 7.558 29.504 7.786V12.637C27.676 12.576 25.843 12.179 24.186 11.401C23.461 11.069 22.786 10.647 22.131 10.202C22.121 14.876 22.148 19.548 22.104 24.214C21.991 26.143 21.302 28.048 20.112 29.577C18.258 32.025 15.261 33.508 12.209 33.486C10.333 33.538 8.469 32.988 6.886 31.984C4.275 30.316 2.571 27.381 2.405 24.334C2.384 23.746 2.376 23.158 2.403 22.573C2.623 19.868 3.947 17.303 5.98 15.562C8.281 13.55 11.494 12.587 14.479 13.171C14.507 15.168 14.422 17.166 14.422 19.163C13.22 18.752 11.828 18.753 10.685 19.328C9.817 19.753 9.1 20.455 8.656 21.316C8.296 21.975 8.2 22.741 8.219 23.479C8.375 25.449 10.169 27.142 12.157 27.049C13.455 27.066 14.698 26.389 15.447 25.344C15.674 25.032 15.888 24.694 15.949 24.312C16.107 22.952 16.055 21.588 16.072 20.222C16.084 13.484 16.055 6.748 16.089 0.013L16.708 0.027Z" /></svg>
            </a>
            <a href="https://www.youtube.com/@Citics.Official" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
            </a>
            <a href="https://zalo.me/citicsvn" target="_blank" rel="noopener noreferrer" aria-label="Zalo OA">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.04 2 11c0 2.76 1.44 5.22 3.68 6.82V22l3.86-2.12c.78.22 1.6.34 2.46.34 5.52 0 10-4.04 10-9S17.52 2 12 2zm.88 12.2H9.2l-.02-.02c-.04-.06-.06-.14-.06-.22 0-.12.04-.24.12-.34l3.24-4.44h-3.2c-.22 0-.4-.16-.44-.38v-.04c0-.24.18-.42.42-.42h3.72c.04.04.08.1.1.16.02.08.04.16.02.24-.02.08-.04.14-.08.2L9.78 13.4h3.08c.24 0 .42.18.42.42 0 .22-.18.38-.4.38z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
