import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { CorporateAdvisorytabs } from "@/data/TabsData";
import React, { useEffect } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import AnimatedStatsSection from "@/components/TestimonialSection";
import StandardTabsComponent from "@/components/StandardTabComponent";
import { CorporateAdvisoryTabData } from "@/data/CorporateAdvisoryData";
import SeoMeta from "@/components/SEO";
import HeroMobile from "@/components/MobileHero";

const CorporateAdvisory = () => {
  const pageTitle = "Corporate Advisory";
  const pageDescription =
    "Independent technical reviews, valuations, and due diligence for the minerals industry. Get started with strategic advisory that drives confident decisions.";
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
      <div id="corporate-advisory-hero-container">
        <Hero
          // middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack9.webp"
          foregroundImage="/updatedImages/HeroFront11.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={5}
          textAlign="left"
          title="Make your next minerals investment with confidence"
          subtitle="Independent corporate advisory for the financing and development of minerals assets."
          description="Corporate Advisory"
          textPosition="top-left"
        />
        <HeroMobile
          title="Make your next minerals investment with confidence"
          subtitle="Independent corporate advisory for the financing and development of minerals assets."
          description="Corporate Advisory"
          backgroundImage="/newImages/Hero3Mobile.webp"
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
        <div className="section-label" style={{ paddingBottom: "50px" }}>
          <h1>Advisory Services</h1>
        </div>
        <div className="corp-tabs">
          <StandardTabsComponent
            tabs={CorporateAdvisorytabs}
            tabContents={CorporateAdvisoryTabData}
          />
        </div>
      </section>

      {/* <AnimatedStatsSection /> */}
    </Layout>
  );
};

export default CorporateAdvisory;
