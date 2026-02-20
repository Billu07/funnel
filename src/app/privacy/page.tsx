import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="bg-brand-dark text-white min-h-screen font-sans selection:bg-cyan-glow selection:text-brand-dark py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-glow">
          Privacy Policy
        </h1>
        <p className="text-slate-400 mb-8">Last Updated: February 13, 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Voicium (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our
              AI-powered calling platform and website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information that you provide directly to us, as well as
              data generated through your use of our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address,
                company name, billing information, and account credentials.
              </li>
              <li>
                <strong>Lead Data:</strong> Information about leads you upload
                to our system (e.g., names, phone numbers) for the purpose of
                using our calling services.
              </li>
              <li>
                <strong>Call Data:</strong> Recordings, transcripts, and
                metadata of calls made through our platform.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact
                with our dashboard, including features used and time spent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our services.</li>
              <li>To process your transactions and manage your account.</li>
              <li>
                To improve our AI models and call performance (using anonymized
                data).
              </li>
              <li>
                To communicate with you regarding updates, support, and
                administrative messages.
              </li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="mb-4">
              We do not sell your personal data. We may share your information
              in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> With third-party vendors who
                assist us in operating our platform (e.g., telephony providers,
                cloud hosting, payment processors).
              </li>
              <li>
                <strong>Legal Compliance:</strong> If required by law,
                regulation, or legal process to protect our rights or the safety
                of others.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, sale, or acquisition of our company.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the internet
              or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Your Rights and Choices
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              information stored in our system. You may also opt out of certain
              communications. To exercise these rights, please contact our
              support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at office@autolinium.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
