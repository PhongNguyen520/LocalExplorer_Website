import React from "react";
import Header from "../components/Home/Header";
import HeroSection from "../components/Home/HeroSection";
import CallToActionSection from "../components/Home/CallToActionSection";
import Footer from "../components/Home/Footer";
import FeaturesSection from "../components/Home/FeaturesSection";
import DestinationsSection from "../components/Home/DestinationsSection";
import BusinessSection from "../components/Home/BusinessSection";

const Home = () => {
  return (
     <div className="bg-white text-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <BusinessSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Home;
