import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Shop All Products | Saf9a Marketplace',
  description: 'Discover amazing deals on Saf9a. Browse thousands of products from trusted sellers. Electronics, fashion, home goods, and more.',
  keywords: ['shop', 'products', 'marketplace', 'saf9a', 'online shopping', 'deals'],
  url: 'https://saf9a.com/shop-without-sidebar',
});

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  );
};

export default ShopWithoutSidebarPage;
