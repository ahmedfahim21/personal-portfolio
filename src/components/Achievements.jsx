import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { BsLink45Deg } from "react-icons/bs";
import { achievements } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { TiNews } from "react-icons/ti";
import styles from "../style";

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardTotalWidth, setCardTotalWidth] = useState(0); // Added state for card width
  const containerRef = useRef(null); // Added ref

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const card = containerRef.current.querySelector('.achievement-card');
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
    if (currentIndex < achievements.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isNextDisabled = currentIndex >= achievements.length - 1;
  const isPrevDisabled = currentIndex === 0;

  return (
    <section
      className="bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden py-10 md:mt-10 relative"
      id="achievements"
    >
      <div className={` ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <h1 className={`${styles.heading2} text-center`}>
            Hackathons
          </h1>
        </div>
      </div>
      <div className={` ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth} overflow-hidden`}>
          <div className="my-20">
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * cardTotalWidth}px)`, // Updated to use card width
              }}
            >
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
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

const AchievementCard = (props) => {
  return (
    <div className="achievement-card flex-shrink-0 flex flex-col md:w-[400px] w-[320px] p-6 rounded-[20px] bg-white border border-gray-200 md:mr-10 mr-6 my-5 hover:border-secondary/50 transition-colors duration-300">
      <div className="flex flex-row items-center mb-4">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center bg-gray-50">
            <img
            src={props.icon}
            alt={props.event}
            className="w-full h-full object-cover"
            />
        </div>
        <div className="flex flex-col ml-4">
            <h3 className="font-poppins font-medium text-[18px] text-primary leading-[26px]">
            {props.event}
            </h3>
            <p className="font-poppins font-normal text-[14px] text-secondary">
            {props.position}
            </p>
        </div>
      </div>
      
      <div className="flex-1 mb-6">
        <ul className="space-y-2">
            {props.content1 && (
            <li className="font-poppins font-normal text-gray-600 text-[14px] flex items-start gap-2">
                <span className="text-secondary mt-1 text-[10px]">●</span>
                <span>{props.content1}</span>
            </li>
            )}
            {props.content2 && (
            <li className="font-poppins font-normal text-gray-600 text-[14px] flex items-start gap-2">
                <span className="text-secondary mt-1 text-[10px]">●</span>
                <span>{props.content2}</span>
            </li>
            )}
            {props.content3 && (
            <li className="font-poppins font-normal text-gray-600 text-[14px] flex items-start gap-2">
                <span className="text-secondary mt-1 text-[10px]">●</span>
                <span>{props.content3}</span>
            </li>
            )}
        </ul>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
        {props.article && (
          <a
            className="text-gray-500 hover:text-secondary transition-colors"
            href={props.article}
            target="_blank"
            rel="noopener noreferrer"
            title="Article"
          >
            <TiNews size="1.5rem" />
          </a>
        )}
        {props.youtube && (
          <a
            className="text-gray-500 hover:text-secondary transition-colors"
            href={props.youtube}
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
          >
            <FaYoutube size="1.5rem" />
          </a>
        )}
        {props.github && (
          <a
            className="text-gray-500 hover:text-secondary transition-colors"
            href={props.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <AiFillGithub size="1.5rem" />
          </a>
        )}
        {props.project && (
          <a
            className="text-gray-500 hover:text-secondary transition-colors"
            href={props.project}
            target="_blank"
            rel="noopener noreferrer"
            title="Project Link"
          >
            <BsLink45Deg size="1.5rem" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Achievements;
