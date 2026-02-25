import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Sign In - Access Your Account | Saf9a Store',
  description: 'Sign in to your Saf9a account to manage your listings, track orders, and continue shopping.',
  keywords: ['sign in', 'login', 'account access', 'saf9a login'],
  url: 'https://saf9a.com/signin',
});

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
