"use client";
import { useState } from 'react';

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;

  const data = {
    name: (form.elements.namedItem("name") as HTMLInputElement).value,
    business: (form.elements.namedItem("business") as HTMLInputElement).value,
    contact: (form.elements.namedItem("contact") as HTMLInputElement).value,
    message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
  };

  const res = await fetch("/api/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Consultation request submitted successfully! We'll contact you within 24 hours.");
    form.reset();
  } else {
    alert("Something went wrong. Please try again.");
  }
}

export default function Home() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-50 text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-indigo-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent mb-8 leading-tight">
              Reduce Cost. Reduce Dependency.
              <span className="block text-4xl md:text-5xl font-light text-indigo-100 mt-4">Build Smarter Systems.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-indigo-100 leading-relaxed max-w-2xl mx-auto">
              We help businesses design AI workflows, build custom apps, and create websites that eliminate repetitive work and improve efficiency.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <a
                href="#contact"
                className="group bg-white/90 hover:bg-white text-indigo-900 px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
              >
                Book Paid Consultation
                <span className="ml-2 group-hover:scale-110 transition-transform">→</span>
              </a>
              <a
                href="#services"
                className="border-2 border-white/30 hover:border-white/50 text-white/90 hover:text-white px-8 py-5 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/50 to-transparent" />
      </section>

      {/* Who This Is For */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Who This Is For
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Small & Medium Businesses",
            "Business Owners (Any Industry)",
            "Organizations Without Tech Teams",
          ].map((item, idx) => (
            <div
              key={item}
              className="group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 hover:bg-white hover:border-indigo-100"
            >
              <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">{idx + 1}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="bg-white/80 backdrop-blur-sm py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-purple-500/5" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Problems We Solve
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Manual data entry & repetitive work",
              "High employee dependency",
              "Missed follow-ups & revenue loss",
              "No clear system or process visibility",
              "Need for custom app or website but no technical direction",
              "High operational cost",
            ].map((problem) => (
              <div
                key={problem}
                className="group p-8 rounded-2xl bg-linear-to-br from-white to-gray-50 border border-gray-100 hover:border-indigo-200 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="text-indigo-500 mb-4 text-xl font-semibold">✓</div>
                <p className="text-lg font-medium text-gray-900 leading-relaxed group-hover:text-indigo-900">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "AI Workflow Consultation",
              desc: "Paid diagnostic session to identify cost leaks and automation opportunities.",
              icon: "🧠",
            },
            {
              title: "AI Workflow Design & Automation",
              desc: "Design and implementation of AI-powered workflows tailored to your business.",
              icon: "⚡",
            },
            {
              title: "Custom App Development",
              desc: "We build internal or customer-facing apps based on your business needs.",
              icon: "📱",
            },
            {
              title: "Website Design & Development",
              desc: "Professional websites, dashboards, and portals for businesses.",
              icon: "🌐",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="group bg-linear-to-br from-white via-white/90 to-gray-50 p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 backdrop-blur-xl hover:border-indigo-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-900">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-linear-to-br from-slate-50 to-indigo-50 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial(ellipse_at_center,from-indigo-200/30_via-transparent_to-transparent)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              How Consultation Works
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Understand Business",
              "Map Processes",
              "Identify Cost Leaks",
              "Recommend AI Solutions",
            ].map((step, index) => (
              <div key={step} className="group text-center relative">
                <div className="w-20 h-20 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 font-bold text-xl">
                  {index + 1}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{step}</p>
                <div className="h-1 bg-linear-to-r from-indigo-500/50 to-purple-600/50 w-12 mx-auto rounded-full group-hover:w-24 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Book a Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discuss your business problems, AI automation ideas, or app/website requirements.
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50">
          <form className="space-y-6" onSubmit={async (e) => {
            setSubmitting(true);
            await handleSubmit(e);
            setSubmitting(false);
          }}>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="name"
                required
                disabled={submitting}
                className="w-full border-2 border-gray-200 p-5 rounded-2xl text-lg placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50"
                placeholder="Your Name"
              />
              <input
                name="business"
                required
                disabled={submitting}
                className="w-full border-2 border-gray-200 p-5 rounded-2xl text-lg placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50"
                placeholder="Business / Organization"
              />
            </div>

            <input
              name="contact"
              required
              disabled={submitting}
              className="w-full border-2 border-gray-200 p-5 rounded-2xl text-lg placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50"
              placeholder="Phone / Email"
            />

            <textarea
              name="message"
              required
              disabled={submitting}
              className="w-full border-2 border-gray-200 p-5 rounded-2xl text-lg placeholder-gray-500 resize-vertical focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50"
              placeholder="Briefly describe your requirement"
              rows={5}
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Submitting...
                </>
              ) : (
                'Request Consultation →'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-r from-gray-900 to-slate-900 text-gray-400 py-12 text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg font-medium text-gray-300">
            © {new Date().getFullYear()} • AI Workflow & Technology Consultation
          </p>
          <p className="text-sm mt-2 opacity-75">Building smarter systems for forward-thinking businesses.</p>
        </div>
      </footer>
    </main>
  );
}
