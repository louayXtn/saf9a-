import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbWithSchema({ items }: BreadcrumbProps) {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  // Generate JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://saf9a.onrender.com'}${item.url}` }),
    })),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                )}
                {isLast ? (
                  <span className="font-medium text-primary" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url || '/'}
                    className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  >
                    {index === 0 && <HomeIcon className="inline h-4 w-4" />}
                    {index === 0 ? '' : item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
