import { lazy } from "react";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection/HeroSection"));
const AboutUs = lazy(() => import("../components/AboutUs/AboutUs"));
const Portfolio = lazy(() => import("../components/Portfolio/Portfolio"));
const ContactUs = lazy(() => import("../components/ContactUs/ContactUs"));
const Footer = lazy(() => import("../components/Footer/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Portfolio />
      <ContactUs />
      <Footer />
    </>
  );
}
