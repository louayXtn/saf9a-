import React from "react";
import MailSuccess from "@/components/MailSuccess";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Message Sent Successfully | Saf9a Store',
  description: 'Your message has been sent successfully. We\'ll get back to you soon.',
  keywords: ['message sent', 'contact success', 'saf9a'],
  url: 'https://saf9a.com/mail-success',
});

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
