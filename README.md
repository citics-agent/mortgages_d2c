# Citics Mortgages Landing Page (D2C)

Landing page thu lead vay mua nhà của Citics Mortgages.

- Live: https://get-mortgages.citics.vn
- Repo: `citics-agent/mortgages_d2c` (branch `main`)
- Stack: Next.js 15 (App Router) + React 19 + TypeScript, CSS thuần, build tĩnh (`output: 'export'`)

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
git clone https://github.com/citics-agent/mortgages_d2c.git
cd mortgages_d2c
npm install
npm run dev
```

Mở http://localhost:8082.

| Lệnh | Việc làm |
|---|---|
| `npm run dev` | Chạy dev, cổng 8082 |
| `npm run build` | Build tĩnh. Bản production xuất ra `docs/` với base path `/mortgages_d2c` |

## Biến môi trường

**Không cần file `.env`** để chạy hoặc build, và không có bí mật nào trong biến môi trường. `NEXT_PUBLIC_BASE_PATH` do `next.config.mjs` tự đặt. URL gửi form (`GOOGLE_SCRIPT_URL`) nằm cứng trong `src/components/EForm.tsx`.

## Cấu trúc

```
src/
├── app/layout.tsx       Tracking: GTM + Google Ads gtag
├── app/page.tsx         Ghép các section theo thứ tự trang
├── app/globals.css      Style toàn trang
└── components/          Mỗi file là một section (Hero, Banks, Policies, News, EForm, Footer...)
public/assets/           Ảnh (ngân hàng, banner, tin tức)
decisions/               Quyết định kỹ thuật (đọc trước khi sửa tracking)
docs/                    Bản build tĩnh, không sửa tay
```

## Sửa nội dung và đưa lên live

1. Sửa trong `src/` (ảnh bỏ vào `public/assets/`).
2. Chạy `npm run dev` kiểm tra.
3. Commit và push lên `main`.
4. GitHub gọi webhook `https://get-mortgages.citics.vn/webhook`, server tự pull và build. Chờ 1-3 phút rồi F5.

Ghi chú:
- Webhook hiện log "500 timeout" ở Settings → Webhooks là bình thường, không phải lỗi.
- Workflow `.github/workflows/deploy.yml` luôn fail, không phải đường deploy, có thể bỏ qua.
- Sửa trực tiếp trên GitHub web vẫn được, miễn commit vào `main`.

## Sửa nội dung từng mục

Nội dung nằm cứng trong code, mỗi mục là một file trong `src/components/`. Sửa chữ trực tiếp, lưu rồi chạy thử bằng `npm run dev`.

| Mục trên trang | File | Cách sửa |
|---|---|---|
| Đầu trang (tiêu đề, 5 gạch đầu dòng) | `Hero.tsx` | Sửa chữ trong thẻ `<h1>`, `<p>`, `<li>`. Có chữ "8+ ngân hàng", đổi khi số ngân hàng đổi |
| Chính sách và ưu đãi (2 thẻ: Cashback 0.3%, Miễn phí sơ bộ giá trị tài sản) | `Policies.tsx` | Sửa `policy-value` (con số) và `policy-title` (tên chính sách). Không dùng ảnh |
| Ngân hàng đối tác | `Banks.tsx` | Sửa mảng `banks` (logo, tên, tỉ lệ). Logo ở `public/assets/banks/`, đã có sẵn logo chưa dùng (ACB, BIDV, TCB...). Tiêu đề "8 ngân hàng đối tác" phải đổi tay khi đổi số lượng |
| Tin tức | `News.tsx` | Sửa mảng `newsItems`: `img`, `source`, `title`, `href`. Ảnh ở `public/assets/news-*.jpg` |
| Chân trang (hotline, email, ĐKKD, mạng xã hội, link tải app) | `Footer.tsx` | Sửa chữ và link trực tiếp |
| Form đăng ký, nơi nhận lead | `EForm.tsx` | `GOOGLE_SCRIPT_URL` trỏ tới Apps Script ghi vào Google Sheet |

Trang này **không có** mục "hình ảnh hoạt động".

Ảnh mới: bỏ vào `public/assets/`, khuyến nghị dưới 500 KB, rộng từ 700 px. Đường dẫn trong code viết dạng `` `${bp}/assets/ten-file.jpg` ``.

## Tracking (MKT hay sửa)

Cấu hình trong `src/app/layout.tsx`:

| Mục | Giá trị |
|---|---|
| Google Tag Manager | `GTM-5LZ7XPL9` |
| Google Ads | `AW-18085381290` |

Hai tag này phải là thẻ `<script>` thô trong `<head>` để Google nhận diện được (xem `decisions/004-tags-as-raw-head-scripts.md`). Đừng đổi sang cách nạp khác.

Chuyển đổi Google Ads: `EForm.tsx` đã bắn sự kiện `mortgage_form_submit` lên `dataLayer` khi khách gửi form thành công. Muốn Google Ads đếm sự kiện này là chuyển đổi, cấu hình tag "Google Ads Conversion Tracking" trong GTM với trigger Custom Event `mortgage_form_submit`, không cần sửa code.

## Form đăng ký

`src/components/EForm.tsx` kiểm tra dữ liệu rồi POST JSON sang Google Apps Script (`GOOGLE_SCRIPT_URL`, đã nằm trong code). Apps Script (thuộc tài khoản `doitac@citics.vn`) ghi vào Google Sheet nhận lead. Telegram bot trước đây đã bị revoke nên hiện **không còn thông báo Telegram**. Nếu tạo bot mới, đặt token trong Apps Script, **không để trong repo này**.

Gửi thử form sẽ ghi dòng thật vào Sheet, test xong nhớ xoá.

Đổi nơi lưu lead hoặc thêm thông báo:
1. Mở Google Sheet nhận lead → Extensions → Apps Script.
2. Sửa file `.gs`.
3. Deploy → **New deployment** (Web app, Execute as: Me, Anyone).
4. Nếu URL deployment đổi thì cập nhật `GOOGLE_SCRIPT_URL` trong `EForm.tsx` rồi push.

Log lỗi form xem ở Executions của Apps Script, không phải terminal.

## Nhờ AI hỗ trợ

Mở thư mục repo này trong Claude Code, Codex hoặc Cursor, AI sẽ tự đọc README này làm bối cảnh. Mở đầu yêu cầu bằng trang, branch, domain, ví dụ:

> Repo này là landing page Mortgages (branch main, domain get-mortgages.citics.vn). Đọc README.md. Hãy đổi [nội dung] ở [mục trên trang]. Chỉ sửa file cần thiết và cho tôi xem `git diff` trước khi commit.

Site không đổi sau khi push: bảo AI dùng `gh` CLI xem các lần chạy Actions và webhook deliveries gần nhất, chỉ báo cáo, chưa sửa.
Không để AI sửa thư mục `docs/` (bản build).

Lưu ý: không dán token, mật khẩu, link Google Sheet lead hay dữ liệu khách vào AI chạy trên web. Luôn xem `git diff` trước khi commit, không để AI `git push --force` hay commit file `.env`.

## Lưu ý an toàn

- Repo đang public: không commit token, key, mật khẩu.
- Không force-push, không xoá branch `main`.
- Thay đổi lớn: tạo branch riêng, test xong mới merge vào `main` (merge là lên live).
