import React, { useState, useEffect, useRef } from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";
import styles from "../style";

const Project = (props) => {
  return (
    <motion.div
      className="project-card flex-shrink-0 flex flex-col md:w-[400px] w-[320px] p-6 rounded-[20px] bg-white border border-gray-200 md:mr-10 mr-6 my-5 hover:border-secondary/50 transition-colors duration-300"
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardTotalWidth, setCardTotalWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const card = containerRef.current.querySelector('.project-card');
        if (card) {
          const cardWidth = card.offsetWidth;
          const cardMargin = parseInt(window.getComputedStyle(card).marginRight, 10); 

          setCardTotalWidth(cardWidth + cardMargin); 
        }
      }
    };

    updateCardWidth(); 
    window.addEventListener("resize", updateCardWidth); 

    return () => {
      window.removeEventListener("resize", updateCardWidth); 
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50; 
    
    if (dragOffset < -threshold && currentIndex < projects.length - 1) {
        setCurrentIndex(prev => prev + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
    }
    
    setDragOffset(0);
  };
  
  const handleMouseLeave = () => {
      if (isDragging) handleMouseUp();
  };

  const isNextDisabled = currentIndex >= projects.length - 1;
  const isPrevDisabled = currentIndex === 0;

  return (
    <section
      className="bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden py-10 md:mt-10 relative"
      id="projects"
    >
      <div className={` ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <h1 className={`${styles.heading2} text-center`}>
            Projects
          </h1>
        </div>
      </div>
      <div className={` ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth} overflow-hidden`}>
          <div className="my-20">
            <div
              ref={containerRef}
              className="flex"
              style={{
                transform: `translateX(calc(-${currentIndex * cardTotalWidth}px + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {projects.map((project, index) => (
                <Project key={project.id} index={index} {...project} />
              ))}
            </div>
            <div className="flex justify-end mb-4 gap-2">
              <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className="w-10 h-10 rounded-full border border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-secondary transition-all duration-300"
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="w-10 h-10 rounded-full border border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-secondary transition-all duration-300"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
