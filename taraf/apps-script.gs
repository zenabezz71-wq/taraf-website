const SHEET_NAME = "Orders";
const ADMIN_TOKEN = "CHANGE_THIS_TOKEN";

function doGet(e) {
  const action = e.parameter.action || "health";
  if (action === "health") return json({ok:true, service:"TARAF Orders"});
  if (action === "status") {
    const id = (e.parameter.id || "").trim();
    if (!id) return json({ok:false,error:"Missing order id"});
    return json(findOrder(id));
  }
  return json({ok:false,error:"Unknown action"});
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.token !== ADMIN_TOKEN) return json({ok:false,error:"Unauthorized"});
    if (body.action !== "create") return json({ok:false,error:"Unknown action"});

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["timestamp","orderId","name","phone","email","design","height","bust","waist","hips","sleeve","shoulder","fabric","budget","notes","status"]);
    }

    const row = [
      new Date(), body.orderId, body.name, body.phone, body.email || "",
      body.design, body.height || "", body.bust || "", body.waist || "",
      body.hips || "", body.sleeve || "", body.shoulder || "",
      body.fabric || "", body.budget || "", body.notes || "", "قيد المراجعة"
    ];
    sheet.appendRow(row);
    return json({ok:true, orderId:body.orderId, status:"قيد المراجعة"});
  } catch(err) {
    return json({ok:false,error:String(err)});
  }
}

function findOrder(id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return {ok:false,error:"No orders sheet"};
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return {ok:false,error:"Not found"};
  for (let i=1;i<values.length;i++) {
    if (String(values[i][1]).trim() === id) {
      return {ok:true, orderId:id, status:String(values[i][15] || "قيد المراجعة")};
    }
  }
  return {ok:false,error:"Not found"};
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
