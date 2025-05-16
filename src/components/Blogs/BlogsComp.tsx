import React from "react";
import problemImg from "../../assets/probBg.png";
import { LuCheckCircle2 } from "react-icons/lu";

interface ChecklistItem {
  title: string;
}

const checklistItems: ChecklistItem[] = [
  { title: "Scattered Security Insights Across Multiple AWS Services" },
  { title: "Lack of Customizable Compliance Management Across Multiple Frameworks" },
  { title: "Manual Remediation for Cloud Configuration Issues" },
  { title: "Limited User Access Governance Across Multi-Account AWS Environments" },
  { title: "Inefficient Cost Management and Idle Resource Monitoring" },
  { title: "Lack of Proactive Well-Architected Reviews and Service Monitoring" },
  { title: "Disjointed Security Insights for Leadership Teams" },
  { title: "Complex Ticketing Workflows for Security Exceptions" },
];

const BlogsComp: React.FC = () => {
  return (
    <section className="relative py-20 px-6 bg-gray-100" id="problem">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Problem Statement
        </h1>
        <p className="text-lg text-black_ max-w-3xl mx-auto">
          Many existing CSPM tools are SaaS-based, which means they access customer data, whereas ClouSec is a PaaS-based model that keeps customer data safe within their vault. Other challenges include...
        </p>
      </div>

      <div className="flex flex-wrap items-center">
        <div className="w-full lg:w-1/2 p-6 flex justify-center">
          <img 
            src={problemImg} 
            alt="Problem Statement" 
            className="transition-transform transform hover:scale-105" 
            width={600}
            height={400}
          />
        </div>

        <div className="w-full lg:w-1/2 p-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 py-3 transition-all duration-300 hover:scale-105">
                <LuCheckCircle2 className="text-indigo-600 dark:text-purple-500 text-3xl" />
                <h5 className="text-lg font-medium text-gray-800 dark:text-gray-100">{item.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsComp;

/* 
// Commented out code from original component
// Slider implementation
// var settings = {
//   dots: true,
//   arrows: false,
//   infinite: true,
//   speed: 600,
//   slidesToShow: 3,
//   // slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   cssEase: "linear",
//   pauseOnHover: true,
//   pauseOnFocus: true,
//   responsive: [
//     {
//       breakpoint: 10000,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         infinite: true,
//       },
//     },
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 640,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// Blog data
// const BlogsData = [
//   {
//     id: 1,
//     image: Img1,
//     title: "CLOUD CONFIGURATION ISSUES DURING MIGRATION",
//     description:
//       "A company is migrating its application data from a source instances to target instance. During the migration, permission issues arise due to misconfigured IAM roles and policies. In this the OPS team is dependent on the cloud team.",
//     author: "Someone",
//     date: "April 22, 2022",
//   },
//   ...
// ];
*/
