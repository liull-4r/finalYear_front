// import AboutPart from "../components/AboutPart/AboutPart";
import HeroSection from "../components/HeroSection/HeroSection";
import Values from "../components/Values/Values";
import BackToTopButton from "../components/BackToTop/BackToTop";
import ApplyNow from "../components/ApplyNow/ApplyNow";
// import ThemeProvider from "../../theme";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AboutPart from "../components/AboutPart/AboutPart";
// import SubNewsletter from "../components/SubNewsletter/SubNewsletter";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      
      <HeroSection />
      <AboutPart />
      <ApplyNow />
      <Values />
      {/* <WhySection /> */}
      {/* <Videosection /> */}
      {/* <Faq /> */}
      {/* <Contact /> */}
      <BackToTopButton />
    </>
  );
}

export default Home;
