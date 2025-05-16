import React, { useRef, useState, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";
import AspectRatioBox from "./AspectRatioBox";
import { processBatch } from "../utils/taskScheduler";

interface TabItem {
  title: string;
  content: string;
  disabled: boolean;
  img: string;
  list: {
    title: string;
    content: string;
  }[];
  processed?: boolean;
}

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [processedTabs, setProcessedTabs] = useState<TabItem[] | null>(null);
console.log(processedTabs);

  const tabs: TabItem[] = [
    {
      title: "Scattered Security Insights",
      content: `Traditional solutions pull security data from various AWS services without true consolidation, making it difficult to analyze and remediate threats effectively.`,
      disabled: false,
      img: "/sam-sol-1.webp",
      list: [
        {
          title: "Unified Security Dashboard",
          content: `Gain a complete view of vulnerabilities and misconfigurations with automatically centralized and correlated security findings`,
        },
        {
          title: "Actionable Insights",
          content: `Act quickly on meaningful findings with data that's not just collected, but analyzed for patterns and combined with threat intelligence.`,
        },
      ],
    },
    {
      title: "User Access Governance",
      content: `Cross-account access management is often limited in many CSPM tools, creating gaps in visibility and risk.`,
      disabled: false,
      img: "/sam-sol-2.webp",
      list: [
        {
          title: "Granular Governance",
          content: `Enforce robust access rules across multiple accounts and platforms.`,
        },
        {
          title: "Enhanced Security Posture",
          content: `Reduced chance of unauthorized access and improved compliance thanks to fine-grained user role definitions.`,
        },
      ],
    },
    {
      title: "Alert Fatigue & Overwhelming Security Findings",
      content: `Security teams face an onslaught of unprioritized alerts, leading to high volumes of noise and significant alert fatigue.`,
      disabled: false,
      img: "/sam-sol-3.webp",
      list: [
        {
          title: "Intelligent Prioritization",
          content: `ClouSec's recommendations reduce duplication and focus on the issues that matter most, slashing the time spent on low-impact alerts.`,
        },
        {
          title: "Automated Workflows",
          content: `Immediate triaging routes critical vulnerabilities to the right teams, so nothing slips through the cracks.`,
        },
      ],
    },
    {
      title: "Manual, Time-Consuming Remediation",
      content: `Current CSPM tools can flood you with findings, yet lack AI-driven remediation, leading to delays and increased vulnerabilities.`,
      disabled: false,
      img: "/sam-sol-4.webp",
      list: [
        {
          title: "AI-Powered Automated Remediation",
          content: `ClouSec's system addresses security gaps automatically, applying best-practice fixes within minutes.`,
        },
        {
          title: "Faster Response Time",
          content: `By reducing manual processing, organizations see fewer errors, quicker threat resolution, and stronger overall security posture.`,
        },
      ],
    },
    {
      title: "Inefficient Cost Management & Idle Resource Monitoring",
      content: `Organizations frequently leave unused resources running, while traditional CSPM tools provide only partial cost visibility.`,
      disabled: false,
      img: "/sam-sol-1.webp",
      list: [
        {
          title: "AI-Driven Rightsizing Recommendations",
          content: `Get insights on optimal resource usage to prevent overspending.`,
        },
        {
          title: "Automatic Shutdown of Unused Resources",
          content: `ClouSec proactively identifies and stops idle resources, ensuring you only pay for what you use.`,
        },
      ],
    },
    {
      title: "Day-One Readiness for CIS, SOC, and MAS Regulations",
      content: `Meeting compliance standards is daunting, especially with multiple frameworks like CIS, SOC, or MAS.`,
      disabled: false,
      img: "/sam-sol-2.webp",
      list: [
        {
          title: "Built-In Compliance Rules",
          content: `ClouSec scans infrastructure against CIS, SOC, and MAS benchmarks from day one.`,
        },
        {
          title: "Continuous Compliance Monitoring",
          content: `Stay audit-ready with real-time insights and auto-remediations aligned to compliance standards.`,
        },
      ],
    },
    {
      title: "Flexible Deployment & Pricing",
      content: `Traditional CSPM and SIEM tools rely on a rigid SaaS model, making scaling costly and challenging.`,
      disabled: false,
      img: "/sam-sol-3.webp",
      list: [
        {
          title: "Flexible Deployment Options",
          content: `Reduce the burden of managing multiple agents.`,
        },
        {
          title: "Cost-Effective Scalability",
          content: `ClouSec's pricing scales with your organization—without punishing fees for growth.`,
        },
      ],
    },
    {
      title: "Executive-Level Insights for Leadership",
      content: `Security data can be fragmented, making it difficult for executives to assess security and compliance postures.`,
      disabled: false,
      img: "/sam-sol-4.webp",
      list: [
        {
          title: "Comprehensive Dashboards",
          content: `Provide leadership with a unified snapshot of cloud health, cost consumption, and misconfiguration risks.`,
        },
        {
          title: "Data-Driven Decision-Making",
          content: `Quick, digestible reports help executives allocate resources effectively and measure security ROI.`,
        },
      ],
    },
    {
      title: "API Security",
      content: `APIs are a major attack vector, yet many security tools lack effective monitoring and detection capabilities.`,
      disabled: false,
      img: "/sam-sol-1.webp",
      list: [
        {
          title: "Holistic API Monitoring",
          content: `Monitor API calls, detect anomalies, and respond in real time.`,
        },
        {
          title: "Proactive Threat Detection",
          content: `Intelligent algorithms identify suspicious behavior before it becomes a breach.`,
        },
      ],
    },
    {
      title: "Streamlined Ticketing & Incident Resolution",
      content: `Managing security exceptions across multiple teams can be chaotic, risking delays and miscommunication.`,
      disabled: false,
      img: "/sam-sol-2.webp",
      list: [
        {
          title: "Customized Ticketing Workflow",
          content: `Automatically create and assign tickets based on incident type, priority, and relevant team.`,
        },
        {
          title: "Cross-Team Visibility",
          content: `Ensure everyone stays informed of security tasks, improving accountability and efficiency.`,
        },
      ],
    },
  ];

  // Process tabs data in batches to improve performance
  useEffect(() => {
    const processTabs = async (): Promise<void> => {
      const processed = await processBatch<TabItem, TabItem>(tabs, tab => {
        // Any complex processing can go here
        return {
          ...tab,
          processed: true
        };
      });
      
      setProcessedTabs(processed);
    };
    
    processTabs();
  }, []);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);

    // Scroll to the content section smoothly
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="our-solution" className="w-full p-8 bg-gray-100">
      <div className="pb-6 text-start space-y-2">
        <span
          data-aos="fade-up"
          className="text-[18px] font-bold text-primary tracking-[3px] uppercase"
        >
          ClouSec Solution
        </span>
        <h1 className="text-[30px] font-bold w-full">
          Your Centralized Cloud Security & Compliance Solution
        </h1>
        <p className="pr-2 text-black_ text-[18px]">
          Modern cloud environments are complex, with security insights often
          scattered across multiple AWS services—leading to missed threats, slow
          response times, and growing costs. ClouSec changes the game by
          consolidating and correlating security data in one unified platform,
          powered by AI-driven automation. Discover how ClouSec solves the
          biggest challenges in cloud security today.
        </p>
      </div>
      <div className="flex flex-wrap">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-[14px] font-medium rounded-lg flex mx-2 my-1 text-black_ border-b-2 border-transparent ml-0
                ${
                  activeTab === index
                    ? "text-white-600 bg-primary2 text-white"
                    : "text-gray-700 bg-lightWhite"
                }
              `}
            disabled={tab.disabled}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
        <div ref={contentRef}></div>
      </div>
      <div className="flex w-full pt-8 gap-6 bg-gray-100">
        {/* Left Section - Image with AspectRatioBox to prevent layout shift */}
        <div className="w-[45%] p-6 bg-lightWhite flex justify-center items-center">
          <AspectRatioBox ratio="4:3">
            <OptimizedImage
              src={tabs[activeTab].img}
              alt={tabs[activeTab].title}
              width={600}
              height={450}
              className="rounded-lg"
            />
          </AspectRatioBox>
        </div>

        {/* Right Section - Content */}
        <div className="w-[55%] bg-gray-100 flex flex-col space-y-6">
          {/* Challenge Section */}
          <div>
            <span className="text-xl tracking-wide uppercase font-bold text-primary">
              Challenge
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-3 text-gray-600">
              {tabs[activeTab].title}
            </h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {tabs[activeTab].content}
            </p>
          </div>

          {/* How ClouSec Helps */}
          <div>
            <span className="text-xl font-bold tracking-wid uppercase text-primary">
              How ClouSec Helps
            </span>

            {tabs[activeTab].list && (
              <div className="mt-4 space-y-4">
                {tabs[activeTab].list.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg shadow-sm">
                    <button
                      className="w-full p-4 flex items-center justify-between text-gray-800 font-semibold focus:outline-none"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center bg-primary2 text-white rounded-full text-sm">
                          {index + 1}
                        </span>
                        {item.title}
                      </div>
                      <span className="text-primary2">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="p-4 text-gray-600 border-t">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
