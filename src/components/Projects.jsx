import React from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";
import styles from "../style";

const Project = (props) => {
  return (
    <motion.div
      className="flex flex-col p-6 rounded-[20px] bg-white border border-gray-200 h-full hover:border-secondary/50 transition-colors duration-300"
      whileInView={{ y: [20, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-start mb-4">
        <div className="w-[60px] h-[60px] rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
             <img
              className="w-full h-full object-cover"
              src={props.image}
              alt={props.title}
            />
        </div>

        <div className="flex flex-col ml-4 flex-1">
          <h3 className="font-poppins font-medium text-[20px] text-primary leading-[30px]">
            {props.title}
          </h3>
          
          <div className="flex flex-wrap gap-3 mt-2">
              {props.stack.map((tech, index) => (
                <div
                  key={tech.id}
                  className="relative group text-gray-500 hover:text-secondary transition-colors text-[20px] cursor-pointer"
                >
                  {React.createElement(tech.icon)}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
        </div>
      </div>

      <p className="font-poppins font-normal text-[14px] text-gray-600 mb-6 flex-1 leading-relaxed">
        {props.content}
      </p>

      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 mt-auto">
        {props.github && (
          <a 
            href={props.github} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-poppins font-normal text-[14px] text-gray-600 hover:text-secondary transition-colors"
          >
            <AiFillGithub size="1.5rem" />
            <span>Code</span>
          </a>
        )}
        {props.link && (
          <a 
            href={props.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-poppins font-normal text-[14px] text-gray-600 hover:text-secondary transition-colors"
          >
            <BsLink45Deg size="1.5rem" />
            <span>Link</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects">
      <h1 className={`${styles.heading2} text-center pt-10`}>
        Projects
      </h1>

      <div className="container px-2 py-10 mx-auto mb-8">
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <Project key={project.id} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
