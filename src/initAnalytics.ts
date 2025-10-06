export const initAnalytics = () => {
  if (import.meta.env.MODE === 'production') {
    // Load the GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-G7DSW8Y406'; 
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configure GA
    gtag('js', new Date());
    gtag('config', 'G-G7DSW8Y406', {
      page_path: window.location.pathname,
    });
  }
};
