# TARAF — Custom Made Website

ملفات الموقع:
- index.html
- style.css
- app.js

الموقع Static بالكامل، لذلك يمكن رفعه مجانًا على GitHub Pages أو Netlify أو Vercel.
لا توجد قاعدة بيانات أو سيرفر مدفوع.

## مهم قبل النشر
1. استبدلي المساحات التجريبية بصور TARAF الحقيقية.
2. راجعي رقم واتساب في `app.js` و`index.html`.
3. ضعي الإيميل والعنوان الحقيقيين مكان "يُضاف عند تأكيده".
4. عدّلي `DEPOSIT_PERCENT` في `app.js` إذا كانت نسبة الديبوزت مختلفة.
5. الدفع الإلكتروني الحقيقي يحتاج حساب بوابة دفع ومفاتيح API + Backend. النسخة الحالية لا تدّعي تحصيل الأموال؛ هي تحسب الديبوزت وتبدأ الطلب عبر واتساب.

## تشغيل محلي
افتحي `index.html` مباشرة في المتصفح، أو شغلي:
python -m http.server 8000
ثم افتحي:
http://localhost:8000

## نشر مجاني سريع — Netlify
- افتحي https://app.netlify.com/drop
- اسحبي مجلد الموقع كاملًا إلى الصفحة.
- سيظهر رابط مجاني للموقع.
- يمكنك لاحقًا ربط دومينك الخاص.

## نشر مجاني — GitHub Pages
- أنشئي Repository جديدًا.
- ارفعي index.html وstyle.css وapp.js.
- Settings > Pages > Deploy from branch > main / root.
- سيظهر رابط github.io.

## الصور
التصميم الحالي يستخدم CSS art بدل صور خارجية حتى يعمل بدون خدمات مدفوعة. استبدلي `.visual-*` و`.portfolio-tile` بصور حقيقية عند توفرها.
