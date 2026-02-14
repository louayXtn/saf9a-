import React from 'react';

const FAQPage = () => {
  return (
    <div className="max-w-4xl mt-50 sm:mt-35 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="sm:text-4xl text-xl font-extrabold mb-8 text-center text-gray-900">
         Frequently Asked Questions (FAQ) ❓
      </h1>

      {/* General Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🛒 General</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-bold text-lg">Q: What is the marketplace project?</dt>
            <dd className="mt-1 text-gray-700">
              A: It is an open platform that allows users to buy and sell products easily and transparently.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: Can I register for free?</dt>
            <dd className="mt-1 text-gray-700">A: Yes, registration is completely free for all users.</dd>
          </div>
        </dl>
      </section>

      <hr className="my-8 border-gray-300" />

      {/* Accounts Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">👤 Accounts</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-bold text-lg">Q: How do I create a new account?</dt>
            <dd className="mt-1 text-gray-700">
              A: Click on the "Create Account" button and enter your basic details such as name, email, and password.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: Can I edit my account information?</dt>
            <dd className="mt-1 text-gray-700">
              A: Yes, you can edit your personal information from the "Profile" page.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: What should I do if I forget my password?</dt>
            <dd className="mt-1 text-gray-700">
              A: Use the "Forgot Password" option and a reset link will be sent to your email.
            </dd>
          </div>
        </dl>
      </section>

      <hr className="my-8 border-gray-300" />

      {/* Products Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">📦 Products</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-bold text-lg">Q: How do I add a new product?</dt>
            <dd className="mt-1 text-gray-700">
              A: From the "Add Product" page, enter the product details and upload the required images.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: Are there limits on the number of products I can list?</dt>
            <dd className="mt-1 text-gray-700">A: No, you can list an unlimited number of products.</dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: How do I know the status of my product (Pending, Approved, Rejected)?</dt>
            <dd className="mt-1 text-gray-700">
              A: The status will appear next to the product in the "My Products" page.
            </dd>
          </div>
        </dl>
      </section>

      <hr className="my-8 border-gray-300" />

      {/* Security & Policies Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔒 Security & Policies</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-bold text-lg">Q: Is my personal data safe?</dt>
            <dd className="mt-1 text-gray-700">
              A: Yes, we use modern technologies to protect your data.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: Where can I find the Terms of Use and Privacy Policy?</dt>
            <dd className="mt-1 text-gray-700">
              You can view them through the following links:
              <ul className="list-disc list-inside mt-2">
                <li>
                    📄 <a className="text-blue-600 hover:underline" href="/quickLink/terms-of-use">Terms of Use</a>
                </li>
                <li>
                    🔐 <a className="text-blue-600 hover:underline" href="/quickLink/privacy-policy">Privacy Policy</a>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <hr className="my-8 border-gray-300" />

      {/* Sellers Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🤝 Sellers</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-bold text-lg">Q: Can anyone become a seller?</dt>
            <dd className="mt-1 text-gray-700">
              A: Yes, any user can add their products after creating an account.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: Are there any fees for selling?</dt>
            <dd className="mt-1 text-gray-700">A: There are no fees for listing products.</dd>
          </div>
        </dl>
      </section>

      <hr className="my-8 border-gray-300" />

      {/* Support Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🛠️ Technical Support</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-bold text-lg">Q: How can I contact the support team?</dt>
            <dd className="mt-1 text-gray-700">
              A: You can use the "Contact Us" page or send a message via the dedicated support email.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-lg">Q: What should I do if I face a technical issue?</dt>
            <dd className="mt-1 text-gray-700">
              A: Try reloading the page or logging out and back in. If the issue persists, contact technical support.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
};

export default FAQPage;