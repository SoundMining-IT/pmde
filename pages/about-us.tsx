import Carousel from "@/components/Carousel";
import ChooseUsCarousel from "@/components/ChooseUsCarousel";
import AnimatedEstablishSection from "@/components/Establish";
import EstablishCarousel from "@/components/EstablishCarousel";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import MiningCarousel from "@/components/MiningCarousel";
import HeroMobile from "@/components/MobileHero";
import SeoMeta from "@/components/SEO";
import ServicesCarousel from "@/components/servicesCarousel";
import TeamCarousel from "@/components/TeamCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import Timeline from "@/components/Timeline";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

// Reusable animated heading component that animates every time it's in view
interface AnimatedHeadingProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const AnimatedHeading = ({ children, style }: AnimatedHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const headingVariants = {
    hidden: { y: 75, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 1,
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={headingVariants}
      style={style}
    >
      {children}
    </motion.h1>
  );
};

const About = () => {
  const pageTitle = "About Us";
  const pageDescription =
    "With decades of experience and global reach, we support the minerals industry through expert consulting and strategy. Find out how we deliver impact.";
  const pageImage = "/images/PMDELogo.jpg";
  const imageAlt = "PMDE Logo";
  return (
    <Layout>
      <SeoMeta
        title={pageTitle}
        description={pageDescription}
        ogImage={pageImage}
        ogImageAlt={imageAlt}
        siteName="PMDE"
      />
      <div id="about-us-hero-container">
        <Hero
          // middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack2.webp"
          // foregroundImage="/images/hispanic-female-inspector-talking-caucasian-male-land-development-manager.png"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="About Us"
          subtitle="Your global partners in mining excellence."
          textPosition="center"
        />
        <HeroMobile
          title="About Us"
          subtitle="Your global partners in mining excellence."
          backgroundImage="/newImages/Hero2Mobile.webp"
        />
        <div id="bottom-icon">
          <img src="/images/PMDEIcon.svg" alt="Arch" />
        </div>
      </div>

      <AnimatedEstablishSection />

      <section className="wide-screen-carousel" id="wide-screen-carousel-about">
        <EstablishCarousel />
      </section>

      <section className="team-section flex col ac jc">
        <div className="timeline-section flex col ac jc">
          <AnimatedHeading>Our Journey in Mining Excellence</AnimatedHeading>
          <Timeline />
        </div>
      </section>

      <section className="global-reach flex col ac jc">
        <AnimatedHeading>Our Global Reach</AnimatedHeading>
        <div className="map">
          <img src="/images/Group 1230.webp" alt="World Map" />
        </div>
      </section>

      <section className="choose-us flex col ac jc">
        <AnimatedHeading>Why choose us</AnimatedHeading>
        <ChooseUsCarousel />
      </section>

      {/* <AnimatedStatsSection /> */}
    </Layout>
  );
};

export default About;
