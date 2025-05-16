import React from "react";
import codeImg from "/hero-image-providers.webp";

interface ChecklistItem {
  title: string;
  description: string;
}

const checklistItems: ChecklistItem[] = [
  
    {
      title: "Intelligent Ticketing System",
      description:
        "Streamline incident resolution with auto-escalation workflows.",
    },
    {
      title: "User Access Matrix",
      description:
        "Periodically review access privileges and take necessary actions.",
    },
    {
      title: "Cost Management",
      description:
        "Optimize cloud spend with rightsizing recommendations and automated resource cleanup.",
    },
    {
      title: "Eagle Tree View",
      description:
        "Gain a comprehensive view of root and associated accounts, including health status, cost insights, and misconfiguration details.",
    }
  
  
];

const Workflow: React.FC = () => {
  return (
    <div className="pt-6 p-[50px]">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Workflow{" "}
        <span className="text-primary bg-clip-text">
         
        </span>
      </h2>
      <div className="flex flex-wrap justify-center pt-12">
        <div className="p-2 w-full lg:w-1/2">
          <img src={codeImg} alt="Coding" />
        </div>
        <div className="w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-4">
              <div className="text-primary mx-2 bg-white h-10 w-10 p-2 justify-center items-center rounded-full">
                ✅
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
