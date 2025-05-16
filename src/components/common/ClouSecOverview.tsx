import React, { useState, useRef } from "react";
import OptimizedImage from "../OptimizedImage";
import AspectRatioBox from "../AspectRatioBox";

interface TabListItem {
  title: string;
  content: string;
}

interface TabContent {
  title: string;
  content: string;
  img: string;
  list: TabListItem[];
}

interface Section {
  title: string;
  tabs: TabContent[];
}

const sections: Section[] = [
  {
    title: "Comprehensive Security & Compliance",
    tabs: [
      {
        title: "Scattered Security Insights",
        content:
          "Traditional solutions pull security data from various AWS services without true consolidation, making it difficult to analyze and remediate threats effectively.",
        img: "/sam-sol-1.webp",
        list: [
          {
            title: "Unified Security Dashboard",
            content:
              "Gain a complete view of vulnerabilities and misconfigurations with automatically centralized and correlated security findings.",
          },
          {
            title: "Actionable Insights",
            content:
              "Act quickly on meaningful findings with data that's not just collected, but analyzed for patterns and combined with threat intelligence.",
          },
        ],
      },
      {
        title: "Alert Fatigue & Overwhelming Security Findings",
        content:
          "Security teams face an onslaught of unprioritized alerts, leading to high volumes of noise and significant alert fatigue.",
        img: "/sam-sol-2.webp",
        list: [
          {
            title: "Intelligent Prioritization",
            content:
              "Slash time spent on low-impact alerts with ClouSec's recommendations that reduce duplication and focus on the issues that matter most.",
          },
          {
            title: "Automated Workflows",
            content:
              "Ensure nothing slips through the cracks with immediate triaging that routes critical vulnerabilities to the right teams.",
          },
        ],
      },
      {
        title: "Lack of Day-One Compliance",
        content:
          "Meeting compliance standards across multiple frameworks is challenging.",
        img: "/sam-sol-2.webp",
        list: [
          {
            title: "Built-In Compliance Rules",
            content:
              "Scan your infrastructure against CIS, SOC, and MAS benchmarks from day one, highlighting compliant and non-compliant resources.",
          },
          {
            title: "Continuous Compliance Monitoring",
            content:
              "Ensure nothing slips through the cracks with immediate triaging that routes critical vulnerabilities to the right teams.",
          },
        ],
      },
    ],
  },
  {
    title: "AI-Powered Automation & Remediation",
    tabs: [
      {
        title: "Manual, Time-Consuming Remediation",
        content:
          "Current CSPM tools often overwhelm teams with findings but lack intelligent remediation, leading to manual task assignment and increased vulnerability.",
        img: "/ai-auto-1.webp",
        list: [
          {
            title: "AI-Powered Automated Remediation",
            content:
              "Address security gaps automatically with AI-suggested best-practice fixes, executed within minutes.",
          },
          {
            title: "Faster Response Time",
            content:
              "Eliminate bottlenecks by reducing manual effort, minimizing errors, and accelerating threat resolution.",
          },
        ],
      },
      {
        title: "Cross-Team Collaboration Challenges",
        content:
          "Security incidents often require input from multiple teams, causing delays, inefficient workflows, and communication breakdowns.",
        img: "/ai-auto-2.webp",
        list: [
          {
            title: "Automated Security Workflows",
            content:
              "Auto-assign findings to the appropriate stakeholders with clear escalation paths and accountability.",
          },
          {
            title: "Streamlined Collaboration",
            content:
              "Enhance coordination with centralized ticketing and smart notifications, reducing SOC burden and response time.",
          },
        ],
      },
    ],
  },
  {
    title: "Governance, Cost Optimization & Security",
    tabs: [
      {
        title: "User Access Governance Gaps",
        content:
          "Limited cross-account visibility in traditional CSPM tools leads to blind spots in access control and compliance.",
        img: "/governance-1.webp",
        list: [
          {
            title: "Granular Governance",
            content:
              "Define and enforce access rules across environments with periodic audits and comprehensive audit logs.",
          },
          {
            title: "Enhanced Security Posture",
            content:
              "Mitigate unauthorized access risks and bolster compliance with precise user role management.",
          },
        ],
      },
      {
        title: "Inefficient Cost Management & Idle Resources",
        content:
          "Organizations often leave unused resources running, causing overspending across cloud environments.",
        img: "/governance-2.webp",
        list: [
          {
            title: "AI-Driven Rightsizing Recommendations",
            content:
              "Get smart insights to optimize cloud resource usage and reduce unnecessary expenses.",
          },
          {
            title: "Automatic Shutdown of Unused Resources",
            content:
              "Detect and deactivate idle assets proactively to avoid wasteful spending.",
          },
          {
            title: "Multi-Cloud Support",
            content:
              "Maintain cost efficiency across AWS, Azure, GCP, and hybrid environments.",
          },
        ],
      },
      {
        title: "API Security",
        content:
          "APIs are common targets but often lack real-time visibility in traditional tools.",
        img: "/governance-3.webp",
        list: [
          {
            title: "Holistic API Monitoring",
            content:
              "Track API activity, detect irregular patterns, and ensure real-time response to threats.",
          },
          {
            title: "Proactive Threat Detection",
            content:
              "Use intelligent analytics to identify and contain suspicious behavior before it escalates.",
          },
        ],
      },
    ],
  },
  {
    title: "Insights & Flexibility",
    tabs: [
      {
        title: "Lack of Executive-Level Visibility",
        content:
          "Fragmented data across platforms makes it difficult for executives to understand cloud security and compliance posture.",
        img: "/insight-flex-1.webp",
        list: [
          {
            title: "Comprehensive Dashboards",
            content:
              "Offer leadership a real-time snapshot of cloud health, risks, and spend in one unified view.",
          },
          {
            title: "Data-Driven Decision-Making",
            content:
              "Empower better decisions with clear, actionable reports and ROI tracking for security investments.",
          },
        ],
      },
      {
        title: "Deployment & Pricing Hurdles",
        content:
          "Agent-heavy, SaaS-based models complicate deployment and scale poorly with growing cloud footprints.",
        img: "/insight-flex-2.webp",
        list: [
          {
            title: "Flexible Deployment Options",
            content:
              "Simplify adoption with an agentless, PaaS-based model that reduces overhead.",
          },
          {
            title: "Cost-Effective Scalability",
            content:
              "Grow your cloud infrastructure without skyrocketing costs or complex licensing.",
          },
        ],
      },
      {
        title: "Streamlined Ticketing & Incident Resolution",
        content:
          "Disparate teams managing incidents can result in confusion, slow response, and unresolved issues.",
        img: "/insight-flex-3.webp",
        list: [
          {
            title: "Customized Ticketing Workflow",
            content:
              "Auto-create and assign tickets by incident type and priority for seamless task management.",
          },
          {
            title: "Cross-Team Visibility",
            content:
              "Keep all stakeholders aligned with transparent tracking and clear task ownership.",
          },
        ],
      },
    ],
  }
  
  
  
//   {
//     title: "AI-Powered Automation & Remediation",
//     tabs: [
//       {
//         title: "Manual, Time-Consuming Remediation",
//         content:
//           "Current CSPM tools can flood you with findings, yet lack AI-driven remediation, leading to delays and increased vulnerabilities.",
//         img: "/sam-sol-4.webp",
//         list: [
//           {
//             title: "AI-Powered Automated Remediation",
//             content:
//               "ClouSec's system addresses security gaps automatically, applying best-practice fixes within minutes.",
//           },
//           {
//             title: "Faster Response Time",
//             content:
//               "By reducing manual processing, organizations see fewer errors, quicker threat resolution, and stronger overall security posture.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "AI-Powered Automation & Remediation",
//     tabs: [
//       {
//         title: "Manual, Time-Consuming Remediation",
//         content:
//           "Current CSPM tools can flood you with findings, yet lack AI-driven remediation, leading to delays and increased vulnerabilities.",
//         img: "/sam-sol-4.webp",
//         list: [
//           {
//             title: "AI-Powered Automated Remediation",
//             content:
//               "ClouSec's system addresses security gaps automatically, applying best-practice fixes within minutes.",
//           },
//           {
//             title: "Faster Response Time",
//             content:
//               "By reducing manual processing, organizations see fewer errors, quicker threat resolution, and stronger overall security posture.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Comprehensive Security & Compliance",
//     tabs: [
//       {
//         title: "Scattered Security Insights",
//         content:
//           "Traditional solutions pull security data from various AWS services without true consolidation, making it difficult to analyze and remediate threats effectively.",
//         img: "/sam-sol-1.webp",
//         list: [
//           {
//             title: "Unified Security Dashboard",
//             content:
//               "Gain a complete view of vulnerabilities and misconfigurations with automatically centralized and correlated security findings.",
//           },
//           {
//             title: "Actionable Insights",
//             content:
//               "Act quickly on meaningful findings with data that's not just collected, but analyzed for patterns and combined with threat intelligence.",
//           },
//         ],
//       },
//       {
//         title: "Day-One Readiness for CIS, SOC, and MAS Regulations",
//         content:
//           "Meeting compliance standards is daunting, especially with multiple frameworks like CIS, SOC, or MAS.",
//         img: "/sam-sol-2.webp",
//         list: [
//           {
//             title: "Built-In Compliance Rules",
//             content:
//               "ClouSec scans infrastructure against CIS, SOC, and MAS benchmarks from day one.",
//           },
//           {
//             title: "Continuous Compliance Monitoring",
//             content:
//               "Stay audit-ready with real-time insights and auto-remediations aligned to compliance standards.",
//           },
//         ],
//       },
//     ],
//   },
  // Add more sections like above as needed
];

const ClouSecOverview: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentTabs = sections[activeSection].tabs;
  const currentContent = currentTabs[activeTab];

  const handleTabClick = (sectionIndex: number) => {
    setActiveSection(sectionIndex);
    setActiveTab(0);
    setOpenIndex(null);
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 space-y-10 bg-gradient-to-br from-indigo-700 to-purple-700 text-white">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white">
          The RegTech Solution for Secure & Compliant Cloud Operations
        </h1>
        <p className="text-lg text-white mt-2">
          Sleep Soundly Knowing Your Cloud is Secure: The Power of ClouSec
        </p>
        <p className="text-[16px] text-white  mt-4  mx-auto">
          In highly regulated industries like banking, fintech, e-commerce and insurance, cloud security is no longer just an IT concern – it's a business imperative. Data breaches can lead to crippling fines, reputational damage, and a loss of customer trust. Modern cloud environments are complex, with security insights often scattered across multiple services – leading to missed threats, slow response times, and growing costs. ClouSec changes the game by consolidating and correlating security data in one unified platform, powered by AI-driven automation.
        </p>
      </header>

      {/* Section Tabs */}
      <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 pb-4">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-lg font-medium ${
              activeSection === index
                ? "border-2 text-white"
                : "bg-white text-black_"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Nested Content Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {currentTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(idx);
              setOpenIndex(null);
              contentRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === idx
                ? "border-2 text-white"
                : "bg-white text-black_"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div
        ref={contentRef}
        className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl shadow-sm p-6"
      >
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <AspectRatioBox ratio="4:3">
            <OptimizedImage
              src={currentContent.img}
              alt={currentContent.title}
              width={600}
              height={450}
              className="rounded-lg"
            />
          </AspectRatioBox>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <span className="uppercase text-primary text-sm font-semibold">
              Challenge
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {currentContent.title}
            </h2>
            <p className="text-gray-600 mt-2">{currentContent.content}</p>
          </div>

          <div>
            <span className="uppercase text-primary text-sm font-semibold">
              How ClouSec Helps
            </span>
            <div className="mt-4 space-y-4">
              {currentContent.list.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(i)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary2 text-white rounded-full text-center text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {item.title}
                    </span>
                    <span className="text-primary2 text-xl">
                      {openIndex === i ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="px-4 pb-4 text-gray-600">{item.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClouSecOverview;
