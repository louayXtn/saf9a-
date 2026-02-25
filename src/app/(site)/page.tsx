import Home from "@/components/Home";
import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";
import StructuredData from "@/components/Common/StructuredData";
import { organizationSchema, websiteSchema } from "@/utils/structuredData";

export const metadata: Metadata = generateSEO({
  title: 'Saf9a Store - Buy and Sell Marketplace | Your Trusted Online Shopping Platform',
  description: 'Buy and sell any product on Saf9a marketplace. Find great deals on electronics, fashion, home goods, and more. Join thousands of buyers and sellers in our trusted community.',
  keywords: [
    'marketplace',
    'buy online',
    'sell products',
    'saf9a',
    'saf9a store',
    'online shopping',
    'ecommerce',
    'buy and sell',
    'used products',
    'new products',
    'deals',
    'shopping platform',
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
