// ============================================================
// Citics Mortgages LP — Google Apps Script Backend
// ============================================================
// SETUP:
// 1. Tạo Google Sheet mới, copy Sheet ID từ URL
// 2. Vào https://script.google.com → New project
// 3. Paste code này vào editor
// 4. Cập nhật CONFIG bên dưới (email + spreadsheet ID)
// 5. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy deployment URL → paste vào EForm.tsx (GOOGLE_SCRIPT_URL)
// ============================================================

const CONFIG = {
  // Email nhận thông báo khi có lead mới
  NOTIFICATION_EMAIL: "", // TODO: Điền email

  // Google Sheet ID (từ URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit)
  // Để trống sẽ tự tạo sheet mới
  SPREADSHEET_ID: "1zgApAkBb6EmngC8HgFkASeu-iYserDOYJxRKZCX6NRc",

  // Tên sheet tab
  SHEET_NAME: "Leads",
};

// ── HEADERS ─────────────────────────────────────────────────
const HEADERS = [
  "Timestamp",
  "Họ & tên",
  "Năm sinh",
  "Số điện thoại",
  "Nhu cầu vay",
  "Khu vực BĐS",
  "Nguồn",
];

// Map nhu cầu vay values
const NEED_MAP = {
  "mua-nha": "Vay mua nhà",
  "xay-sua": "Vay xây sửa nhà",
  "kinh-doanh": "Vay kinh doanh",
  "tieu-dung": "Vay tiêu dùng",
};

// Map khu vực values
const AREA_MAP = {
  "hcm": "Hồ Chí Minh",
  "hn": "Hà Nội",
  "dn": "Đà Nẵng",
  "other": "Khác",
};

// ── MAIN HANDLER ────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Save to Google Sheet
    const sheet = getOrCreateSheet();
    const row = [
      new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      data.name || "",
      data.year || "",
      data.phone || "",
      NEED_MAP[data.need] || data.need || "",
      AREA_MAP[data.area] || data.area || "",
      data.source || "mortgages-lp",
    ];
    sheet.appendRow(row);

    // Send email notification
    if (CONFIG.NOTIFICATION_EMAIL) {
      sendNotificationEmail(data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Đăng ký thành công!" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Citics Mortgages Form Backend is running." })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ── SPREADSHEET HELPERS ─────────────────────────────────────
function getOrCreateSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
  const ss = SpreadsheetApp.create("Citics Mortgages — Leads");
  CONFIG.SPREADSHEET_ID = ss.getId();
  Logger.log("Created new spreadsheet: " + ss.getUrl());
  return ss;
}

function getOrCreateSheet() {
  const ss = getOrCreateSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // Ensure headers exist
  const firstCell = sheet.getRange(1, 1).getValue();
  if (!firstCell || firstCell !== "Timestamp") {
    if (sheet.getLastRow() > 0) {
      sheet.insertRowBefore(1);
    }
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    for (let i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  return sheet;
}

// ── EMAIL NOTIFICATION ──────────────────────────────────────
function sendNotificationEmail(data) {
  const subject = `[Citics Mortgages] Lead mới — ${data.name}`;

  let body = `Có lead mới từ Citics Mortgages LP:\n\n`;
  body += `Họ & tên: ${data.name}\n`;
  body += `Năm sinh: ${data.year || "—"}\n`;
  body += `Số điện thoại: ${data.phone}\n`;
  body += `Nhu cầu vay: ${NEED_MAP[data.need] || data.need || "—"}\n`;
  body += `Khu vực BĐS: ${AREA_MAP[data.area] || data.area || "—"}\n`;
  body += `\nThời gian: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

  MailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL, subject, body);
}
