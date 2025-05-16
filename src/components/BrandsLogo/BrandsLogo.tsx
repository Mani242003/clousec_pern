import React from "react";
import Brand1 from "../../assets/incubater1.png";
import Brand2 from "../../assets/incubater2.png";

const BrandsLogo: React.FC = () => {
  return (
    <>
      <div className="container mb-12 pt-12 mt-0 sm:mt-0">
        <h1 className="text-center">ClouSec is backed and incubated by</h1>
        <div className="py-6 md:px-32 flex flex-wrap items-center justify-center gap-[70px] sm:gap-[150px]">
          <img src={Brand1} alt="Incubator 1 logo" className="w-40" />
          <img src={Brand2} alt="Incubator 2 logo" className="w-72" />
        </div>
      </div>
    </>
  );
};

export default BrandsLogo;
