import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Shopping Cart | Saf9a Store',
  description: 'Review your shopping cart and proceed to checkout on Saf9a marketplace.',
  keywords: ['cart', 'shopping cart', 'checkout', 'saf9a'],
  url: 'https://saf9a.com/cart',
});

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
