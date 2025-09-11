"use client";
import Image from "next/image";
import Link from "next/link";
import content from "@/content/foundingFirm.json";

function money(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function FoundingFirmPage() {
  const slotsLeft = Math.max(0, content.maxSlots - content.claimedSlots);
  const ctaHref = content.ctaHref || "https://cal.com/stylere/30min";
  const yearOne = {
    label: "Year 1 (Founder Promo)",
    practicePrice: content.pricing.practiceMonthly,
    firmPrice: content.pricing.firmMonthly
  };
  const postYear = {
    label: "After Year 1",
    discount: content.pricing.founderDiscountPctAfterYear
  };

  const hasAutoScroll = content.logos.length >= 3;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            "name": "Founding Firm Program",
            "description": content.hero.subhead,
            "price": content.pricing.practiceMonthly,
            "priceCurrency": "USD",
            "availability": "https://schema.org/LimitedAvailability",
            "validFrom": new Date().toISOString(),
            "validThrough": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            "offeredBy": {
              "@type": "Organization",
              "name": "Sapphire Legal AI",
              "url": "https://sapphirelegal.ai"
            },
            "category": "Software",
            "itemCondition": "https://schema.org/NewCondition",
            "availabilityStarts": new Date().toISOString(),
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            "seller": {
              "@type": "Organization",
              "name": "Sapphire Legal AI"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Max Slots",
                "value": content.maxSlots
              },
              {
                "@type": "PropertyValue", 
                "name": "Claimed Slots",
                "value": content.claimedSlots
              },
              {
                "@type": "PropertyValue",
                "name": "Founder Discount After Year 1",
                "value": `${content.pricing.founderDiscountPctAfterYear}%`
              }
            ]
          })
        }}
      />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <section className="text-center space-y-4">
          <p className="text-sm font-semibold tracking-wide text-indigo-600">{content.hero.eyebrow}</p>
          <h1 className="text-3xl sm:text-5xl font-bold">{content.hero.headline}</h1>
          <p className="text-lg text-gray-600">{content.hero.subhead}</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left mx-auto max-w-4xl">
            {content.hero.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 inline-flex items-center gap-3">
            <Link
              href={ctaHref}
              className="rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700"
              onClick={() => window?.gtag?.("event", "cta_click", { location: "founding_firm_hero" })}
            >
              Book a Demo
            </Link>
            <div
              className="text-sm text-gray-600"
              aria-live="polite"
            >
              <strong>{content.claimedSlots}</strong> of {content.maxSlots} slots claimed • <strong>{slotsLeft}</strong> left
            </div>
          </div>
        </section>

        {/* Adaptive Logo Strip */}
        <section className="mt-16">
          <p className="text-center text-sm uppercase tracking-wide text-gray-500">Trusted by early adopters</p>
          <div
            className={[
              "mt-4 overflow-hidden",
              hasAutoScroll ? "relative" : ""
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center gap-10",
                hasAutoScroll ? "animate-[scroll_30s_linear_infinite]" : "justify-center flex-wrap"
              ].join(" ")}
              style={{ willChange: hasAutoScroll ? "transform" : "auto" }}
            >
              {content.logos.length === 1 && (
                <>
                  <LogoItem {...content.logos[0]} />
                  <PlaceholderLogo label="Your firm here" />
                </>
              )}
              {content.logos.length === 2 && (
                <>
                  <LogoItem {...content.logos[0]} />
                  <LogoItem {...content.logos[1]} />
                  <PlaceholderLogo label="New firm joining soon" />
                </>
              )}
              {content.logos.length >= 3 && (
                <>
                  {content.logos.concat(content.logos).map((l, i) => (
                    <LogoItem key={i} {...l} />
                  ))}
                </>
              )}
            </div>
          </div>
          <style jsx global>{`
            @media (prefers-reduced-motion: reduce) {
              .animate-[scroll_30s_linear_infinite] { animation: none !important; }
            }
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* Pricing Comparison */}
        <section className="mt-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{yearOne.label}</h3>
              <p className="mt-2 text-gray-600">
                Get <strong>Firm-tier features</strong> at the <strong>Practice</strong> price for 12 months.
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Public Firm price</p>
                <p className="text-2xl font-bold line-through">{money(yearOne.firmPrice)}/mo</p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Your Founder price (Year 1)</p>
                <p className="text-3xl font-bold text-emerald-600">{money(yearOne.practicePrice)}/mo</p>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{postYear.label}</h3>
              <p className="mt-2 text-gray-600">
                Keep a <strong>{postYear.discount}% Founder discount forever</strong> off public pricing.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Discount applies to then-current public rates at renewal.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href={ctaHref}
              className="inline-flex rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700"
              onClick={() => window?.gtag?.("event", "cta_click", { location: "founding_firm_pricing" })}
            >
              Claim a Founder Slot
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <dl className="mt-6 space-y-4">
            {content.faq.map((f, i) => (
              <div key={i} className="rounded-lg border p-4">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="text-gray-600 mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}

function LogoItem({ name, src, href, alt }: { name: string; src: string; href?: string; alt?: string }) {
  const img = (
    <Image src={src} alt={alt || name} width={140} height={48} className="opacity-80 hover:opacity-100 transition" />
  );
  return href ? <Link href={href} aria-label={name}>{img}</Link> : img;
}

function PlaceholderLogo({ label }: { label: string }) {
  return (
    <div className="h-12 w-40 rounded border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
      {label}
    </div>
  );
}
