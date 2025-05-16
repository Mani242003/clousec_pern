import { useEffect, useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "/logo.png";
import Link from "../../components/common/Link";

import a from "/bg1.jpg"; 
import {  navLinks } from "../../components/constants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu"
// import React from "react";
import { cn } from "../../lib/utils";
import ListItem from "../../components/common/ListItem";
import AspectRatioBox from "../AspectRatioBox";
import GradientLinkButton from "./GradientLinkButtonProps";

const NavBar = () => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY >1);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    {/* annocement */}
     <div className="w-full  bg-primary2 h-[40px] text-[13px] flex items-center justify-center text-white_ font-sans" style={{ backgroundImage: `url(${a})`, 
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
               }}>
<img src="/aws.svg" width="30px " alt="" />
<div className="border-l border-white h-[25px] mx-2 ">
 
</div>
<div className="flex flex-col leading-tight pr-5">
<span> 2025 </span>
<span>Marketplace</span>
</div>
<span>Version 1.0.49 We have fixed security vulnerabilites which are identified by AWS Markerplace</span>
<a
                  href="https://aws.amazon.com/marketplace/pp/prodview-tr7svw2t4342o"
                    className="px-6 py-3 text-white_ "
                  >
                    Learn More →
                  </a>
</div>
<nav>
      
     
      {/* navbar */}
      <div
  className={cn(
    "fixed z-30 w-full flex items-center justify-center py-2 h-[70px] transition-colors  ",
    scrolled ? "top-0 shadow bg-white" : "bg-white"
  )}
>
        <div className="flex   px-10 w-full ">
          <div className={`${flexBetween} w-full gap-10`}>
            {/* LEFT SIDE */}
        
         <Link classname="p-0 m-0 " path="/">  <img alt="logo" src={Logo} className="w-[200px]" />    </Link> 

            {/* RIGHT SIDE */}
            <div className="hidden md:flex justify-between items-center w-full">
           
               <NavigationMenu>
      <NavigationMenuList className="flex  items-center justify-between w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black" >Platform</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white text-black ">
            <ul className="grid    h-[350px]  md:w-[600px] lg:w-[700px] lg:grid-cols-[.75fr_1fr] border-none">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex flex-col h-full w-full select-none rounded-md p-6 no-underline outline-none focus:shadow-md bg-bg_light"
                    
                  >
                    <span className="text-black_ text-[22px] font-bold">See ClouSec in action</span>
                   
                    <span className="text-gray_ text-[15px] py-2 pb-3"> One platform to secure your apps and data in the cloud.</span>
                   
                     <AspectRatioBox ratio="">
                   
                    <img
        src="/banner.jpg"
        alt="ClouSec cloud security platform visualization"
        style={{
          objectFit: 'cover',
        }}
      />
                  </AspectRatioBox>
 

<GradientLinkButton className="mt-[9.5rem]" path="/book-demo">
Get a Demo
      </GradientLinkButton>

                  </div>
                </NavigationMenuLink>
              </li>
             <div className="flex flex-col gap-2 p-3">
             <ListItem href="/docs" title="Architecture	Diagram">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!
              </ListItem>
              <ListItem href="/docs/installation" title="Documentation">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Pricing">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
             </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black">Company</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white text-black">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            <ListItem href="/aboutUs" title="About	Us">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

              </ListItem>
              <ListItem href="/docs" title="Team">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

              </ListItem>
              <ListItem href="/docs" title="Contact	Us">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black font-bolder "> Resources</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white text-black">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            <ListItem href="/docs" title="Case	Studies">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!
              </ListItem>
              <ListItem href="/docs" title="Videos">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

              {/* /  Re-usable components built using Radix UI and Tailwind CSS. */}
              </ListItem>
              <ListItem href="/docs" title="Blog">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                {/* Re-usable components built using Radix UI and Tailwind CSS. */}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
        <Link classname="ml-3 mr-6 font-semi-bolder text-[15px]" label="Partners" path="/lab" />
        {/* <Link lable="Join Now" path="/mani" /> */}
     
        
      </NavigationMenuList>
    </NavigationMenu>
    <div className="flex items-center ">
              {/* <Link label="Sign In" path="/lab" /> */}
              {/* <NavigationMenuTrigger>Getting started</NavigationMenuTrigger> */}
                <GradientLinkButton  icon='false'  path="/book-demo">
                Get	Secure	
                with	ClouSec
      </GradientLinkButton>
                
              </div>
            </div>
            
            
            
            {/* Hamburger Icon for Mobile */}
            <button
              className="md:hidden rounded-full bg-secondary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              {/* <Bars3Icon className="h-6 w-6 text-white" /> */}
              x
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      <div
        className={`${
          isMenuToggled ? "block" : "hidden"
        } fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl md:hidden`}
      >
        {/* CLOSE ICON */}
        <div className="flex justify-end p-12">
          <button onClick={() => setIsMenuToggled(false)}>
            {/* <XMarkIcon className="h-6 w-6 text-gray-400" /> */}
            close
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="ml-[33%] flex flex-col gap-10 text-2xl">
          {navLinks.map((link, index) => (
            <Link key={index} label={link.label} path={link.path}  />
          ))}
        </div>
      </div>
    </nav>
    </>
   
  );
};

export default NavBar;


// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = "ListItem"



// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
// import { cn } from "../../lib/utils";
// import logo from "/logoNew.png";
// import { LogIn, Menu } from "lucide-react";
// import { navLinks } from "../../constants";

// export const NavBar = () => {
//   const [activeLink, setActiveLink] = useState("home");
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header className={cn("fixed top-0 w-full z-50 transition-all border-b border-b-gray-300 px-0 md:px-15", scrolled ? "bg-white " : "bg-white ")}> 
//       <div className="container mx-auto flex items-center justify-between py-2 px-6">
//         <Link to="/" className="flex items-center space-x-3">
//           <img src={logo} alt="Logo" className=" w-[500px]" />
//           {/* <span className="text-xl font-bold tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
//             Lexnyxoria
//           </span> */}
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-6">
//           {navLinks.map((item) => (
//             <Link 
//               key={item.label} 
//               to={item.path} 
//               className={cn(
//                 "text-lg font-medium transition-colors mx-8 pb-2",
//                 activeLink === item.label ? "text-[#20A08F]" : "text-gray-700 hover:text-[#20A08F]"
//               )}
//               onClick={() => setActiveLink(item.label)}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
        
//         {/* Social Icons & Button */}
//         <div className="hidden md:flex items-center space-x-4">
//           <div className="flex space-x-3"></div>
//           <Link to="#connect">
//             <Button className="flex items-center gap-2 px-4 py-2 text-white bg-[#262E40] rounded-lg shadow-md">
//               {/* <LogIn className="w-5 h-5" /> */}
//               Login
//             </Button>
//           </Link>
//         </div>
        
//         {/* Mobile Menu */}
//         <div>
//           <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             <Menu size={24} />
//           </button>
//           {menuOpen && (
//             <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col space-y-6 p-6 pt-30">
//               {navLinks.map((item) => (
//                 <Link 
//                   key={item.path} 
//                   to={item.path} 
//                   className={`text-lg font-medium ${activeLink === item.label ? '' : 'text-gray-700 '}`}
//                   onClick={() => { setActiveLink(item.path); setMenuOpen(false); }}
//                 >
//                   {item.path}
//                 </Link>
//               ))}
//               <Link to="#connect">
//                 <Button className="flex items-center gap-2 px-4 py-2 text-white  bg-black rounded-lg shadow-md">
//                   <LogIn className="w-5 h-5" />
//                   Login
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };