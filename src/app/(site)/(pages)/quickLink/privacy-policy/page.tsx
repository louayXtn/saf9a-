// app/quickLink/privacy-policy/page.tsx

export default function PrivacyPolicy() {
  return (
    <div className="container mt-50 sm:mt-30 mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        We are committed to protecting the privacy of our users. This policy explains how we collect,
        use, and store your personal information when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Information Collection</h2>
      <p className="mb-4">
        We collect information you provide during registration, such as your name and email address,
        as well as usage data like the pages you visit.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Use of Information</h2>
      <p className="mb-4">
        Your data is used to provide better services, improve user experience, and send notifications
        or updates related to your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Sharing of Information</h2>
      <p className="mb-4">
        We do not sell or share your data with third parties except in legal cases or to improve
        services through trusted partners.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Data Protection</h2>
      <p className="mb-4">
        We take appropriate security measures to protect your information from unauthorized access
        or unlawful use.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Policy Updates</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. You will be notified of any changes
        through the website or by email.
      </p>

      <p className="mt-8 text-gray-600">
        If you have any questions about this privacy policy, please contact us through the
        <span className="font-medium"> Contact Us </span> page.
      </p>
    </div>
  );
}