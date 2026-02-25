import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Wishlist - Saved Items | Saf9a Store',
  description: 'View and manage your saved items on Saf9a. Keep track of products you love and buy them later.',
  keywords: ['wishlist', 'saved items', 'favorites', 'saf9a', 'saved products'],
  url: 'https://saf9a.com/wishlist',
});

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
