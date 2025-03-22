const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2:
    "font-poppins font-semibold xs:text-[44px] text-[36px] text-[#1a1a1a] xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph:
    "font-poppins font-normal text-[#4a5568] text-[14px] md:text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",
  flexEnd: "flex md:justify-end items-center",
  flexBetween: "flex justify-between items-center",
  flexAround: "flex justify-around items-center",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  // New utility classes
  glassEffect: "bg-white border border-[#163269]/10",
  hoverEffect: "transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg",
  gradientText: "bg-gradient-to-r from-[#50bd77] to-[#163269] bg-clip-text text-transparent",
  sectionSpacing: "py-16 md:py-24",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  sectionImgReverseEnd: `flex-1 flex ${styles.flexEnd} md:mr-12 ml-4 mb-4 md:mb-0 md:mt-0 mt-10 relative`,
  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  
  // New layout classes
  gridLayout: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  cardLayout: "flex flex-col space-y-4",
  listLayout: "space-y-4",
};

export default styles;
