import React, { useEffect } from "react";
// import ContactUs from "../components/ContactUs";
// import Business from "../components/common/AiDriven";
import CardDeal from "../components/CardDeal";
// import Workflow from "../components/Workflow";
import a from "/bg1.jpg";
import codeImg from "/hero-image-providers.webp";
import GradientLinkButton from "@/components/common/GradientLinkButtonProps";
import { Activity, Bug, CheckCircle, CircleDollarSign, Files, MonitorCog, Network, ReceiptText, ShieldCheck, User, Workflow } from "lucide-react";

const PlatformOverview: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ClouSec - Platform Overview";
  }, []);

  return (
    <>
     


<div
  className="DevOpsMainHeader pt-[60px]    flex items-center justify-center text-white px-8 "
  style={{
    backgroundImage: `url(${a})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
  role="banner"
  aria-label="Platform Overview Banner"
>
  <div className="flex w-full max-w-7xl p-[3rem] items-center justify-between gap-10 flex-wrap lg:flex-nowrap">
    {/* Left: Title and Description */}
    <div className="flex  flex-col max-w-xl p-[1rem]">
      <h1 className=" font-semibold leading-[3rem]  tracking-wide drop-shadow-lg text-white/90 mb-8 font-Grotesk text-[55px]">
      Where Cloud Security Meets Intelligence
      </h1>
      <p className="text-lg text-white/80">
      Cloud security is complex. Budgets are stretched. Threats are evolving. ClouSec simplifies the challenges of securing your cloud environment. We offer an AI- powered platform that provides complete visibility, intelligent automation, enforce best practices and continuous compliance, allowing you to focus on innovation, not just security.
      </p>
      <GradientLinkButton className="mt-[1.5rem] w-[9rem]" path="/book-demo">
        Get a Demo
      </GradientLinkButton>
    </div>

    {/* Right: ReactPlayer YouTube Video */}
    <div className="w-full max-w-md aspect-video">
    <iframe width="510" height="320" src="https://www.youtube.com/embed/-vLYTijz370" title="ClouSec(AWS - CSPM tool) misconfigurations, vulnerabilities, threats, cloud asset mgt, AWS health." frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
  </div>
</div>

      {/*Security and complaince  */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
    
    {/* Left Content */}
    <div className="flex-1">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        <span className="font-Grotesk text-[55px] text-black_ bg-clip-text bg-gradient-to-r from-primary to-purple-600">
          Security & Compliance
        </span>
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
      Our platform delivers end-to-end visibility across your entire infrastructure—helping you detect risks, uncover vulnerabilities, monitor threats in real time, and ensure continuous compliance with frameworks like CIS, SOC 2, MAS-TRM, PCI-DSS, RBI, ISO 27001:2013, HIPAA etc
. Whether you're managing cloud, container, or on-prem environments, we provide the insights and controls you need to stay secure and audit-ready from the start.
      </p>
    </div>

    {/* Right Features List */}
    <div className="flex-1 w-full">
      <div className="grid sm:grid-cols-1 gap-6 px-8">
        {[
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Security Findings",
    desc: "Detect regulatory-based misconfigurations in your infrastructure."
  },
  {
    icon: <Bug className="w-6 h-6 text-primary" />,
    title: "Vulnerability Detection",
    desc: "Spot OS, container, and app vulnerabilities using NVD data."
  },
  {
    icon: <Activity className="w-6 h-6 text-primary" />,
    title: "Threat Monitoring",
    desc: "Track malicious IPs and abnormal traffic patterns in real time."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    title: "Day 1 Compliance",
    desc: "Achieve CIS, SOC 2, and MAS compliance from the start."
  }
].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="shrink-0 p-2 bg-primary/10 rounded-full">
              {item.icon}
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
{/* Workflow Automation */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
    
    {/* Left Content */}
   
   
<div className="flex-1">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        <span className="font-Grotesk text-[55px] text-black_ bg-clip-text bg-gradient-to-r from-primary to-purple-600">
           Workflow Automation 
        </span>
      </h2>
       <img src={codeImg} alt="Coding" />
    </div>
    {/* Right Features List */}
      <div className="flex-1 w-full">
      <div className="grid sm:grid-cols-1 gap-6 px-8">
        {[
  {
    icon: <MonitorCog className="w-6 h-6 text-primary" />,
    title: "Intelligent Ticketing System",
    desc: "Streamline incident resolution with auto-escalation workflows."
  },
  {
    icon: <User className="w-6 h-6 text-primary" />,
    title: "User Access Matrix",
    desc: "Periodically review access privileges and take necessary actions."
  },
  {
    icon: <CircleDollarSign className="w-6 h-6 text-primary" />,
    title: "Cost Management",
    desc: "Optimize cloud spend with rightsizing recommendations and automated resource cleanup."
  },
  {
    icon: <Network className="w-6 h-6 text-primary" />,
    title: "Eagle Tree View",
    desc: "Gain a comprehensive view of root and associated accounts, including health status, cost insights, and misconfiguration details."
  }
].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="shrink-0 p-2 bg-primary/10 rounded-full">
              {item.icon}
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    

  </div>
</section>


      <CardDeal />

{/* AI DRIVEN  */}

<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
    
    {/* Left Content */}
   
   
<div className="flex-1">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        <span className="font-Grotesk text-[55px] text-black_ bg-clip-text bg-gradient-to-r from-primary to-purple-600">
           AI-Driven Automation in ClouSec
        </span>
      </h2>
   

          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                At the heart of ClouSec lies AI‑driven automation—redefining how you secure, comply and optimize costs in the cloud. By harnessing advanced machine learning, ClouSec removes manual intervention, increased response times with enhanced decision-making, accelerating threat response,  delivering actionable insights, so you can sustain a strong security posture without the typical operational burden.

      </p>
    </div>
    {/* Right Features List */}
      <div className="flex-1 w-full">
      <div className="grid sm:grid-cols-1 gap-6 px-8">
        {[
  {
    icon: <Workflow className="w-6 h-6 text-primary" />,
    title: "Automated Remediation",
    desc: "AI-driven fixes for security findings."
  },
  {
    icon: <ReceiptText className="w-6 h-6 text-primary" />,
    title: "Smart Assignments",
    desc: "Automatically assign security findings to users/groups eliminating cross team dependency."
  },
  {
    icon: <Files className="w-6 h-6 text-primary" />,
    title: "Incident Reporting",
    desc: "Leverage Generative AI for automated incident documentation."
  },
 
].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="shrink-0 p-2 bg-primary/10 rounded-full">
              {item.icon}
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    

  </div>
</section>

      {/* <Business /> */}
   
      <div className="font-sans text-gray-800 leading-relaxed">
 
 {/* <section className="relative bg-red-50  text-black_ py-20 px-6 overflow-hidden">
 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
   
   <div className="space-y-6">
     <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
       Cloud Complexity: The Silent Risk
     </h2>
     <p className="text-lg md:text-xl ">
       Behind the flexibility of multi-cloud lies a web of misconfigurations, over-permissioned access, and invisible threats.
     </p>
   </div>

   <div className="bg-white text-red-900 rounded-3xl shadow-2xl p-8 md:p-10">
     <h3 className="text-2xl font-bold mb-6 text-center">
       🚨 Consequences of Mismanagement
     </h3>
     <ul className="space-y-4">
       {consequences.map((item, idx) => (
         <li key={idx} className="flex items-start space-x-3">
           <span className="mt-1 text-red-600">⚠️</span>
           <span className="text-base md:text-lg">{item}</span>
         </li>
       ))}
     </ul>
   </div>
 </div>

 <div className="absolute top-0 left-0 w-40 h-40 bg-red-600 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2"></div>
</section> */}



 <section className="bg-gradient-to-br from-white to-blue-50 px-4 pb-10">
 {/* <section className=" py-14 px-4 text-center ">
   <div className="max-w-3xl mx-auto">
     <h3 className="text-xl font-semibold text-gray-600 mb-2">Industry Insight</h3>
     <p className="text-xl italic text-gray-800">
       “Gartner predicts the vast majority of cloud security failures will stem from preventable user errors.”
     </p>
     <p className="text-base mt-4 text-gray-600">
       Most issues arise from misconfigurations, weak credentials, and a lack of clarity on the shared responsibility model.
     </p>
   </div>
 </section> */}
   <div className="max-w-6xl mx-auto">
     <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
       Why Teams Choose ClouSec
     </h2>
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {features.map((feature, idx) => (
         <div
           key={idx}
           className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100"
         >
           <h3 className="text-lg font-semibold mb-2 text-primary2">
             {feature.title}
           </h3>
           <p className="text-gray-700 text-sm">{feature.description}</p>
         </div>
       ))}
     </div>
   </div>
 </section>
</div>

      {/* <ContactUs /> */}
      {/* <Footer /> */}
    </>
  );
};

export default PlatformOverview;




const features = [
  {
    title: "SaaS-Based CSPM Limitations",
    description:
      "ClouSec offers a PaaS/Agentless architecture, keeping your data within your environment.",
  },
  {
    title: "Inefficient Cost Management",
    description:
      "Intelligent cost optimization and resource rightsizing recommendations.",
  },
  {
    title: "Lack of AI-Powered Remediation",
    description:
      "AI-driven fixes for security findings, accelerating remediation.",
  },
  {
    title: "Manual Cloud Operations",
    description:
      "ClouSec automates key security tasks, freeing up your team for strategic initiatives.",
  },
  {
    title: "User Access Governance Gaps",
    description:
      "Comprehensive user access management and privileged access control.",
  },
  {
    title: "Lack of Day-1 CIS Readiness",
    description:
      "Out-of-the-box CIS benchmark compliance from Day 1.",
  },
  {
    title: "Cross-Team Collaboration Challenges",
    description:
      "Integrated workflows and communication tools for seamless collaboration.",
  },
  {
    title: "Limited Proactive Threat Detection",
    description:
      "Advanced threat intelligence and proactive threat hunting capabilities.",
  },
  {
    title: "Alert Fatigue",
    description:
      "ClouSec intelligently prioritizes alerts, reducing noise and focusing attention on critical issues.",
  },
  {
    title: "Delayed Incident Response",
    description:
      "Automated incident response workflows enable faster and more effective remediation.",
  },
];