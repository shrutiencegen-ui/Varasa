import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import AboutSection from "../components/AboutSection/AboutSection";
import HeritageBanner from "../components/HeritageBanner/HeritageBanner";
import Footer from "../components/Footer/Footer";
import AboutMission from "../components/AboutMission/AboutMission";
import ProgramsSection from "../components/ProgramsSection/ProgramsSection";  

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <AboutMission/>
      
      <ProgramsSection />
      <HeritageBanner />
      <Footer />
    </>
  );
}
