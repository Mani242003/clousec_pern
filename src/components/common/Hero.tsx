import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../OptimizedImage";
import AspectRatioBox from "../AspectRatioBox";
import a from "/bg1.jpg";

import AnimatedText from "../common/AnimatedText";
import GradientLinkButton from "../common/GradientLinkButtonProps";

// Custom Hook to detect if an element is in view
const useInView = (offset = 100) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      if (!element) return;
      const top = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - offset) {
        setIsInView(true);
      }
    };

    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { ref, isInView };
};

const Hero: React.FC = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView(150);
  const { ref: textRef, isInView: textVisible } = useInView(100);

  return (
    <>
      <div className="px-0  pt-[60px] ">
        <div
          className="bg-no-repeat bg-cover min-h-[100px] overflow-hidden"
          style={{ backgroundImage: `url(${a})` }}
        >
          <div
            ref={heroRef}
            className={`px-4 md:px-6 pr-0 min-h-[550px] md:min-h-[650px] flex transition-all duration-1000 ease-in-out ${heroVisible ? "animate-fade-in visible" : ""
              }`}
          >
            <div className="flex      w-full ">
              {/* Text Section */}
              <div
                ref={textRef}
                className={` flex flex-col w-[50%] space-y-4 md:space-y-5 mt-24 text-center md:text-left transition-all duration-1000 ease-in-out ${textVisible ? "animate-fade-in visible" : ""
                  }`}
              >
                <AnimatedText
                  className=" w-[350px] spacing  text-white_ font-bolder mb-3 border-b border-dashed"
                  data="Welcome	to	ClouSec	Technologies	Pvt	Ltd "
                />


                <span className="  font-Grotesk text-[45px] sm:text-[55px] text-white_ font-bold leading-none">
                  The AI-Powered RegTech Platform for Effortless Cloud Compliance
                </span>&nbsp; &nbsp;




                <p className="text-white_">
                 ClouSec is an intelligent RegTech platform that unifies SIEM, CIEM, and CCoE to secure cloud infrastructures at any scale. It automates regulatory compliance, streamlines cloud security with AI-driven insights and optimizes cloud operations to reduce monthly costs
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
              
                   <GradientLinkButton  path="/book-demo">
                   Request a Demo
                        </GradientLinkButton>
                  
                  <Link
                    to="/platform-overview"
                    className="px-6 py-3 border-2 border-white hover:bg-white hover:text-primary2 text-white rounded-full transition"
                  >
                    Take a Product Tour →
                  </Link>
                </div>
               
              </div>

              <div
                className='  absolute  flex flex-1 h-full w-[80%] right-[-400px] mt-11 '
              >
                <div className="  w-full h-full pl-[10px] ">

                  <AspectRatioBox ratio="">
                    <OptimizedImage
                      src="/banner.jpg"
                      alt="ClouSec cloud security platform visualization"
                      priority={true}
                      // width={1000}
                      // height={550}
                      className="absolute"
                    />
                  </AspectRatioBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Hero;


