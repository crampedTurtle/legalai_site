"use client";
import { track } from "@/lib/analytics";

type T = {
  quote: string;
  name: string;
  title: string;
  firm: string;
  tag: string;
};

const ITEMS: T[] = [
  {
    quote: "We cleared a backlog of over 500 cases in the first month—without hiring.",
    name: "Jordan Patel",
    title: "Managing Partner",
    firm: "Westlake Injury Group",
    tag: "Personal Injury",
  },
  {
    quote: "Discovery time dropped by 30%. Our attorneys finally focus on strategy.",
    name: "Alicia Romero",
    title: "Litigation Chair",
    firm: "Romero, Klein & Danz",
    tag: "Litigation",
  },
  {
    quote: "Contract review is faster and safer—AI with proper controls changed the game.",
    name: "David Chen",
    title: "General Counsel",
    firm: "HarborPoint Capital",
    tag: "Corporate",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-slate-900 border-t border-slate-800"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-semibold text-white">
          What Firms Like Yours Are Saying
        </h2>
        <p className="mt-3 text-slate-300">
          Real outcomes from teams replacing fragmented tools with one private AI-powered legal OS.
        </p>

        {/* Scroll-snap row on mobile, grid on md+ */}
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
          {ITEMS.map((t, i) => (
            <article
              key={i}
              className="snap-start shrink-0 md:shrink bg-slate-800/60 rounded-2xl p-6 ring-1 ring-slate-700"
              aria-label={`Testimonial from ${t.name}, ${t.title} at ${t.firm}`}
            >
              <p className="text-slate-200">"{t.quote}"</p>
              <div className="mt-5 text-sm text-slate-300">
                <div className="font-medium text-white">{t.name}</div>
                <div>{t.title}</div>
                <div className="text-slate-400">{t.firm}</div>
              </div>
              <span className="mt-4 inline-block text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-200">
                {t.tag}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="/case-studies"
            onClick={() => track("cta_read_more_client_stories_clicked")}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-4"
          >
            Read more client stories
          </a>
        </div>
      </div>
    </section>
  );
}
