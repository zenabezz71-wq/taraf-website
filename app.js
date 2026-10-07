const WHATSAPP = "201044169094";
const DEPOSIT_PERCENT = 0.50;

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded","false");
}));

function showToast(message){
  const t = document.getElementById("toast");
  t.textContent = message;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

document.querySelectorAll(".choose-look").forEach(btn => {
  btn.addEventListener("click", () => {
    const select = document.getElementById("design");
    select.value = btn.dataset.look;
    document.getElementById("custom").scrollIntoView({behavior:"smooth"});
    showToast("تم اختيار " + btn.dataset.look + " — أكملي بياناتكِ.");
  });
});

const priceInput = document.getElementById("priceInput");
const depositValue = document.getElementById("depositValue");
function updateDeposit(){
  const price = Number(priceInput.value || 0);
  depositValue.textContent = Math.round(price * DEPOSIT_PERCENT).toLocaleString("en-EG") + " EGP";
}
priceInput?.addEventListener("input", updateDeposit);

function makeOrderId(){
  const d = new Date();
  const date = d.getFullYear().toString().slice(-2) + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0");
  const rand = Math.floor(1000 + Math.random()*9000);
  return `TRF-${date}-${rand}`;
}

document.getElementById("customForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  const data = new FormData(this);
  const orderId = makeOrderId();

  const clean = key => (data.get(key) || "—").toString().trim() || "—";
  const msg =
`مرحبًا TARAF ✨
أرغب في طلب تفصيل مخصص.

رقم الطلب: ${orderId}
الاسم: ${clean("name")}
واتساب: ${clean("phone")}
الإيميل: ${clean("email")}
نوع الطلب: ${clean("requestType")}
التصميم: ${clean("design")}

المقاسات:
الطول: ${clean("height")} سم
الصدر: ${clean("bust")} سم
الخصر: ${clean("waist")} سم
الأرداف: ${clean("hips")} سم
طول الكم: ${clean("sleeve")} سم
عرض الكتف: ${clean("shoulder")} سم

اللون/الخامة: ${clean("fabric")}
الميزانية التقريبية: ${clean("budget")} EGP

الملاحظات:
${clean("notes")}

أوافق على مراجعة التفاصيل والسعر النهائي قبل بدء التنفيذ.`;

  localStorage.setItem("taraf_last_order", JSON.stringify({
    orderId,
    submittedAt: new Date().toISOString(),
    customer: clean("name"),
    phone: clean("phone"),
    design: clean("design"),
    status: "قيد المراجعة"
  }));

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  showToast(`تم إنشاء رقم الطلب ${orderId}`);
});

window.addEventListener("load", () => {
  const last = localStorage.getItem("taraf_last_order");
  if(last) {
    try {
      const order = JSON.parse(last);
      console.info("آخر طلب محفوظ على هذا الجهاز:", order);
    } catch(e){}
  }
});
