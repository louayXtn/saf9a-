import { MetadataRoute } from 'next';

// Replace with your actual domain
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saf9a.onrender.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes with proper priorities
  const routePriorities: Record<string, number> = {
    '': 1.0,                      // الصفحة الرئيسية - أعلى أولوية
    '/shop-with-sidebar': 0.9,    // المرتبة الثانية
    '/shop-without-sidebar': 0.9, // المرتبة الثانية
    '/cart': 0.7,
    '/checkout': 0.7,
    '/contact': 0.8,
    '/wishlist': 0.7,
    '/my-account': 0.6,
  };

  const routes = [
    '',
    '/shop-with-sidebar',
    '/shop-without-sidebar',
    '/cart',
    '/checkout',
    '/contact',
    '/wishlist',
    '/my-account',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (route === '' ? 'always' : route.includes('shop') ? 'hourly' : 'daily') as 'always' | 'hourly' | 'daily',
    priority: routePriorities[route] || 0.5,
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
