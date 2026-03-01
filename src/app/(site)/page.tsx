import Home from "@/components/Home";
import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";
import StructuredData from "@/components/Common/StructuredData";
import { organizationSchema, websiteSchema } from "@/utils/structuredData";

export const metadata: Metadata = generateSEO({
  title: 'Saf9a - سوق إلكترونية | شراء وبيع منتجات أون لاين | أفضل الصفقات',
  description: 'Saf9a ساف9ا - سوق إلكترونية موثوقة للبيع والشراء. اكتشف أفضل الصفقات على الإلكترونيات والأزياء والسلع المنزلية. تسوق أون لاين وبيع منتجاتك مع آلاف البائعين والمشترين الموثوقين.',
  keywords: [
    'صفقة',
    'saf9a',
    'سوق إلكترونية',
    'أون لاين',
    'تسوق أون لاين',
    'متجر إلكتروني',
    'شراء وبيع',
    'بيع منتجات',
    'شراء منتجات',
    'صفقات',
    'صفقات رابحة',
    'أفضل الصفقات',
    'marketplace',
    'ecommerce',
    'buy and sell',
    'online marketplace',
    'إلكترونيات',
    'electronics',
    'أزياء',
    'fashion',
    'سلع منزلية',
    'home goods',
    'متجر موثوق',
    'منصة شراء وبيع',
    'جودة عالية',
    'أسعار منخفضة',
    'deals',
    'be9a',
  ],
});

export default function HomePage() {
  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <Home />
    </>
  );
}
