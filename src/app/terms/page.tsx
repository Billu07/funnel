import React from "react";

export default function TermsOfService() {
  return (
    <main className="bg-brand-dark text-white min-h-screen font-sans selection:bg-cyan-glow selection:text-brand-dark py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-glow">
          Terms of Service
        </h1>
        <p className="text-slate-400 mb-8">Last Updated: February 13, 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Voicium (&quot;Service&quot;), provided by Autolinium
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Description of Service
            </h2>
            <p>
              Voicium is an AI-powered lead qualification and calling platform
              designed to help businesses automate their outbound calling
              efforts. We provide tools for lead management, automated calling,
              transcription, and reporting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. User Responsibilities and Compliance
            </h2>
            <p className="mb-4">
              You are solely responsible for your use of the Service and for
              compliance with all applicable laws and regulations, including but
              not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Telephone Consumer Protection Act (TCPA):</strong> You
                must have valid consent to call the numbers you upload.
              </li>
              <li>
                <strong>Do Not Call (DNC) Registries:</strong> You must scrub
                your lists against national and state DNC registries where
                applicable.
              </li>
              <li>
                <strong>Telemarketing Sales Rule (TSR):</strong> You must comply
                with all telemarketing rules regarding disclosure and calling
                times.
              </li>
              <li>
                <strong>Recording Laws:</strong> You are responsible for
                complying with call recording consent laws (e.g., one-party vs.
                two-party consent).
              </li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate your account
              immediately if we suspect any violation of these laws or if your
              usage patterns suggest spam or harassment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Account Security
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Payment and Billing
            </h2>
            <p>
              Fees for our Service are billed in advance on a monthly basis. All
              payments are non-refundable. We reserve the right to change our
              pricing upon notice. Failure to pay may result in service
              suspension.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Intellectual Property
            </h2>
            <p>
              The Service, including its software, algorithms, designs, and
              content, is the exclusive property of Autolinium and its
              licensors. You are granted a limited, non-exclusive,
              non-transferable license to use the Service for your internal
              business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Autolinium shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses, resulting from (a) your
              access to or use of or inability to access or use the Service; (b)
              any conduct or content of any third party on the Service; or (c)
              unauthorized access, use, or alteration of your transmissions or
              content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Termination
            </h2>
            <p>
              We may terminate or suspend your access to the Service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of the jurisdiction in which Autolinium is registered,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at
              office@autolinium.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
