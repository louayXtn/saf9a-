#!/bin/bash

# Script للتحقق من إعدادات SEO

echo "🔍 فحص إعدادات SEO للموقع..."
echo "================================"
echo ""

# تحديد الـ domain
DOMAIN="https://saf9a.com"

echo "1️⃣ فحص robots.txt..."
if [ -f "public/robots.txt" ]; then
    echo "✅ ملف robots.txt موجود"
    cat public/robots.txt
else
    echo "❌ ملف robots.txt غير موجود"
fi
echo ""

echo "2️⃣ فحص sitemap..."
echo "   التحقق من بناء sitemap..."
if grep -q "sitemap.ts" src/app/sitemap.ts; then
    echo "✅ ملف sitemap.ts موجود"
else
    echo "❌ ملف sitemap.ts غير موجود"
fi
echo ""

echo "3️⃣ فحص metadata الصفحة الرئيسية..."
if grep -q "Saf9a" src/app/\(site\)/page.tsx; then
    echo "✅ metadata موجود في الصفحة الرئيسية"
else
    echo "❌ metadata غير موجود أو غير صحيح"
fi
echo ""

echo "4️⃣ فحص أولويات sitemap..."
if grep -q "priority.*1.0" src/app/sitemap.ts; then
    echo "✅ الأولوية 1.0 موجودة للصفحة الرئيسية"
else
    echo "⚠️  الأولوية قد لا تكون مضبوطة بشكل صحيح"
fi
echo ""

echo "5️⃣ التحقق من structured data..."
if [ -d "src/utils" ] && grep -q "structuredData" src/utils/structuredData.ts 2>/dev/null; then
    echo "✅ ملفات structured data موجودة"
else
    echo "⚠️  تحقق من ملفات structured data"
fi
echo ""

echo "================================"
echo "📊 ملخص الفحص"
echo "================================"
echo ""
echo "✨ الخطوات التالية:"
echo "  1. قم ببناء المشروع: npm run build"
echo "  2. ارفع التعديلات للإنتاج"
echo "  3. أعد إرسال sitemap في Google Search Console"
echo "  4. اطلب فهرسة الصفحة الرئيسية"
echo ""
echo "🔗 روابط مهمة:"
echo "  - Sitemap: ${DOMAIN}/sitemap.xml"
echo "  - Robots: ${DOMAIN}/robots.txt"
echo "  - الصفحة الرئيسية: ${DOMAIN}/"
echo ""
echo "📚 للمزيد من المعلومات، راجع: SEO_FIX_GUIDE.md"
echo ""
