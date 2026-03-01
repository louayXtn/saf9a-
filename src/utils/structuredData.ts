const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saf9a.onrender.com';

// Organization schema for the website
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Saf9a Store',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo.png`,
  description: 'A trusted marketplace for buying and selling any product online',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@saf9a.com',
    areaServed: 'Worldwide',
  },
  sameAs: [
    'https://facebook.com/saf9astore',
    'https://twitter.com/saf9astore',
    'https://instagram.com/saf9astore',
  ],
};

// Website schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Saf9a Store',
  url: SITE_URL,
  description: 'Buy and sell any product on our marketplace',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shop?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Product schema generator
export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  brand?: string;
  condition?: string;
  seller?: {
    name: string;
    rating?: number;
  };
  rating?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${SITE_URL}/images/products/default.jpg`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Various',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: product.condition === 'new' 
        ? 'https://schema.org/NewCondition'
        : 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: product.seller?.name || 'Saf9a Store',
      },
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    category: product.category,
  };
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

// Blog post schema generator
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || `${SITE_URL}/images/blog/default.jpg`,
    url: `${SITE_URL}/blogs/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Saf9a Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saf9a Store',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/logo.png`,
      },
    },
  };
}

// FAQ schema generator
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Local Business schema (if you have physical location)
export function generateLocalBusinessSchema(location?: {
  address: string;
  city: string;
  country: string;
  phone: string;
}) {
  if (!location) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Saf9a Store',
    image: `${SITE_URL}/images/logo/logo.png`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: location.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressCountry: location.country,
    },
  };
}
