import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Sign Up - Create Your Account | Saf9a Store',
  description: 'Create a free Saf9a account to start buying and selling products. Join our trusted marketplace community today.',
  keywords: ['sign up', 'create account', 'register', 'join saf9a', 'new account'],
  url: 'https://saf9a.com/signup',
});

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
