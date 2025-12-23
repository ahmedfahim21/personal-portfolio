import React from "react";
import { socialMedia, aboutMe } from "../constants";
import { profilePic } from "../assets";
import { layout } from "../style";
import { resumeLink, repoLink } from "../constants";
import { AiFillGithub, AiOutlineFileText } from "react-icons/ai";

const Footer = () => (
  <footer id="contactMe" className="relative bg-white sm:px-16 px-6 py-6 border-t border-gray-200">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 -z-10"></div>

    <div
      className={`${layout.sectionReverse} xl:max-w-[1280px] w-full mx-auto gap-y-4 relative z-10`}
    >
      <div className={` ${layout.sectionInfo}`}>
        <h2 className="text-2xl font-bold text-primary font-mono">
          {aboutMe.name}
        </h2>
        <p
          className={`font-serif italic text-gray-600 text-[16px] leading-[28px] max-w-[470px] mt-2`}
        >
        {aboutMe.tagLine}
        </p>
        
        <div className="flex flex-row mt-4 gap-3">
          {socialMedia.map((social, index) => (
            <a
              href={social.link}
              target="_blank"
              key={social.id}
              index={index}
              className="w-9 h-9 rounded-full bg-gray-100 flex justify-center items-center text-gray-600 hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              {React.createElement(social.icon, { size: 18 })}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <a 
            href={resumeLink} 
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white font-poppins font-medium text-[14px] rounded-full hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-secondary/25 hover:-translate-y-1"
          >
            <AiOutlineFileText size={18} />
            Resume
          </a>
        </div>
      </div>

      <div className="md:ml-auto mt-6 md:mt-0 flex justify-center">
        <div className="relative">
            <div className="absolute inset-0 bg-secondary rounded-full blur-xl opacity-20 animate-pulse"></div>
            <img
            src={profilePic}
            alt="Fahim Ahmed"
            className="w-[150px] h-[150px] border-4 border-white shadow-2xl relative z-[5] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
    
    <div className="w-full h-[1px] bg-gray-200 my-6"></div>

    <div className="text-center font-poppins font-medium text-gray-500 text-xs">
      <p>
        <a href={repoLink} target="_blank" rel="noopener noreferrer" className=" hover:cursor-pointer text-secondary">Portfolio template</a> made with 💙 by Parth Mittal & the Open Source Community
      </p>
    </div>
  </footer>
);

export default Footer;
