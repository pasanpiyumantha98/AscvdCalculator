import Footer from "../components/footer";
import Header from "../components/header";

function Privacy() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur">
            Policy & Compliance
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            We respect your privacy. Learn how we handle data on{" "}
            <span className="font-semibold">ASCVDRiskCalculator.org</span>, including cookies,
            analytics, and your rights.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              Last updated: Oct 25, 2025
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Version 1.0
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="bg-white scroll-smooth">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents */}
          <aside className="lg:col-span-4">
            <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-900 tracking-wide">
                On this page
              </h2>
              <nav className="mt-4">
                <ul className="space-y-3 text-sm">
                  {[
                    ["summary", "Quick Summary"],
                    ["collect", "What We Collect"],
                    ["use", "How We Use Your Information"],
                    ["medical", "Medical Disclaimer"],
                    ["cookies", "Cookies"],
                    ["analytics", "Analytics"],
                    ["share", "When We Share Information"],
                    ["retention", "Data Retention"],
                    ["security", "Data Security"],
                    ["children", "Children’s Privacy"],
                    ["rights", "Your Rights & Choices"],
                    ["gdpr", "GDPR (EEA/UK)"],
                    ["ccpa", "CCPA/CPRA (California)"],
                    ["transfers", "International Transfers"],
                    ["links", "Third-Party Links"],
                    ["changes", "Changes to This Policy"],
                    ["contact", "Contact Us"],
                    ["hipaa", "HIPAA Notice"]
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="group inline-flex items-center text-gray-600 hover:text-blue-700"
                      >
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <section className="lg:col-span-8 space-y-8">
            {/* Intro Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <p className="text-gray-700">
                Welcome to <strong>ASCVDRiskCalculator.org</strong> . This
                Privacy Policy explains what data we collect, how we use it, and your choices when
                using our website and tools (the “Services”).
              </p>
            </div>

            {/* Summary */}
            <article id="summary" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Quick Summary</h3>
              <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                <li>We collect only what’s necessary to operate and improve the calculator.</li>
                <li>We <span className="font-semibold">do not</span> sell your personal information.</li>
                <li>You can request access, correction, or deletion of your data.</li>
                <li>This site is educational and not a substitute for medical advice.</li>
              </ul>
            </article>

            {/* What We Collect */}
            <article id="collect" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">What We Collect</h3>
              <h4 className="mt-3 font-semibold text-gray-900">Information You Provide</h4>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  <strong>Calculator inputs:</strong> Age, sex, blood pressure, cholesterol, smoking,
                  diabetes, etc. These values are processed <em>in your browser</em> and aren’t linked
                  to your identity by default.
                </li>
                <li>
                  <strong>Contact details:</strong> If you email us or use a form, we may receive your
                  name, email, and message.
                </li>
              </ul>
              <h4 className="mt-4 font-semibold text-gray-900">Automatically Collected</h4>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  <strong>Usage data:</strong> Pages visited, device/browser type, referrers, broad
                  location (from IP), timestamps.
                </li>
                <li>
                  <strong>Cookies &amp; local storage:</strong> Preferences and performance metrics (see “Cookies”).
                </li>
              </ul>
            </article>

            {/* Use */}
            <article id="use" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">How We Use Your Information</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>Provide and improve the calculator and user experience.</li>
                <li>Analyze aggregate usage and performance.</li>
                <li>Respond to inquiries and provide support.</li>
                <li>Maintain security, prevent abuse, and meet legal obligations.</li>
              </ul>
            </article>

            {/* Medical Disclaimer */}
            <article id="medical" className="rounded-2xl border border-blue-200 bg-blue-50/40 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Medical Disclaimer</h3>
              <p className="mt-2 text-blue-900">
                <strong>ASCVDRiskCalculator.org does not provide medical advice.</strong> Outputs are for
                educational purposes only. Always consult a qualified clinician for diagnosis and treatment.
              </p>
            </article>

            {/* Cookies */}
            <article id="cookies" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Cookies</h3>
              <p className="mt-2 text-gray-700">
                We may use cookies or local storage to remember preferences (e.g., units or theme) and to
                measure site performance. You can control cookies in your browser. Disabling them may
                limit some features.
              </p>
            </article>

            {/* Analytics */}
            <article id="analytics" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Analytics</h3>
              <p className="mt-2 text-gray-700">
                We prefer privacy-respecting analytics with IP anonymization or equivalent safeguards.
                Analytics are used only to understand aggregate usage and improve features.
              </p>
            </article>

            {/* Sharing */}
            <article id="share" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">When We Share Information</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>With service providers under confidentiality and data-protection obligations.</li>
                <li>To comply with law or protect rights, safety, and security.</li>
                <li>As de-identified, aggregate statistics that do not identify individuals.</li>
              </ul>
            </article>

            {/* Retention */}
            <article id="retention" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Data Retention</h3>
              <p className="mt-2 text-gray-700">
                We keep personal information only as long as needed for the purposes described here and
                to meet legal obligations. Calculator inputs are typically processed in your browser and
                not stored on our servers unless you explicitly send them to us.
              </p>
            </article>

            {/* Security */}
            <article id="security" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Data Security</h3>
              <p className="mt-2 text-gray-700">
                We use reasonable technical and organizational measures; however, no method is 100% secure.
                Avoid sharing sensitive information unnecessarily.
              </p>
            </article>

            {/* Children */}
            <article id="children" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Children’s Privacy</h3>
              <p className="mt-2 text-gray-700">
                Our Services are not directed to children under 13 (or under 16 in some regions). If you
                believe a child provided personal information, contact us to remove it.
              </p>
            </article>

            {/* Rights */}
            <article id="rights" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Your Rights &amp; Choices</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>Request access, correction, or deletion of your personal information.</li>
                <li>Opt out of analytics cookies via your browser or available opt-out mechanisms.</li>
              </ul>
            </article>

            {/* GDPR */}
            <article id="gdpr" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">GDPR (EEA/UK)</h3>
              <p className="mt-2 text-gray-700">
                Legal bases may include consent, contract necessity, legal obligations, and legitimate
                interests. You may have rights to access, rectify, erase, restrict/ object, data
                portability, and to complain to a supervisory authority. You can withdraw consent anytime.
              </p>
            </article>

            {/* CCPA */}
            <article id="ccpa" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">CCPA/CPRA (California)</h3>
              <p className="mt-2 text-gray-700">
                California residents may request to know, access, and delete certain personal information,
                and opt out of “selling” or “sharing” for cross-context ads (we do not sell personal
                information). No discrimination for exercising rights.
              </p>
            </article>

            {/* Transfers */}
            <article id="transfers" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">International Transfers</h3>
              <p className="mt-2 text-gray-700">
                If you access the Services from outside our hosting region, your information may be
                transferred to countries with different data-protection laws. We apply appropriate
                safeguards where required.
              </p>
            </article>

            {/* Links */}
            <article id="links" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Third-Party Links</h3>
              <p className="mt-2 text-gray-700">
                Our site may link to third-party websites we don’t control. Review their privacy policies
                before sharing information.
              </p>
            </article>

            {/* Changes */}
            <article id="changes" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Changes to This Policy</h3>
              <p className="mt-2 text-gray-700">
                We may update this Policy from time to time. The “Last updated” date reflects the latest
                revision. Material changes will be highlighted or communicated when appropriate.
              </p>
            </article>

            {/* Contact */}
            <article id="contact" className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
              <p className="mt-2 text-gray-700">
                For questions or privacy requests, contact:
              </p>
              <address className="mt-2 not-italic text-gray-800">
                <strong>ASCVDRiskCalculator.org</strong>
                <br />
                Email:{" "}
                <a href="mailto:contact@ascvdriskcalculator.org" className="text-blue-700 underline">
                  contact@ascvdriskcalculator.org
                </a>
              </address>
            </article>

            {/* HIPAA */}
            <article id="hipaa" className="rounded-2xl border border-rose-200 bg-rose-50/50 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900">HIPAA Notice</h3>
              <p className="mt-2 text-rose-900">
                We are not a HIPAA covered entity or business associate. Do not upload or transmit
                protected health information (PHI).
              </p>
            </article>

            {/* CTA */}
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Need help with your data?</h4>
                  <p className="text-gray-700">
                    Submit a request to access, correct, or delete your information.
                  </p>
                </div>
                <a
                  href="mailto:contact@ascvdriskcalculator.org?subject=Privacy%20Request"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Contact Privacy Team
                </a>
              </div>
            </div>

            {/* Back to top */}
            <div className="flex justify-end">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-blue-700 hover:underline"
                aria-label="Back to top"
              >
                ↑ Back to top
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Privacy;
