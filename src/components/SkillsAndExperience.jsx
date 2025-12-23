import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";
import { experiences, educationList } from "../constants";
import styles from "../style";

const Content = ({ text, link }) => {
  return (
    <li className="font-poppins font-normal text-[14px] text-gray-600 mb-2">
      {text}{" "}
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <BsLink45Deg
            size="1rem"
            className="inline hover:text-secondary"
          />
        </a>
      ) : (
        ""
      )}
    </li>
  );
};

const ExperienceCard = (props) => {
  return (
    <motion.div
      whileInView={{ y: [-20, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="mb-6"
    >
      <div className="flex flex-row items-center mb-6">
        <div className="w-[52px] h-[52px] flex items-center justify-center bg-white rounded-md z-[2] overflow-hidden">
            <img
            src={props.logo}
            alt={props.organisation}
            className="w-full h-full object-contain"
            />
        </div>
        <h4 className="font-poppins font-semibold text-[20px] text-secondary leading-[32px] ml-4">
          {props.organisation}
        </h4>
      </div>
      <ol className="relative border-l border-gray-200 ml-6">
        {props.positions.map((position, index) => (
          <li
            key={index}
            className={`${
              index === props.positions.length - 1 ? "mb-0" : "mb-8"
            } ml-6`}
          >
            <div className="absolute w-4 h-4 bg-secondary rounded-full mt-1.5 -left-2 border border-white"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              {position.title}
            </h3>
            <time className="mb-4 block text-sm font-normal leading-none text-gray-400">
              {position.duration}
            </time>
            {/* <ul className="list-disc ml-5 space-y-2">
                {position.content.map((info, index) => (
                <Content key={index} index={index} {...info} />
                ))}
            </ul> */}
          </li>
        ))}
      </ol>
    </motion.div>
  );
};

const EducationCard = (props) => {
    return (
      <motion.div
        whileInView={{ y: [-20, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-between h-full p-8 rounded-[20px] bg-white border border-gray-100"
      >
        <div>
            <div className="flex flex-row items-center mb-6">
            <div className="w-[60px] h-[60px] flex items-center justify-center bg-white rounded-md border border-gray-100 p-2">
                <img
                src={props.icon}
                alt={props.title}
                className="w-full h-full object-contain"
                />
            </div>
            <div className="flex flex-col ml-4">
                <h4 className="font-poppins font-medium text-[20px] text-primary leading-[30px]">
                {props.title}
                </h4>
                <p className="font-poppins font-base text-[16px] text-gray-800">
                {props.degree}
                </p>
            </div>
            </div>
            
            <ul className="list-disc ml-5 space-y-3 mb-6">
                <li className="font-poppins font-normal text-[14px] text-gray-800">
                    {props.content1}
                </li>
                {props.content2 && (
                    <li className="font-poppins font-normal text-[14px] text-gray-800">
                        {props.content2}
                    </li>
                )}
            </ul>
        </div>

        <div className="mt-auto">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-secondary bg-secondary/10 rounded-full">
                {props.duration}
            </span>
        </div>
      </motion.div>
    );
  };

const SkillsAndExperience = () => {
  return (
    <section id="skills" className="mb-12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Experience Column */}
          <div>
            <h2 className={`${styles.heading2} mb-10`}>Experience</h2>
            <div className="flex flex-col gap-6">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} index={index} {...exp} />
                ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h2 className={`${styles.heading2} mb-10`}>Education</h2>
             <div className="flex flex-col gap-6">
                {educationList.map((edu, index) => (
                    <EducationCard key={index} index={index} {...edu} />
                ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default SkillsAndExperience;
