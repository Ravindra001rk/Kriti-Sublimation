import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import WhyChoose from "../Components/Home/WhyChoose";
import FeatureProducts from "../Components/Home/FeatureProducts";
import StackTabScroll from "../Components/Stacktabscroll";
import UnderDevelopment from "../Components/Underdevelopment";
import UGCHero from "../Components/Home/Ugchero";

const Home = () => {
  return (
    <div className="w-full bg-brandBg  md:pt-10 pt-7">
      <HeroSection />
      <WhyChoose />
      <FeatureProducts />
      <StackTabScroll />
      <UGCHero/>
      {/* <UnderDevelopment /> */}
    </div>
  );
};

export default Home;
