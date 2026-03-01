import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saf9a.onrender.com';
const SITE_NAME = 'Saf9a Store';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  publishedTime?: string;
  author?: string;
}

export function generateSEO({
  title = 'Saf9a Store - Buy and Sell Marketplace',
  description = 'Buy and sell any product on Saf9a marketplace. Find great deals on electronics, fashion, home goods, and more. Your trusted platform for buying and selling online.',
  keywords = ['marketplace', 'buy', 'sell', 'products', 'online shopping', 'saf9a', 'ecommerce', 'deals'],
  image = `${SITE_URL}/images/og-image.jpg`,
  url = SITE_URL,
  type = 'website',
  locale = 'en_US',
  publishedTime,
  author,
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    
    // Open Graph
    openGraph: {
      type,
      locale,
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@saf9astore', // Replace with your Twitter handle
    },
    
    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification (add your verification codes)
    verification: {
      google: '2aH1rcFD5HzQnHd0TFan3bTgPWoA0aIucu0NEvr5lQA',
      yandex: 'your-yandex-verification-code',
    },
    
    // Alternate languages
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'ar-SA': `${url}/ar`, // If you have Arabic version
      },
    },
    
    // Icons
    icons: {
      icon: '/images/logo/favicon.ico',
      shortcut: '/images/logo/favicon.ico',
      apple: '/images/logo/apple-touch-icon.png',
    },
    
    // Manifest
    manifest: '/manifest.json',
    
    // Other
    metadataBase: new URL(SITE_URL),
    category: 'ecommerce',
  };
}

// Generate product-specific SEO
export function generateProductSEO({
  name,
  description,
  price,
  category,
  image,
  id,
}: {
  name: string;
  description: string;
  price: number;
  category?: string;
  image?: string;
  id: string;
}): Metadata {
  return generateSEO({
    title: `${name} - Saf9a Store`,
    description: description.substring(0, 160),
    keywords: [
      'buy ' + name.toLowerCase(),
      category || 'product',
      'online shopping',
      'saf9a',
      'marketplace',
    ],
    image: image || `${SITE_URL}/images/products/default.jpg`,
    url: `${SITE_URL}/products/${id}`,
    type: 'website',
  });
}

// Generate blog SEO
export function generateBlogSEO({
  title,
  excerpt,
  image,
  slug,
  publishedAt,
  author,
}: {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
  publishedAt?: string;
  author?: string;
}): Metadata {
  return generateSEO({
    title: `${title} - Saf9a Blog`,
    description: excerpt,
    keywords: ['saf9a', 'blog', 'shopping tips', 'marketplace'],
    image: image || `${SITE_URL}/images/blog/default.jpg`,
    url: `${SITE_URL}/blogs/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    author,
  });
}
