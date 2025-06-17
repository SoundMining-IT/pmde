import CaseStudiesDemo from "@/components/CaseStudiesGrid";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import SeoMeta from "@/components/SEO";
import React from "react";

const insights = () => {
  const pageTitle = "Insights";
  const pageDescription =
    "Explore real-world case studies and project insights from across the resource sector. Learn how our team solves complex challenges through practical experience.";
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
      <div id="insights-hero-container">
        <Hero
          // middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack7.webp"
          // foregroundImage="/images/view-heavy-machinery-used-construction-industry-1.png"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={5}
          textAlign="left"
          title="Insights And Resources"
          subtitle="Gain Insights from real-world examples of how we've driven success accross projects."
          textPosition="top-left"
        />
        <HeroMobile
          title="Insights And Resources"
          subtitle="Gain Insights from real-world examples of how we've driven success accross projects."
          backgroundImage="/newImages/Hero8Mobile.webp"
        />
        <div id="bottom-icon">
          <img src="/images/PMDEIcon.svg" alt="Arch" />
        </div>
        <div className="case-studies flex col ac jc">
          <div className="case-studies-content-wrapper">
            <h1>Case Studies</h1>
            <CaseStudiesDemo />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default insights;
