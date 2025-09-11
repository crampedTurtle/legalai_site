import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founding Firm Program – Sapphire Legal AI",
  description: "Join up to 25 firms for Firm features at Practice pricing for 12 months, then a preferred Founder discount forever.",
  keywords: [
    "founding firm program",
    "legal AI early access",
    "law firm technology",
    "private AI platform",
    "legal software discount",
    "founding member program"
  ],
  openGraph: {
    title: "Founding Firm Program – Sapphire Legal AI",
    description: "Firm features at Practice pricing for 12 months. Limited to 25 firms.",
    url: "https://www.sapphirelegal.ai/founding-firm",
    type: "website",
    images: [
      {
        url: "/images/social_1200x630.png",
        width: 1200,
        height: 630,
        alt: "Founding Firm Program - Sapphire Legal AI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Founding Firm Program – Sapphire Legal AI",
    description: "Firm features at Practice pricing for 12 months. Limited to 25 firms.",
    images: ["/images/social_1200x630.png"]
  },
  alternates: {
    canonical: "/founding-firm"
  }
};

export default function FoundingFirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
