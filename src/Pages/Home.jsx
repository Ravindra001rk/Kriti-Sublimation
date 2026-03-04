import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import WhyChoose from "../Components/Home/WhyChoose";
import FeatureProducts from "../Components/Home/FeatureProducts";
import TwoDcard from "../Components/Home/TwoDcard";

const Home = () => {
  return (
    <div className="w-full bg-brandBg  pt-16">
      <HeroSection/>
      <WhyChoose/>
      <FeatureProducts/>
      {/* <TwoDcard/> */}
    </div>
  );
};

export default Home;