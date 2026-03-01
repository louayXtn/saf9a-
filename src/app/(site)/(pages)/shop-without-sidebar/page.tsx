import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = {
  ...generateSEO({
    title: 'Browse Products - Saf9a',
    description: 'Simple product browsing on Saf9a marketplace. View all available products easily.',
    keywords: ['browse', 'products', 'saf9a'],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop-without-sidebar`,
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

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  );
};

export default ShopWithoutSidebarPage;
