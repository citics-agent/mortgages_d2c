# DEC-003: Gắn cứng Google Ads gtag (AW-18085381290) vào layout
- **Status**: ACCEPTED
- **Date**: 2026-10-01
- **Supersedes**: —
- **Context**: MKT báo Google Ads không nhận tag trên https://get-mortgages.citics.vn/. Kiểm tra container GTM-5LZ7XPL9 đang publish: chỉ có GA4 `G-9VS8VEB1VR` + event `generate_lead`; không có Google tag AW, Conversion Linker hay Ads Conversion tag. MKT chỉ gửi snippet gtag.js base (không có Conversion Label).
- **Decision**: Thêm đúng snippet MKT gửi (gtag.js + `gtag('config', 'AW-18085381290')`) vào `src/app/layout.tsx` bằng `next/script` (afterInteractive), chạy song song với GTM, dùng chung `dataLayer`. Không tự thêm conversion event.
- **Consequences**: Google Ads detect được tag (page view / remarketing). Chưa đếm conversion form — cần MKT cấp Conversion Label để thêm `gtag('event','conversion',{send_to:...})` hoặc tag Conversion trong GTM. Thay đổi chỉ lên live sau khi build + deploy lại get-mortgages.citics.vn (pipeline `deploy.yml` đang fail).
