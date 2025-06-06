"use client";

import React, { useEffect } from 'react';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    const GTM_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (GTM_ID) {
      // Load the Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // @ts-ignore
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag() {
        (window as any).dataLayer.push(arguments);
      }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', GTM_ID, {
        page_path: window.location.pathname,
      });
    }

    // Cleanup function to remove the script when the component unmounts (optional, as it's typically persistent)
    return () => {
      // document.head.removeChild(script); // Keeping the script on the page
    };
  }, []);

  return null; // This component does not render anything
};

export default GoogleAnalytics; 