import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import C_S_Data, { CaseStudy } from "../assets/C_S_Data";
import OptimizedImage from "./OptimizedImage";
import AspectRatioBox from "./AspectRatioBox";
import { processBatch } from "../utils/taskScheduler";

const C_S_Component: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto px-4 pt-[2rem] overflow-hidden">
        <div
          data-aos="zoom-out"
          data-aos-duration="500"
          className="text-center py-12 relative group"
        >
          <h2 className="text-[35px] font-bold mt-6 tracking-wide inline-block relative pb-2">
            Explore our Insights &
            <span className="ml-2 text-primary">Case Studies</span>
            {/* Animated Border */}
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-primary transition-all duration-500 group-hover:w-full"></span>
          </h2>
        </div>
        <C_S_List />
      </div>
    </section>
  );
};

const C_S_List: React.FC = () => {
  const [processedItems, setProcessedItems] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Process case study data in batches to improve performance
  useEffect(() => {
    const processItems = async (): Promise<void> => {
      setIsLoading(true);
      
      // Process data in batches to avoid blocking the main thread
      const processed = await processBatch<CaseStudy, CaseStudy>(C_S_Data.slice(0, 3), item => {
        // Any complex processing can go here
        return {
          ...item,
        };
      });
      
      setProcessedItems(processed);
      setIsLoading(false);
    };
    
    processItems();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap">
      {isLoading ? (
        // Placeholder while loading to prevent layout shift
        Array(3).fill(0).map((_, index) => (
          <div key={index} className="lg:w-1/3 md:w-1/2 sm:w-1/2 p-4 mb-5">
            <div className="border border-gray-200 rounded overflow-hidden">
              <div className="bg-gray-200 h-64 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        processedItems.map((item) => (
          <C_S_Item item={item} key={item.id} />
        ))
      )}
    </div>
  );
};

interface C_S_ItemProps {
  item: CaseStudy;
}

const C_S_Item: React.FC<C_S_ItemProps> = ({ item }) => {
  const { title, imgUrl, challenges1 } = item;

  return (
    <div data-aos="zoom-in" className="lg:w-1/3 md:w-1/2 sm:w-1/2 p-4 mb-5">
      <div className="border border-gray-200 rounded overflow-hidden">
        {/* Use AspectRatioBox to maintain consistent image dimensions */}
        <AspectRatioBox ratio="16:9">
          <OptimizedImage
            src={imgUrl}
            alt={title}
            width={500}
            height={281}
            className="w-full"
          />
        </AspectRatioBox>
        <div className="p-4">
          <Link
            to={`/blogs/${title}`}
            className="text-blue-900 text-lg font-semibold hover:text-black transition duration-300"
          >
            {title}
          </Link>
          <p className="text-gray-600 mt-3">
            {challenges1.length > 100 ? challenges1.substr(0, 120) : challenges1}
          </p>
          <Link
            to={`/blogs/${title}`}
            className="text-blue-900 font-semibold text-base mt-2 inline-block hover:text-black"
          >
            Read More
          </Link>
          <div className="border-t border-gray-200 pt-3 mt-3 flex items-center justify-between">
            <span className="text-titleBlue font-semibold flex items-center">
              ClouSec Technologies Pvt Ltd
            </span>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1">
                {/* <i className="ri-calendar-line text-desGray"></i> {date} */}
              </span>
              <span className="flex items-center gap-1">
                {/* <i className="ri-time-line text-desGray"></i> {time} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default C_S_Component;
