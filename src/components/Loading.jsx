import styles from "../style";
import { motion } from "framer-motion";
import { fahim } from "../assets";

const Loading = () => {
  return (
    <motion.div
      id="loading"
      className={`w-full h-screen flex justify-center items-center bg-white relative overflow-hidden`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

      <div className="relative flex flex-col items-center justify-center gap-6">
        <div className="relative w-[100px] h-[100px] flex justify-center items-center">
            {/* Spinning Ring */}
            <motion.div 
                className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-secondary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Logo */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-white shadow-sm relative z-10"
            >
                <img src={fahim} alt="Fahim Ahmed" className="w-full h-full object-cover" />
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;
