import * as React from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function Tooltip({ children, content, className = "" }: TooltipProps) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span className="peer cursor-help">{children}</span>
      <span className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-md bg-black/90 px-3 py-2 text-xs text-white opacity-0 transition-all duration-200 peer-hover:opacity-100 peer-focus:opacity-100 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sapphire-400">
        {content}
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
      </span>
    </span>
  );
}
