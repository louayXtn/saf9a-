import { MetadataRoute } from 'next';

// Replace with your actual domain
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saf9a.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const routes = [
    '',
    '/shop',
    '/shop-with-sidebar',
    '/cart',
    '/checkout',
    '/contact',
    '/blogs',
    '/wishlist',
    '/my-account',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  try {
    // Fetch products from your API
    const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    let productUrls: MetadataRoute.Sitemap = [];
    
    if (productsResponse.ok) {
      const data = await productsResponse.json();
      const products = data.products || data;
      
      productUrls = products.map((product: any) => ({
        url: `${SITE_URL}/products/${product._id || product.id}`,
        lastModified: product.updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }

    return [...routes, ...productUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes if dynamic fetch fails
    return routes;
  }
}
