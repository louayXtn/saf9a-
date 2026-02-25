import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'My Account - Profile & Settings | Saf9a Store',
  description: 'Manage your Saf9a account, view orders, update profile information, and manage your listings.',
  keywords: ['my account', 'profile', 'user settings', 'saf9a account', 'orders'],
  url: 'https://saf9a.com/my-account',
});

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;
