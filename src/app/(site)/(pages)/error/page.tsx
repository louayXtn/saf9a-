import React from "react";
import Error from "@/components/Error";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Error - Something Went Wrong | Saf9a Store',
  description: 'An error occurred. Please try again or contact support if the problem persists.',
  keywords: ['error', 'saf9a'],
  url: 'https://saf9a.com/error',
});

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
