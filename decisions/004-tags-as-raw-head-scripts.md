# DEC-004: GTM + Google Ads gtag render dạng <script> thô trong <head>
- **Status**: ACCEPTED
- **Date**: 2026-10-01
- **Supersedes**: DEC-003 (phần cách gắn; vẫn giữ AW-18085381290)
- **Context**: MKT (Tony) báo GTM-5LZ7XPL9 chưa được gắn dù GTM chạy trên browser. Nguyên nhân: `next/script` (afterInteractive) không render thẻ `<script>` vào HTML gốc — code chỉ nằm trong RSC payload và được inject sau hydrate, nên tag checker của Google (đọc HTML gốc) không thấy. Tag AW gắn theo DEC-003 cùng lỗi.
- **Decision**: Trong `src/app/layout.tsx`, render GTM snippet và gtag (`async src` + config `AW-18085381290`) bằng `<script>` thường (dangerouslySetInnerHTML) ở đầu `<head>`, đúng snippet chuẩn Google. Bỏ `next/script`. Giữ noscript iframe sau `<body>`.
- **Consequences**: Tag có trong HTML gốc → Google detect được. Đã test bản build: mỗi tag load 1 lần, không duplicate page view, UTM capture không đổi, console sạch. Deploy qua webhook push (xem manifest).
