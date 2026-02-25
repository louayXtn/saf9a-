#!/bin/bash

# SEO Setup Verification Script for Saf9a Store
# This script checks if all SEO components are properly configured

echo "🔍 Saf9a Store - SEO Setup Verification"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
checks_passed=0
checks_failed=0
checks_warning=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} $2 (Missing: $1)"
        ((checks_failed++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} $2 (Missing: $1)"
        ((checks_failed++))
    fi
}

# Function to check environment variable
check_env() {
    if grep -q "^$1=" .env.local 2>/dev/null; then
        value=$(grep "^$1=" .env.local | cut -d '=' -f2)
        if [ -n "$value" ] && [ "$value" != "your-" ] && [[ ! "$value" =~ ^your- ]]; then
            echo -e "${GREEN}✓${NC} $2 is set"
            ((checks_passed++))
        else
            echo -e "${YELLOW}⚠${NC} $2 needs configuration"
            ((checks_warning++))
        fi
    else
        echo -e "${YELLOW}⚠${NC} $2 not found in .env.local"
        ((checks_warning++))
    fi
}

echo "1. Checking Core SEO Files..."
echo "--------------------------------"
check_file "public/robots.txt" "Robots.txt"
check_file "src/app/sitemap.ts" "Dynamic Sitemap"
check_file "src/app/manifest.ts" "PWA Manifest"
echo ""

echo "2. Checking SEO Utilities..."
echo "--------------------------------"
check_file "src/utils/seo.ts" "SEO Helper Functions"
check_file "src/utils/structuredData.ts" "Structured Data Helpers"
echo ""

echo "3. Checking SEO Components..."
echo "--------------------------------"
check_file "src/components/Common/StructuredData.tsx" "Structured Data Component"
check_file "src/components/Common/GoogleAnalytics.tsx" "Google Analytics Component"
check_file "src/components/Common/BreadcrumbWithSchema.tsx" "Breadcrumb Component"
check_file "src/app/(site)/not-found.tsx" "404 Page"
echo ""

echo "4. Checking Documentation..."
echo "--------------------------------"
check_file "README.md" "README Documentation"
check_file "SEO_GUIDE.md" "SEO Guide"
check_file "SEO_CHECKLIST.md" "SEO Checklist"
check_file "DEPLOYMENT_CHECKLIST.md" "Deployment Checklist"
check_file "IMPLEMENTATION_SUMMARY.md" "Implementation Summary"
echo ""

echo "5. Checking Environment Configuration..."
echo "--------------------------------"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} .env.local file exists"
    check_env "NEXT_PUBLIC_SITE_URL" "Site URL"
    check_env "NEXT_PUBLIC_API_URL" "API URL"
    check_env "NEXT_PUBLIC_GA_MEASUREMENT_ID" "Google Analytics ID"
else
    echo -e "${YELLOW}⚠${NC} .env.local not found (copy from .env.example)"
    ((checks_warning++))
fi
echo ""

echo "6. Checking Required Images..."
echo "--------------------------------"
check_dir "public/images" "Images directory"
if [ -f "public/images/og-image.jpg" ] || [ -f "public/images/og-image.png" ]; then
    echo -e "${GREEN}✓${NC} Open Graph image"
    ((checks_passed++))
else
    echo -e "${YELLOW}⚠${NC} Open Graph image (create og-image.jpg - 1200x630px)"
    ((checks_warning++))
fi

if [ -d "public/images/logo" ]; then
    echo -e "${GREEN}✓${NC} Logo directory exists"
    ((checks_passed++))
    
    if [ -f "public/images/logo/favicon.ico" ]; then
        echo -e "${GREEN}✓${NC} Favicon"
        ((checks_passed++))
    else
        echo -e "${YELLOW}⚠${NC} Favicon (create favicon.ico)"
        ((checks_warning++))
    fi
else
    echo -e "${YELLOW}⚠${NC} Logo directory not found"
    ((checks_warning++))
fi
echo ""

echo "7. Checking Node Modules & Dependencies..."
echo "--------------------------------"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Node modules installed"
    ((checks_passed++))
else
    echo -e "${RED}✗${NC} Node modules not installed (run: npm install)"
    ((checks_failed++))
fi

if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json"
    ((checks_passed++))
else
    echo -e "${RED}✗${NC} package.json missing"
    ((checks_failed++))
fi
echo ""

echo "8. Checking Next.js Configuration..."
echo "--------------------------------"
check_file "next.config.js" "Next.js config"
check_file "tsconfig.json" "TypeScript config"
check_file "tailwind.config.ts" "Tailwind config"
echo ""

# Summary
echo "========================================"
echo "Summary:"
echo "========================================"
echo -e "${GREEN}✓${NC} Passed: $checks_passed"
echo -e "${YELLOW}⚠${NC} Warnings: $checks_warning"
echo -e "${RED}✗${NC} Failed: $checks_failed"
echo ""

if [ $checks_failed -eq 0 ] && [ $checks_warning -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Your SEO setup is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run build"
    echo "2. Deploy your site"
    echo "3. Follow DEPLOYMENT_CHECKLIST.md"
    exit 0
elif [ $checks_failed -eq 0 ]; then
    echo -e "${YELLOW}⚠ Setup is mostly complete, but some items need attention.${NC}"
    echo ""
    echo "Please review the warnings above and:"
    echo "1. Set up .env.local with your actual values"
    echo "2. Create required images (og-image, favicon, etc.)"
    echo "3. Review SEO_GUIDE.md for details"
    exit 0
else
    echo -e "${RED}❌ Some critical checks failed.${NC}"
    echo ""
    echo "Please fix the failed items above before proceeding."
    echo "Refer to IMPLEMENTATION_SUMMARY.md for guidance."
    exit 1
fi
