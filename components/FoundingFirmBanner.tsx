"use client";
import Link from "next/link";
import content from "@/content/foundingFirm.json";
import { useState, useEffect } from "react";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function FoundingFirmBanner() {
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    const v = window.localStorage.getItem("ffpBannerDismissed");
    if (v === "1") setHidden(true);
  }, []);

  if (hidden) return null;

  const slotsLeft = Math.max(0, content.maxSlots - content.claimedSlots);

  return (
    <div className="bg-indigo-600 text-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        <p className="text-sm">
          <strong>Founding Firm Program:</strong> Firm features at Practice pricing (12 months). {slotsLeft} slots left.
        </p>
        <div className="flex items-center gap-2">
          <Link 
            href="/founding-firm" 
            className="rounded bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
            onClick={() => window?.gtag?.("event", "cta_click", { location: "founding_firm_banner" })}
          >
            Learn more
          </Link>
          <button
            className="text-white/80 hover:text-white text-xl leading-none"
            aria-label="Dismiss"
            onClick={() => {
              window.localStorage.setItem("ffpBannerDismissed", "1");
              setHidden(true);
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
