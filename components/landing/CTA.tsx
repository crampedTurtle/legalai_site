"use client";
import { track } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";
import { useDemoModal } from "@/hooks/useDemoModal";
import { useResourceModal } from "@/hooks/useResourceModal";

interface CTAProps {
  variant: "mid" | "footer";
  id?: string;
}

export default function CTA({ variant, id }: CTAProps) {
  const params = useSearchParams();
  const alt = params?.get("v") === "alt";

  if (variant === "mid") {
    const headline = alt 
      ? "Ready to eliminate your firm's backlog?"
      : "See how 500 cases can be cleared in your first month—Book a Demo.";
    
    return (
      <section className="bg-slate-800 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Join forward-thinking firms already transforming their practice
          </p>
          <div className="mt-8">
            <button
              onClick={() => {
                track("cta_midpage_book_demo_clicked");
                useDemoModal.getState().open('midpage:book-demo');
              }}
              className="group relative inline-flex rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              aria-label="Book a demo to see how 500 cases can be cleared"
              title="Book a Demo"
            >
              <span className="relative z-10">Book a Demo</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="bg-slate-900 py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
          Ready to eliminate your firm's backlog?
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          Start your transformation today with a private AI platform built for law firms
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              track("cta_footer_book_demo_clicked");
              useDemoModal.getState().open('footer:book-demo');
            }}
            className="group relative inline-flex rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Book a demo to start eliminating your firm's backlog"
            title="Book a Demo"
          >
            <span className="relative z-10">Book a Demo</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => {
              track("cta_download_whitepaper_clicked");
              useResourceModal.getState().open({
                title: "Why Public AI Tools Put Firms At Risk",
                type: "Whitepaper",
                downloadUrl: "/docs/sapphire_why_public_ai_put_firms_at_risk.pdf"
              });
            }}
            className="group inline-flex rounded-xl border-2 border-slate-600 px-8 py-4 text-slate-200 font-semibold hover:border-slate-500 hover:bg-slate-800/50 hover:text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
            aria-label="Download compliance whitepaper"
            title="Download Whitepaper"
          >
            Download Whitepaper
          </button>
        </div>
      </div>
    </section>
  );
}
