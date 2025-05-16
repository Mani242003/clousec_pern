import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./components/Documents/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from "./utils/webVitals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// Report web vitals
reportWebVitals(({ name, delta, id, value }) => {
  // Send to your analytics service
  console.log({ name, delta, id, value });


  // interface Window {
  //   gtag?: (...args: any[]) => void;
  // }
  
  // Example: Send to Google Analytics
  // if (window.gtag) {
  //   window.gtag('event', name, {
  //     event_category: 'Web Vitals',
  //     event_label: id,
  //     value: Math.round(name === 'CLS' ? delta * 1000 : delta),
  //     non_interaction: true,
  //   });
  // }
});
