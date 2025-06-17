import AnimatedButton from "@/components/AnimatedButton";
import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import PeopleTabsComponent from "@/components/PeopleExcellenceTabComponent";
import SeoMeta from "@/components/SEO";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import { PeopleExcellenceTabData } from "@/data/PeopleExcellenceData";
import { PeopleExellenceTabs } from "@/data/TabsData";
import React, { useEffect } from "react";

const PeopleExcellence = () => {
  const pageTitle = "People Excellence";
  const pageDescription =
    "Align talent with performance through workforce planning, skills development, and leadership strategies for resource and industrial sectors.";
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
      <div id="people-hero">
        <Hero
          // middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack6.webp"
          foregroundImage="/updatedImages/HeroFront6.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={5}
          contentScrollDirectionX="right"
          contentScrollDirectionY="none"
          textAlign="left"
          title="Empowering the Future of Mining"
          subtitle="Customised education and training programmes for industry excellence."
          description="People Excellence"
          textPosition="top-left"
        />
        <HeroMobile
          title="Empowering the Future of Mining"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          description="People Excellence"
          backgroundImage="/newImages/Hero7Mobile.webp"
        />
        <div id="bottom-icon">
          <img src="/images/PMDEIcon.svg" alt="Arch" />
        </div>
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc two-sided-tabs"
        id="solutions-container"
      >
        <div className="left-side"></div>
        <div className="right-side flex col al jc">
          <div className="content flex col al jc">
            <div className="section-label" style={{ paddingBottom: "50px" }}>
              <h1>People Excellence</h1>
            </div>
            {/* <TabsComponent
              tabContents={PeopleExcellenceTabContents}
              tabs={PeopleExellenceTabs}
            /> */}
            <PeopleTabsComponent
              tabs={PeopleExellenceTabs}
              tabContents={PeopleExcellenceTabData}
            />
            <div
              style={{ marginTop: "50px" }}
              className="cta-button flex col al jc"
            >
              <AnimatedButton href="/contact" text="Find out more" />
            </div>
            <div className="rock">
              <img src="/images/Loose rock 6.webp" />{" "}
            </div>
          </div>
        </div>
      </section>

      <AnimatedStatsSection />
    </Layout>
  );
};

export default PeopleExcellence;
