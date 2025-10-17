export const track = (event: string, props?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  
  // Google Analytics 4
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...props });
  
  // Mautic tracking
  if ((window as any).mt) {
    (window as any).mt('send', 'event', event, props);
  }
  
  // Plausible Analytics (if available)
  if ((window as any).plausible) {
    (window as any).plausible(event, { props });
  }
};
