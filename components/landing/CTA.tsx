"use client";
import { track } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";

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
            <a
              href="#book-demo"
              onClick={() => track("cta_midpage_book_demo_clicked")}
              className="inline-flex rounded-xl bg-sky-500 px-8 py-4 text-white font-medium shadow hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              aria-label="Book a demo to see how 500 cases can be cleared"
              title="Book a Demo"
            >
              Book a Demo
            </a>
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
          <a
            href="#book-demo"
            onClick={() => track("cta_footer_book_demo_clicked")}
            className="inline-flex rounded-xl bg-sky-500 px-8 py-4 text-white font-medium shadow hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Book a demo to start eliminating your firm's backlog"
            title="Book a Demo"
          >
            Book a Demo
          </a>
          <a
            href="/whitepaper.pdf"
            onClick={() => track("cta_download_whitepaper_clicked")}
            className="inline-flex rounded-xl border border-slate-600 px-8 py-4 text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
            aria-label="Download compliance whitepaper"
            title="Download Whitepaper"
          >
            Download Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}
