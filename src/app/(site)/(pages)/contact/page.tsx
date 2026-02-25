import Contact from "@/components/Contact";

import { Metadata } from "next";
import { generateSEO } from "@/utils/seo";

export const metadata: Metadata = generateSEO({
  title: 'Contact Us - Get in Touch | Saf9a Store',
  description: 'Have questions? Contact Saf9a Store customer support. We\'re here to help with your buying and selling experience on our marketplace.',
  keywords: ['contact', 'customer support', 'help', 'saf9a contact', 'get in touch'],
  url: 'https://saf9a.com/contact',
});

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
