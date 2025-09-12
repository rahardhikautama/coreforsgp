// useAnalytics.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Let TypeScript know gtag exists on window (injected by GA script in index.html)
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useAnalytics(measurementId: string) {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId, {
        anonymize_ip: true,
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location, measurementId]);
}
