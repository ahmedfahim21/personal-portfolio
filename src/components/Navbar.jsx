import { useState, useEffect } from "react";
import React from "react";
import { fahim } from "../assets";
import { navLinks } from "../constants";
import { scrollToSection } from "../lib/helperFunctions";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex justify-center fixed top-0 z-50 px-4 pt-6 pointer-events-none">
        <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`relative pointer-events-auto flex justify-between items-center sm:px-6 px-4 py-3 rounded-full transition-all duration-500 ${
            scrolled 
            ? "bg-white/70 backdrop-blur-xl shadow-lg border border-white/40 w-full max-w-4xl" 
            : "bg-transparent w-full max-w-7xl"
        }`}
        >
        {/* Logo */}
        <a 
            href="#home" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
            }}
        >
            <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:border-secondary transition-colors duration-300">
                <img
                src={fahim}
                alt="Fahim"
                className="w-full h-full object-cover"
                />
            </div>
            <span className={`font-bold text-lg font-mono tracking-wide ${scrolled ? "text-primary" : "text-primary"} group-hover:text-secondary transition-colors`}>
                Fahim Ahmed
            </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden justify-end items-center flex-1 gap-6">
            {navLinks.map((nav) => (
            <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[20px] relative group ${
                    scrolled ? "text-gray-600" : "text-gray-700"
                }`}
            >
                <a 
                    href={nav.link || "#"} 
                    target={nav.link ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300 ${nav.icon ? "w-10 h-10" : "px-4 h-10"}`}
                    title={nav.title}
                >
                    <span className={`group-hover:text-secondary transition-colors duration-300 ${nav.icon ? "" : "text-[16px] font-medium"}`}>
                        {nav.icon ? React.createElement(nav.icon) : nav.title}
                    </span>
                </a>
            </li>
            ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
            <div 
                className="w-[40px] h-[40px] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white shadow-sm transition-all duration-300 active:scale-95"
                onClick={() => setToggle(!toggle)}
            >
                {toggle ? (
                    <AiOutlineClose className="w-[20px] h-[20px] text-primary" />
                ) : (
                    <AiOutlineMenu className="w-[20px] h-[20px] text-primary" />
                )}
            </div>

        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {toggle && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -20, x: "-50%" }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9, y: -20, x: "-50%" }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    className="p-6 bg-white/90 backdrop-blur-xl border border-white/50 absolute top-full left-1/2 mt-2 min-w-[280px] rounded-2xl shadow-2xl z-50 origin-top"
                >
                    <ul className="list-none flex flex-col justify-end items-center flex-1 gap-4">
                        {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className="font-poppins font-medium cursor-pointer text-[16px] text-gray-600 hover:text-secondary w-full transition-colors flex items-center justify-center gap-2 group"
                        >
                            <a 
                                href={nav.link || "#"} 
                                target={nav.link ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-50"
                                onClick={() => setToggle(false)}
                            >
                                {nav.icon && (
                                    <span className="text-[20px] text-gray-500 group-hover:text-secondary transition-colors">
                                        {React.createElement(nav.icon)}
                                    </span>
                                )}
                                {nav.title}
                            </a>
                        </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
        </motion.nav>
    </div>
  );
};

export default Navbar;
