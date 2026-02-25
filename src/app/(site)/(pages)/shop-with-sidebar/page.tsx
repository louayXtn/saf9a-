import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Shop - Browse All Products | Saf9a Store',
  description: 'Browse and shop from thousands of products on Saf9a marketplace. Find electronics, fashion, home goods, and more at great prices. Filter by category, price, and more.',
  keywords: ['shop', 'buy products', 'online store', 'marketplace', 'saf9a', 'browse products', 'deals'],
  url: 'https://saf9a.com/shop-with-sidebar',
});

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
