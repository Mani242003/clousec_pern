import React from "react";

interface Content1Props {
  titel: string;
  img: string;
  img1?: string;
}

const Content1: React.FC<Content1Props> = ({ titel, img, img1 }) => {
  return (
    <div 
      className="w-full flex flex-col gap-2 p-0 px-0 sm:px-4 pb-0 sm:pb-4 items-center justify-center mt-5 sm:mt-20"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="700"
    >
      <div className="">
        <h1 className="text-3xl font-semibold sm:text-3xl text-violet-950 dark:text-primary">
          {titel}
        </h1>
      </div>
      <div>
        <img src={img} className="w-40" alt={`${titel} icon`} />
        {img1 && (
          <img src={img1} className="w-44 mt-[0] sm:mt-[30px]" alt={`${titel} secondary icon`} />
        )}
      </div>
    </div>
  );
};

export default Content1;
