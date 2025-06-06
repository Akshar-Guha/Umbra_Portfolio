"use client";

import React, { useEffect } from 'react';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // Load the Google Analytics script
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-R6Y1679L0G";
    script.async = true;
    document.head.appendChild(script);

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', 'G-R6Y1679L0G');

    const GTM_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (GTM_ID) {
      // ... existing code ...
    }

    // Cleanup function to remove the script when the component unmounts (optional, as it's typically persistent)
    return () => {
      // document.head.removeChild(script); // Keeping the script on the page
    };
  }, []);

  return null; // This component does not render anything
};

export default GoogleAnalytics; 