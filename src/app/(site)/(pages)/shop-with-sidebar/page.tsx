import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = {
  ...generateSEO({
    title: 'Shop All Products - Saf9a Marketplace',
    description: 'Browse products with advanced filters on Saf9a. Find what you need easily with our sidebar navigation.',
    keywords: ['shop', 'browse products', 'filter products', 'saf9a shop'],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop-with-sidebar`,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
