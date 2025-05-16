import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import Logo from "../../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              {/* <img src={Logo} alt="ClouSec Logo" className="h-12" /> */}
            </Link>
            <p className="text-gray-400 text-sm">
              ClouSec is a PaaS-based, AI-driven Cloud Infrastructure Entitlement Management (CIEM) tool with Cloud Center of Excellence (CCoE) capabilities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/103767687" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/platform-overview" className="text-gray-400 hover:text-white transition-colors">Platform</Link>
              </li>
              <li>
                <a href="/#price" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              </li>
              <li>
                <a href="/#contact-us" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <Link to="/book-demo" className="text-gray-400 hover:text-white transition-colors">Request Demo</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#our-solution" className="text-gray-400 hover:text-white transition-colors">Cloud Security</a>
              </li>
              <li>
                <a href="/#our-solution" className="text-gray-400 hover:text-white transition-colors">Compliance Management</a>
              </li>
              <li>
                <a href="/#our-solution" className="text-gray-400 hover:text-white transition-colors">Cost Optimization</a>
              </li>
              <li>
                <a href="/#our-solution" className="text-gray-400 hover:text-white transition-colors">Cloud Operations</a>
              </li>
              <li>
                <a href="/#our-solution" className="text-gray-400 hover:text-white transition-colors">AI-Driven Solutions</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <p className="flex flex-col">
                  <span className="font-medium">India:</span>
                  <span className="text-sm">No 1, 2nd floor, Meenambal Salai, Vivekandhar Nagar, Chennai-600118, India </span>
                </p>



              </li>
              <li>
                <p className="flex flex-col">
                  <span className="font-medium">USA:</span>
                  <span className="text-sm">11700 Lebanon Road, Apt 1527 Frisco, TX 75035-75025
</span>
                </p>
              </li>
             <div className="flex flex-col">
               <li>
                <a href="mailto:sales@clousec.net" className="hover:text-white transition-colors">sales@clousec.net</a> 
              </li>
              <li>
                <a href="mailto:jerome@clousec.net" className="hover:text-white transition-colors">jerome@clousec.net</a>
              </li>
              <li>
                <a href="mailto:support@clousec.net" className="hover:text-white transition-colors">support@clousec.net</a>
              </li>
             </div>
             <div className="flex flex-wrap ">
               <li>
                <a href="tel:+919790845787" className="hover:text-white transition-colors">+91 9790845787</a>&nbsp;|&nbsp;
              </li> 
               <li>
                <a href="tel:+919345336553" className="hover:text-white transition-colors">+91 9345336553</a>
              </li> 
             </div>

            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ClouSec Technologies. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies-policy" className="hover:text-white transition-colors">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
