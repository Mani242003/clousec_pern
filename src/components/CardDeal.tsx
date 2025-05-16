import React from "react";
import card from "/sam-sol-2.webp";
import GradientLinkButton from "./common/GradientLinkButtonProps";

const CardDeal: React.FC = () => {
  return (
    <section className="flex flex-col bg-gray-900 p-[50px] md:flex-row py-16 " >
      <div className="flex-1 flex flex-col justify-center items-start">
        <h2 className="font-poppins  font-semibold text-[40px] md:text-[48px] text-white leading-[66.8px] md:leading-[66.8px] w-full">
          Integrations & Alerts
        </h2>
        <p className="font-poppins font-normal text-gray-400 text-[18px] leading-[30.8px] max-w-[470px] mt-5">
        •	Get real-time alerts via Slack, Teams, or Email for critical security incidents.
        </p>
        <p className="font-poppins font-normal text-gray-400 text-[18px] leading-[30.8px] max-w-[470px] mt-5">
        Get real-time alerts via Slack, Teams, or Email for critical / high security incidents based on our customised rule engine.
        </p>

        
        <GradientLinkButton className="mt-[1.5rem] w-[9.3rem]" path="/book-demo">
        Get Started

      </GradientLinkButton>
      </div>
      <div className="flex-1 flex justify-center items-center md:ml-10 mt-10 md:mt-0">
        <img src={card} alt="card" className="w-full h-full" />
      </div>
    </section>
  );
};

export default CardDeal;
