import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saf9a Store - Buy and Sell Marketplace',
    short_name: 'Saf9a',
    description: 'A trusted marketplace for buying and selling any product. Find great deals on new and used items.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3C50E0',
    icons: [
      {
        src: '/images/logo/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/logo/logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo/logo-icon-large.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
