import Footer from "../components/footer";
import Header from "../components/header";
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // For now, send via mailto (replace with your API later)
    const mailto = `mailto:contact@ascvdriskcalculator.org?subject=${encodeURIComponent(
      form.subject || "Contact from ASCVDRiskCalculator.org"
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
  };

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur">
            Get in touch
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Questions about the calculator, privacy, or feedback? We’d love to
            hear from you.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              ASCVDRiskCalculator.org
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Typically responds within 1–2 business days
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Options (Sidebar on desktop) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Card: Email */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Email</h2>
              <p className="mt-2 text-gray-700">
                Send us a message and we’ll reply as soon as possible.
              </p>
              <a
                href="mailto:contact@ascvdriskcalculator.org"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                contact@ascvdriskcalculator.org
              </a>
            </div>

            {/* Card: Support Hours */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Support Hours (UTC+5:30)
              </h2>
              <ul className="mt-3 text-gray-700 space-y-1">
                <li>Mon–Fri: 9:00–17:00</li>
                <li>Sat–Sun: Email only</li>
              </ul>
            </div>

            {/* Card: Quick Links */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
              <ul className="mt-3 space-y-2 text-blue-700">
                <li>
                  <a className="hover:underline" href="/privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="/">
                    Home
                  </a>
                </li>
              </ul>
            </div>

            {/* Card: Social (optional) */}
            
          </aside>

          {/* Form + Info */}
          <section className="lg:col-span-8 space-y-8">
            {/* Intro card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <p className="text-gray-700">
                Fill out the form and we’ll get back to you. Please don’t share
                protected health information (PHI). For medical concerns, consult
                a qualified clinician.
              </p>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message…"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="/privacy" className="text-blue-700 underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
                <a
                  href="mailto:contact@ascvdriskcalculator.org"
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  Or email us directly
                </a>
              </div>
            </form>

            

           
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Didn’t find what you need?
                  </h3>
                  <p className="text-gray-700">
                    Reach out and we’ll do our best to help.
                  </p>
                </div>
                <a
                  href="mailto:contact@ascvdriskcalculator.org?subject=Support%20Request"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Contact Support
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

export default Contact;
