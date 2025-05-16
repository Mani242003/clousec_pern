import React, { useEffect, useState } from "react";
import { MdSecurity } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";
import { MdSavings } from "react-icons/md";

import { Link } from "react-router-dom";
import { processBatch } from "../../utils/taskScheduler";

interface Skill {
  name: string;
  icon: React.ReactNode;
  link: string;
  description: string;
  aosDelay: string;
  processed?: boolean;
}

const skillsData: Skill[] = [
  {
    name: "Automated Compliance",
    icon: <MdSecurity className="text-[50px]" />,
    link: "#",
    description: "Ensure adherence to country-specific regulations with intelligent compliance automation and real-time reporting.",
    aosDelay: "0",
  },
  {
    name: "AI-Powered Security",
    icon: <GrVulnerability className="text-[50px]" />,
    link: "#",
    description:
      "Detect and respond to threats faster with AI-driven threat intelligence and automated vulnerability management",
    aosDelay: "300",
  },
  {
    name: "Optimized Cloud Costs",
    icon: <MdSavings className="text-[50px]" />,
    link: "#",
    description: "Reduce your monthly cloud bill through automated resource optimization and proactive cost management.",
    aosDelay: "500",
  },
 
];

const Services: React.FC = () => {
  const [processedSkills, setProcessedSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Process skills data in batches to improve FID (First Input Delay)
  useEffect(() => {
    const processSkills = async (): Promise<void> => {
      setIsLoading(true);
      
      // Process data in batches to avoid blocking the main thread
      const processed = await processBatch<Skill, Skill>(skillsData, skill => {
        // Any complex processing can go here
        return {
          ...skill,
          processed: true
        };
      });
      
      setProcessedSkills(processed);
      setIsLoading(false);
    };
    
    processSkills();
  }, []);

  return (
    <>
      <span id="features"></span>
      <div className="bg-white-100 py-12 sm:grid sm:place-items-center overflow-hidden ">
        <div className="container">
          {/* Header */}
          <div className="pb-12 text-center space-y-3">
            {/* <span
              data-aos="fade-up"
              className="text-[35px] font-bold sm:text-[55px] text-primary"
            >
              The Power of ClouSec
            </span> */}
            <h1 className="text-[40px] font-bold w-full font-Grotesk">
              Optimize Cyber Risk Management with our multi-feature PaaS
              platform
            </h1>
            {/* <p
              data-aos="fade-up"
              className="pr-2 text-black_ w-full sm:w-2/4 mx-auto text-[19px]"
            >
              ClouSec allows you to efficiently manage Security Findings, Vulnerability Detection, Threat Monitoring, and Day 1 Compliance with speed and accuracy.
            </p> */}
          </div>

          {/* Services cards - Using a container with min-height to prevent layout shift */}
          <div className="w-full flex pt-6 gap-4 min-h-[300px]">
            {isLoading ? (
              // Placeholder while loading to prevent layout shift
              <div className="w-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              // Render actual content when loaded
              processedSkills.map((skill) => (
                <div
                  key={skill.name}
                  data-aos="fade-up"
                  data-aos-delay={skill.aosDelay}
                  className="flex w-2/4 hover:shadow-lg items-center flex-col card space-y-3 sm:space-y-4 p-4 border border-primary2 rounded-lg"
                >
                  <div className="w-[100px] h-[100px] flex items-center justify-center p-1 bg-white rounded-full text-primary2 border border-primary2 rounded-bg mt-[-70px]">
                    {skill.icon}
                  </div>
                  <h1 className="text-lg font-semibold">{skill.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    {skill.description}
                  </p>
                  {/* button */}
                  <Link to="/platform-overview" className="text-primary mt-4">Read More</Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
