# دليل إصلاح مشكلة SEO - ظهور الصفحة الرئيسية

## المشكلة
الصفحة الرئيسية (/) لا تظهر في نتائج البحث، بل تظهر صفحات `/shop-with-sidebar` و `/shop-without-sidebar` بدلاً منها.

## التعديلات التي تمت

### 1. تحسين Sitemap (`src/app/sitemap.ts`)
- ✅ رفع أولوية الصفحة الرئيسية إلى 1.0
- ✅ تقليل أولوية صفحات shop إلى 0.6
- ✅ تغيير changeFrequency للصفحة الرئيسية إلى `always`

### 2. تحسين Metadata للصفحة الرئيسية
- ✅ عنوان يبدأ بـ "Saf9a" مباشرة
- ✅ وصف أكثر جذباً وشمولاً
- ✅ كلمات مفتاحية محسّنة

### 3. تقليل قوة صفحات Shop
- ✅ تقليل جودة العنوان والوصف
- ✅ تقليل الكلمات المفتاحية

## خطوات يجب اتباعها الآن

### 1. إعادة بناء المشروع
\`\`\`bash
npm run build
\`\`\`

### 2. رفع التعديلات للإنتاج
\`\`\`bash
# إذا كنت تستخدم Git
git add .
git commit -m "fix: improve homepage SEO priority"
git push

# أو deploy مباشرة
npm run deploy
\`\`\`

### 3. إعادة إرسال Sitemap في Google Search Console

#### أ. إعادة إرسال Sitemap
1. افتح [Google Search Console](https://search.google.com/search-console)
2. اختر موقعك
3. انتقل إلى **Sitemaps** (خرائط الموقع)
4. احذف sitemap القديم
5. أضف sitemap جديد: `https://saf9a.com/sitemap.xml`
6. انقر على "Submit" (إرسال)

#### ب. طلب فهرسة الصفحة الرئيسية
1. في Google Search Console، انتقل إلى **URL Inspection** (فحص عنوان URL)
2. أدخل: `https://saf9a.com`
3. انقر على **Request Indexing** (طلب الفهرسة)
4. انتظر التأكيد

#### ج. إزالة الصفحات القديمة مؤقتاً (اختياري)
1. انتقل إلى **Removals** (الإزالات)
2. انقر على **New Request** (طلب جديد)
3. أدخل: `https://saf9a.com/shop-with-sidebar`
4. اختر **Temporarily remove URL** (إزالة مؤقتة)
5. كرر العملية لـ `/shop-without-sidebar`
6. **ملاحظة**: هذه إزالة مؤقتة لمدة 6 أشهر لإعطاء الأولوية للصفحة الرئيسية

### 4. تحسينات إضافية للمحتوى

#### أ. إضافة محتوى نصي للصفحة الرئيسية
تأكد من أن الصفحة الرئيسية تحتوي على:
- نص ترحيبي واضح
- عناوين H1 و H2 مناسبة
- محتوى غني بالكلمات المفتاحية

#### ب. إضافة Internal Links
أضف روابط داخلية من صفحات أخرى تشير للصفحة الرئيسية:
- من Footer
- من Header/Menu
- من صفحات المنتجات

### 5. إنشاء ملف Google Site Verification (إن لم يكن موجوداً)

في `public/`:
\`\`\`html
<!-- google-site-verification.html -->
google-site-verification: YOUR_VERIFICATION_CODE
\`\`\`

### 6. المراقبة والانتظار

#### الفترة الزمنية المتوقعة:
- **1-3 أيام**: بدء ظهور التحسينات في Search Console
- **1-2 أسبوع**: تحسن ملحوظ في ترتيب الصفحة الرئيسية
- **2-4 أسابيع**: استقرار كامل في نتائج البحث

#### أدوات المراقبة:
1. **Google Search Console**: راقب Performance Report
2. **Google Analytics**: راقب الترافيك على `/`
3. **Test live URL**: استخدم في Search Console لاختبار الفهرسة

## نصائح إضافية

### 1. استخدم Google Search Console Coverage Report
- راقب أي أخطاء في الفهرسة
- تأكد من عدم وجود صفحات محظورة

### 2. تحقق من Core Web Vitals
- تأكد من سرعة تحميل الصفحة الرئيسية
- استخدم Google PageSpeed Insights

### 3. تحسين المحتوى المرئي
- أضف صور بجودة عالية مع alt text
- استخدم Schema.org markup (موجود بالفعل)

### 4. بناء Backlinks
- شارك رابط الصفحة الرئيسية على وسائل التواصل الاجتماعي
- أضف الموقع في دلائل المواقع

## الأوامر السريعة

\`\`\`bash
# إعادة بناء المشروع
npm run build

# اختبار محلي
npm run dev

# التحقق من Sitemap
curl https://saf9a.com/sitemap.xml

# التحقق من robots.txt
curl https://saf9a.com/robots.txt
\`\`\`

## التحقق من النتائج

بعد 24-48 ساعة، جرب:
1. البحث عن: `site:saf9a.com` في Google
2. البحث عن: `saf9a` أو `saf9a marketplace`
3. تحقق من Google Search Console Performance

## المساعدة والدعم

إذا استمرت المشكلة بعد أسبوعين:
1. تحقق من Google Search Console Coverage Report
2. تأكد من عدم وجود Manual Actions
3. راجع Security Issues
4. تحقق من Mobile Usability

---

**تاريخ التحديث**: مارس 2026
**الحالة**: ✅ تم تطبيق جميع التحسينات
