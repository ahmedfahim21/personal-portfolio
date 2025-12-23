import styles from "../style";
import Lottie from "react-lottie-player";
import animationData from "../lotties/person-coding.json";
import { aboutMe } from "../constants";
import { motion } from "framer-motion";

// lottie config
const defaultOptions = {
  loop: true,
  play: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY} min-h-screen relative bg-white overflow-hidden max-w-7xl mx-auto`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 relative z-10 justify-center h-full pt-20 md:pt-10`}
      >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <h1 className="font-poppins font-bold ss:text-[66px] text-[48px] text-primary ss:leading-[100px] leading-[75px] mb-6">
                Hey, I am <br className="sm:block hidden" />
                <span className="text-secondary relative inline-block">
                    {aboutMe.name}
                    <svg className="absolute w-full h-[10px] -bottom-1 left-0 text-secondary opacity-30" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.49994 132.5 -1.49992 198 7.99996" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                </span>
            </h1>
            
            <p className={`max-w-[470px] font-serif text-2xl text-gray-700 font-medium italic`}>
                {aboutMe.tagLine}
            </p>
            <p className={`${styles.paragraph} max-w-[470px] mt-6 text-gray-500 text-[16px] leading-relaxed`}>
                {aboutMe.intro}
            </p>

        </motion.div>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-10`}
      >
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full h-full flex justify-center items-center"
        >
            {/* Abstract Background Shape */}
            <div className="absolute w-[70%] h-[70%] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            
            <div className="w-[90%] h-[90%] object-contain">
                <Lottie {...defaultOptions} />
            </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-20 w-full flex justify-center items-center z-10 hidden md:flex">
        <a href="#skills">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary/30 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
