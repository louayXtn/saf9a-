# إعداد متغيرات البيئة في Render

## 🚨 مشكلة: Canonical URL Conflict

عند تشغيل Lighthouse، ظهرت المشكلة:
```
Multiple conflicting URLs (https://saf9a.com/, https://saf9a.onrender.com/)
```

## ✅ الحل: إضافة متغيرات البيئة في Render

### الخطوات:

#### 1️⃣ اذهب إلى Render Dashboard
افتح: [https://dashboard.render.com](https://dashboard.render.com)

#### 2️⃣ اختر الـ Service
- ابحث عن: `saf9a` أو اسم المشروع
- انقر عليه

#### 3️⃣ انتقل إلى Environment
- من القائمة الجانبية، انقر على **Environment**
- ستجد قسم "Environment Variables"

#### 4️⃣ أضف المتغيرات

انقر على **Add Environment Variable** وأضف:

**المتغير الأول:**
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://saf9a.onrender.com
```

**المتغير الثاني:**
```
Key: NEXT_PUBLIC_API_URL  
Value: https://saf9a.onrender.com
```

**⚠️ ملاحظة مهمة:**
- لا تضع `/` في نهاية الـ URL
- استخدم `https://` وليس `http://`

#### 5️⃣ احفظ التغييرات
- انقر على **Save Changes**
- سيقوم Render بإعادة deployment تلقائياً
- سيستغرق ذلك **3-5 دقائق**

---

## 🔍 التحقق من التغييرات

### بعد اكتمال Deployment:

#### 1. تحقق من الـ metadata
افتح في المتصفح:
```
https://saf9a.onrender.com
```

**أضغط View source → ابحث عن:**
```html
<link rel="canonical" href="https://saf9a.onrender.com/" />
```

يجب أن ترى `saf9a.onrender.com` ✅ وليس `saf9a.com` ❌

#### 2. جرب Lighthouse مرة أخرى
```
Chrome DevTools → Lighthouse → Generate report
```

**يجب أن يختفي:**
```
❌ Document does not have a valid rel=canonical
```

#### 3. تحقق من structured data
```
View source → ابحث عن <script type="application/ld+json">
```

يجب أن ترى URLs بـ `saf9a.onrender.com` ✅

---

## 📝 ملاحظات إضافية

### لماذا هذا مهم؟
- **Canonical URLs** تخبر Google أي نسخة من الـ URL هي الأساسية
- URLs متعارضة = Google يتشوش ولا يعرف أي صفحة يفهرس
- هذا يؤثر سلباً على SEO ranking

### هل يجب تحديث شيء آخر؟
لا! جميع الملفات تستخدم `process.env.NEXT_PUBLIC_SITE_URL` ✅:
- ✅ `src/utils/seo.ts`
- ✅ `src/app/sitemap.ts`
- ✅ `src/utils/structuredData.ts`
- ✅ `src/components/Common/BreadcrumbWithSchema.tsx`

فقط يحتاج Render إلى معرفة القيمة الصحيحة!

---

## 🚀 بعد التحديث

### في Google Search Console:

1. أعد إرسال sitemap (إن لم تكن قد فعلت):
   ```
   https://saf9a.onrender.com/sitemap.xml
   ```

2. اطلب إعادة فهرسة الصفحة الرئيسية:
   ```
   https://saf9a.onrender.com
   ```

3. انتظر 24-48 ساعة للنتائج

---

## ❓ الأسئلة الشائعة

### س: هل يجب إعادة deployment يدوياً؟
**ج**: لا! Render يعيد deployment تلقائياً عند تغيير environment variables.

### س: كم يستغرق Deployment؟
**ج**: عادة 3-5 دقائق، قد تصل إلى 10 دقائق.

### س: هل سيؤثر على الموقع الحالي؟
**ج**: لا، لن يحدث downtime. الموقع سيستمر في العمل.

### س: ماذا لو نسيت إضافة المتغيرات؟
**ج**: سيستخدم الموقع القيمة الافتراضية `https://saf9a.onrender.com` (موجودة في الكود).

---

**آخر تحديث**: مارس 2026  
**الأولوية**: 🔴 عالية جداً - يؤثر على SEO  
**الوقت المقدر**: 5 دقائق للإعداد + 5 دقائق deployment
