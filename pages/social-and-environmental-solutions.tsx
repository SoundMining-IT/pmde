import AnimatedButton from "@/components/AnimatedButton";
import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import SeoMeta from "@/components/SEO";
import TabsWithFlipCards from "@/components/TabsWithFlipCards";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import { EnvironmentData } from "@/data/TabsData";
import React from "react";

const SocialAnndEnvironmentalSolutions = () => {
  const pageTitle = "Social and Environmental Solutions";
  const pageDescription =
    "Support responsible development with tailored ESG, environmental, and social solutions. Learn how we help manage risk, impact, and stakeholder outcomes.";
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
      <div id="social-hero">
        <Hero
          // middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack5.webp"
          foregroundImage="/updatedImages/HeroFront5.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={5}
          textAlign="left"
          title="Make Your Mining Operations More Sustainable"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          textPosition="top-left"
          description="Social & Environmental Solutions"
          contentScrollDirectionX="left"
          contentScrollDirectionY="none"
        />
        <HeroMobile
          title="Make Your Mining Operations More Sustainable"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          description="Social & Environmental Solutions"
          backgroundImage="/images/SocialBKG.jpg"
        />
        <div id="bottom-icon">
          <img src="/images/PMDEIcon.svg" alt="Arch" />
        </div>
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc advisory-tabs"
        id="solutions-container"
      >
        <div className="section-label">
          <h1>Social and Environmental Solutions</h1>
        </div>
        <TabsWithFlipCards tabs={EnvironmentData} />
        <div className="cta-button flex col al jc env-button">
          <AnimatedButton href="/contact" text="Speak to an Expert" />
        </div>
      </section>

      {/* <AnimatedStatsSection /> */}
    </Layout>
  );
};

export default SocialAnndEnvironmentalSolutions;
