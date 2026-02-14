"use client";
import React from "react";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen mt-50 sm:mt-30 bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Terms of Use
        </h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Introduction</h2>
            <p>
              Welcome to our marketplace platform. By accessing or using our website,
              you agree to comply with and be bound by these Terms of Use. These terms
              govern your rights and responsibilities as a user of our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use this platform.</li>
              <li>By registering, you confirm that the information you provide is accurate and complete.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users must create an account to buy or sell products.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Any activity under your account is your responsibility.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Selling Products</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sellers may list products that comply with applicable laws and our marketplace policies.</li>
              <li>Prohibited items include illegal goods, counterfeit products, and items that violate intellectual property rights.</li>
              <li>Sellers must provide accurate descriptions, images, and pricing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Buying Products</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Buyers agree to purchase products in accordance with the listed terms.</li>
              <li>Payments must be made through the platform’s approved payment methods.</li>
              <li>Buyers are responsible for reviewing product details before purchase.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Transactions</h2>
            <p>
              The platform facilitates transactions between buyers and sellers but is not a party to the contracts.
              We reserve the right to cancel or suspend transactions that violate our policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Fees</h2>
            <p>
              The platform may charge service or transaction fees, which will be disclosed prior to purchase or sale.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Content and Intellectual Property</h2>
            <p>
              Users grant the platform a non-exclusive license to use content (images, descriptions) for display purposes.
              All platform content, design, and trademarks remain the property of the marketplace.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Prohibited Conduct</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engage in fraudulent activity.</li>
              <li>Misuse the platform for illegal purposes.</li>
              <li>Interfere with other users’ listings or transactions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Privacy</h2>
            <p>
              We respect your privacy and handle your data in accordance with our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Termination</h2>
            <p>
              We may suspend or terminate accounts that violate these Terms of Use.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Limitation of Liability</h2>
            <p>
              The platform is not liable for disputes between buyers and sellers.
              We do not guarantee product quality, safety, or legality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Changes to Terms</h2>
            <p>
              We may update these Terms of Use at any time. Continued use of the platform constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Governing Law</h2>
            <p>
              These Terms of Use are governed by the laws of the jurisdiction where the platform operates.
              By using this marketplace, you acknowledge that you have read, understood, and agreed to these Terms of Use.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}