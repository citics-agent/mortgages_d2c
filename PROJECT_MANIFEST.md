# Ứng Dụng: Citics Mortgages Landing Page

Manifest này đóng vai trò như một nguồn chân lý (Source of Truth) cho các quyết định kiến trúc, quy trình làm việc (workflows) và quản lý state của dự án Mortgages Landing Page.

## Thông tin dự án
- **Công nghệ**: Next.js (App Router), React, CSS thuần (tái sử dụng cấu trúc từ CACN Landing Page)
- **Hình thức Build**: Static Export (`output: 'export'`)
- **Backend (Forms)**: Google Apps Script

---

## Technical Decisions & Workflows (ADRs)

### ADR 1: Xử lý logic Form và Telegram Notification trong môi trường Static Export

**Bối cảnh (Context):**
Dự án được cấu hình build tĩnh (Static Export) trên Next.js (`output: 'export'`). Khi build tĩnh, Next.js không hỗ trợ Server Actions hoặc API Routes chạy động, và các biến môi trường (`.env.local`) thông thường (không có prefix `NEXT_PUBLIC_`) sẽ không tồn tại trên trình duyệt khách hàng, gây ra lỗi nếu cần dùng bảo mật (Ví dụ: `TELEGRAM_BOT_TOKEN`).

**Quyết định (Decision):**
1. **Frontend (Next.js)**:
   - Các URL Backend (ví dụ `GOOGLE_SCRIPT_URL` của Google Apps Script) **phải được hardcode** trực tiếp vào mã nguồn component hoặc dùng prefix `NEXT_PUBLIC_` để nó tự động "nén" vào bundle Javascript khi build.
   - Frontend chỉ đảm nhiệm bắt validation form và đẩy (POST) data thô sang Backend qua dạng `application/json` stringified, bypass CORS bằng `mode: 'no-cors'`.
2. **Backend (Google Apps Script - `.gs`)**:
   - Dịch chuyển 100% logic xử lý bí mật (Gắn config Google Sheet, Telegram `BOT_TOKEN`, `CHAT_ID`, Gửi notify email) qua Google Apps Script. 
   - Apps Script hoạt động như một Serverless Endpoint an toàn, không bị ảnh hưởng bởi việc publish Frontend.

**Hệ quả (Consequences / Workflows):**
- **Tránh lộ Data/Token:** Mọi token bí mật của Telegram hiện đang nằm an toàn ở máy chủ của Google (không bị chèn vào JS bundle lộ bên ngoài).
- **Cách cập nhật Bot:** Nếu có thay đổi `BOT_TOKEN` hay `CHAT_ID`, cần mở file `.gs` (Google Sheet -> Extensions -> Apps Script) để thay đổi và **Deploy bản mới nhất (New deployment)**. Code Frontend không cần build lại. 
- **Cách test Form:** Khi code Next.js ở Local, luôn đảm bảo URL webhook (`GOOGLE_SCRIPT_URL`) là bản Deploy id mới nhất. Click gửi dữ liệu, mở Telegram để check ping bot và kiểm tra dữ liệu lưu trên Google Sheet. Mọi thông báo lỗi sẽ nằm trên hệ thống báo lỗi Execution log của Google Scripts thay vì Terminal của Next.js.

### ADR 2: Quy trình Deploy Web Tĩnh (Static Export Deployment)

**Bối cảnh (Context):**
Dự án được cấu hình `output: 'export'` và trỏ thư mục build về `docs/` để tận dụng GitHub Pages. Tính năng GitHub Pages đang được ánh xạ chiếu trực tiếp vào thư mục `docs/`. Khi chỉnh sửa mã nguồn gốc (`src/`) trực tiếp trên GitHub Web Interface, phiên bản trên trang web live sẽ KHÔNG được cập nhật do mã nguồn chưa trải qua quá trình biên dịch (compile).

**Quyết định (Decision):**
1. **Local Build Workflow (Hiện hành)**:
   - Developer bắt buộc phải thao tác trên máy Local: Kéo code mới về (`git pull`) -> Chạy lệnh build (`npm run build`) -> Push cả mã nguồn mới và thư mục Build (`docs/`) lên Github.
   - GitHub Pages sẽ lấy nội dung tĩnh từ thư mục `docs/` để phục vụ người dùng.
2. **Hướng đi tương lai (Tùy chọn)**:
   - Khuyến nghị thiết lập **GitHub Actions** (CI/CD Pipeline) để tự động hóa quá trình chạy `npm run build` mỗi khi branch `main` có thay đổi. Việc này sẽ loại bỏ sự phụ thuộc vào thao tác build thủ công của Developer.

**Hệ quả (Consequences / Workflows):**
- **Tư duy sửa code:** Tuyệt đối không nhầm lẫn giữa việc "sửa source code" và "cập nhật web". Sửa code xong phải luôn có bước xuất file tĩnh (`npm run build`).
- **Gỡ lỗi (Troubleshooting):** Nếu trang web live (github.io) không phản ánh những gì đang thấy ở source code, việc đầu tiên cần làm là kiểm tra xem thư mục `docs/` đã được build bằng version code mới nhất hay chưa.
