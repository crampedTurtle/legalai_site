"use client";
import { track } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";
import { useDemoModal } from "@/hooks/useDemoModal";

export default function Hero() {
  const params = useSearchParams();
  const alt = params?.get("v") === "alt";

  const h1 = alt
    ? "Eliminate case backlogs. One platform. Private AI."
    : "Stop losing billable hours. Protect client trust. End the admin drag.";
  const sub = alt
    ? "Unite intake, documents, discovery, billing, and compliance—with AI that's built in, not bolted on."
    : "The private AI-powered legal operating system that eliminates backlogs, unifies your tools, and helps your firm practice more profitably.";

  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">{h1}</h1>
        <p className="mt-5 max-w-2xl text-slate-300">{sub}</p>
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => {
              track("cta_book_demo_clicked");
              useDemoModal.getState().open('hero:book-demo');
            }}
            className="rounded-xl bg-sky-500 px-5 py-3 text-white font-medium shadow hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Book a demo of Sapphire Legal AI"
            title="Book a Demo"
          >
            Book a Demo
          </button>
          <a
            href="/whitepaper.pdf"
            onClick={() => track("cta_download_whitepaper_clicked")}
            className="rounded-xl border border-slate-600 px-5 py-3 text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
            aria-label="Download compliance whitepaper"
            title="Download Whitepaper"
          >
            Download Whitepaper
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
          <li className="rounded-full bg-slate-800 px-3 py-1">Cut backlog by up to 50%</li>
          <li className="rounded-full bg-slate-800 px-3 py-1">Automate EMR & discovery tasks</li>
          <li className="rounded-full bg-slate-800 px-3 py-1">One platform, 12 practice packs</li>
        </ul>
      </div>
    </section>
  );
}
