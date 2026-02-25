import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Saf9a Store',
  description: 'The page you are looking for could not be found. Browse our marketplace or return to the homepage.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-4xl font-bold text-dark dark:text-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-body">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
          >
            Go to Homepage
          </Link>
          <Link
            href="/shop-with-sidebar"
            className="inline-flex items-center justify-center rounded-md border border-primary px-8 py-3 text-center text-base font-medium text-primary hover:bg-primary hover:text-white"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
