"use client";
import { track } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";
import { useDemoModal } from "@/hooks/useDemoModal";
import { useResourceModal } from "@/hooks/useResourceModal";

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
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]"></div>
      
      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">{h1}</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">{sub}</p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => {
              track("cta_book_demo_clicked");
              useDemoModal.getState().open('hero:book-demo');
            }}
            className="group relative rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Book a demo of Sapphire Legal AI"
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
            className="group rounded-xl border-2 border-slate-600 px-8 py-4 text-slate-200 font-semibold hover:border-slate-500 hover:bg-slate-800/50 hover:text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
            aria-label="Download compliance whitepaper"
            title="Download Whitepaper"
          >
            Download Whitepaper
          </button>
        </div>
        
        {/* Enhanced feature pills with icons */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-4 hover:bg-slate-800/80 transition-colors duration-300">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Cut backlog by up to 50%</div>
              <div className="text-xs text-slate-400">Faster case resolution</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-4 hover:bg-slate-800/80 transition-colors duration-300">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Automate EMR & discovery tasks</div>
              <div className="text-xs text-slate-400">AI-powered workflows</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-4 hover:bg-slate-800/80 transition-colors duration-300">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">One platform, 12 practice packs</div>
              <div className="text-xs text-slate-400">Tailored for your practice</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
