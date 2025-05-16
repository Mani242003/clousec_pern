// import React, { useEffect, useState, lazy, Suspense } from "react";

// const Popup = lazy(() => import("../components/Popup/Popup"));
// const BookDemo = lazy(() => import("./BookDemo"));
// const ClouSecPlatform = lazy(() => import("../components/ClouSecPlatform"));
// const PricingSection = lazy(() => import("../components/PriceSection"));
// const ClouSecOverview = lazy(() => import("../components/common/ClouSecOverview"));
// const Services = lazy(() => import("../components/common/KeyBenifits"));
// const Hero = lazy(() => import("../components/common/Hero"));





// const Home: React.FC = () => {
//   const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  
//   useEffect(() => {
//     const hasSeenPopup = localStorage.getItem("hasSeenPopup");

//     if (!hasSeenPopup) {
//       const timer = setTimeout(() => {
//         setPopupVisible(true);
//         localStorage.setItem("hasSeenPopup", "true"); // Mark as seen
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const closePopup = (): void => {
//     setPopupVisible(false);
//   };


//   return (
//     <>
//       {/* Lazy load popup component */}
//        {isPopupVisible && (
//         <Suspense fallback={null}>
//           <Popup show={isPopupVisible} onClose={closePopup} />
//         </Suspense>
//       )}
      
   
//         <Hero />
      
//       {/* Main content sections */}
//       <Services />
//       {/* <Solutions /> */}
//       <ClouSecOverview />
//       {/* <C_S_Component /> */}
      
//       {/* Pricing section */}
//       <PricingSection  />
//       <ClouSecPlatform />
//       <BookDemo />
      
//       {/* Contact section */}
//      {/* <ContactUs /> */}
      
     
//     </>
//   );
// };

// export default Home;
