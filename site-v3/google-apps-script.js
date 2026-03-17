// ============================================================
// C-ACN E-Form — Google Apps Script
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code into the editor (replace any existing code)
// 3. Update the CONFIG below with your email and spreadsheet ID
// 4. Click Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the deployment URL and paste it into index.html (search for GOOGLE_SCRIPT_URL)
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
const CONFIG = {
  // The email address to receive notifications
  NOTIFICATION_EMAIL: "doitac@citics.vn",

  // Google Sheet ID (from the URL: https://docs.google.com/spreadsheets/d/THIS_PART/edit)
  // Leave empty to auto-create a new spreadsheet
  SPREADSHEET_ID: "1_gEkoa73alshQJkPrP9uPtyBDdqkbGClovlx-mlnqWs",

  // Sheet names
  AGENT_SHEET_NAME: "Agent Registrations",
  STORE_SHEET_NAME: "Store Registrations",
};

// ── MAIN HANDLER ────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type; // "agent" or "store"

    // Save to Google Sheet
    const sheet = getOrCreateSheet(type);
    const row = buildRow(type, data);
    sheet.appendRow(row);

    // Send email notification
    sendNotificationEmail(type, data);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Đăng ký thành công!" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Also handle GET for testing
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "C-ACN Form Backend is running." })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ── SPREADSHEET HELPERS ─────────────────────────────────────
function getOrCreateSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }

  // Auto-create if no ID provided
  const ss = SpreadsheetApp.create("C-ACN Registrations");
  CONFIG.SPREADSHEET_ID = ss.getId();
  Logger.log("Created new spreadsheet: " + ss.getUrl());
  return ss;
}

function getOrCreateSheet(type) {
  const ss = getOrCreateSpreadsheet();
  const sheetName =
    type === "agent" ? CONFIG.AGENT_SHEET_NAME : CONFIG.STORE_SHEET_NAME;

  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Always ensure headers exist (row 1)
  const firstCell = sheet.getRange(1, 1).getValue();
  if (!firstCell || firstCell !== "Timestamp") {
    const headers =
      type === "agent"
        ? ["Timestamp", "Họ và tên", "Số điện thoại", "Thành phố", "Kinh nghiệm", "Loại Agent", "Mã giới thiệu", "Quan tâm khoá học"]
        : ["Timestamp", "Tên Store / Người đại diện", "Số điện thoại", "Thành phố", "Số lượng Agent", "Loại hình hợp tác", "Mã giới thiệu", "Quan tâm khoá học"];

    // Insert header row at top (pushes existing data down)
    if (sheet.getLastRow() > 0) {
      sheet.insertRowBefore(1);
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  return sheet;
}

function buildRow(type, data) {
  const timestamp = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  if (type === "agent") {
    return [
      timestamp,
      data.name || "",
      data.phone || "",
      data.city || "",
      data.experience || "",
      data.agentType || "",
      data.referral || "",
      data.courseInterest ? "Có" : "Không",
    ];
  } else {
    return [
      timestamp,
      data.name || "",
      data.phone || "",
      data.city || "",
      data.agentCount || "",
      data.storeType || "",
      data.referral || "",
      data.courseInterest ? "Có" : "Không",
    ];
  }
}

// ── EMAIL NOTIFICATION ──────────────────────────────────────
function sendNotificationEmail(type, data) {
  const label = type === "agent" ? "Agent" : "Store";
  const subject = `[C-ACN] Đăng ký ${label} mới — ${data.name}`;

  let body = `Có đăng ký ${label} mới trên website C-ACN:\n\n`;

  if (type === "agent") {
    body += `Họ và tên: ${data.name}\n`;
    body += `Số điện thoại: ${data.phone}\n`;
    body += `Thành phố: ${data.city}\n`;
    body += `Kinh nghiệm: ${data.experience}\n`;
    body += `Loại Agent: ${data.agentType}\n`;
    body += `Mã giới thiệu: ${data.referral || "Không có"}\n`;
    body += `Quan tâm khoá học: ${data.courseInterest ? "Có" : "Không"}\n`;
  } else {
    body += `Tên Store: ${data.name}\n`;
    body += `Số điện thoại: ${data.phone}\n`;
    body += `Thành phố: ${data.city}\n`;
    body += `Số lượng Agent: ${data.agentCount}\n`;
    body += `Loại hình hợp tác: ${data.storeType}\n`;
    body += `Mã giới thiệu: ${data.referral || "Không có"}\n`;
    body += `Quan tâm khoá học: ${data.courseInterest ? "Có" : "Không"}\n`;
  }

  body += `\nThời gian: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

  MailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL, subject, body);
}
