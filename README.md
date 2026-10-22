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

## Tracking (MKT hay sửa)

Cấu hình trong `src/app/layout.tsx`:

| Mục | Giá trị |
|---|---|
| Google Tag Manager | `GTM-5LZ7XPL9` |
| Google Ads | `AW-18085381290` |

Hai tag này phải là thẻ `<script>` thô trong `<head>` để Google nhận diện được (xem `decisions/004-tags-as-raw-head-scripts.md`). Đừng đổi sang cách nạp khác.

Việc đang chờ: gắn **Conversion Label** Google Ads để đếm conversion khi gửi form. Khi có label, thêm sự kiện conversion vào thời điểm gửi form thành công trong `src/components/EForm.tsx`.

## Form đăng ký

`src/components/EForm.tsx` kiểm tra dữ liệu rồi POST JSON sang Google Apps Script (`GOOGLE_SCRIPT_URL`, đã nằm trong code). Apps Script ghi vào Google Sheet và gửi thông báo Telegram/email. Token Telegram nằm trong Apps Script, **không nằm trong repo này**.

Đổi bot, chat id hoặc nơi lưu lead:
1. Mở Google Sheet nhận lead → Extensions → Apps Script.
2. Sửa file `.gs`.
3. Deploy → **New deployment** (Web app, Execute as: Me, Anyone).
4. Nếu URL deployment đổi thì cập nhật `GOOGLE_SCRIPT_URL` trong `EForm.tsx` rồi push.

Log lỗi form xem ở Executions của Apps Script, không phải terminal.

## Lưu ý an toàn

- Repo đang public: không commit token, key, mật khẩu.
- Không force-push, không xoá branch `main`.
- Thay đổi lớn: tạo branch riêng, test xong mới merge vào `main` (merge là lên live).
