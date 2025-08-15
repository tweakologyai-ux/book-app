// src/hooks/useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}
