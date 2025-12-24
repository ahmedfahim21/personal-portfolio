import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from '@vercel/analytics/react';

import styles from "./style";
import {
  Navbar,
  Hero,
  SkillsAndExperience,
  Footer,
  OpenSource,
  Projects,
  Loading,
  Achievements,
} from "./components";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    // A div to wrap the entire application
    <div className="bg-white w-full overflow-hidden">
      <Analytics />
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.section
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.5 }}
          >
            <Navbar />

            <div className={`bg-white ${styles.flexStart} pt-[80px]`}>
              <div className={`${styles.boxWidth}`}>
                <Hero />
              </div>
            </div>

            <div
              className={`bg-white ${styles.flexCenter} ${styles.paddingX} max-w-7xl mx-auto`}
            >
              <div className={`${styles.boxWidth}`}>
                <SkillsAndExperience />
              </div>
            </div>
            <Projects />
            <div
              className={`bg-white ${styles.flexCenter} ${styles.paddingX}`}
            >
              <div className={`${styles.boxWidth}`}>
                <Achievements />
                <OpenSource />
              </div>
            </div>
            <Footer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
