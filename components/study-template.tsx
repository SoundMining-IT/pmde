import React from "react";
import Layout from "@/components/Layout";
import StudyHero from "./CaseStudies/StudyHero";
import AboutClient from "./CaseStudies/AboutClient";
import ChallengingEnvironment from "./CaseStudies/ChallengingEnvironment";
import OperationalContinuity from "./CaseStudies/OperationalContinuity";
import Geology, { CaseStudyTemplateProps } from "./CaseStudies/Geology";
import Outcome from "./CaseStudies/Outcome";
import Partner from "./CaseStudies/Partner";
import ProcessItemsComponent from "./ProcessItemsComponent";
import type { ProcessItemData } from "./ProcessItemsComponent";
import SeoMeta from "./SEO";

// Interface matching the exported data structure
export interface CaseStudyData {
  heroImage: string;
  heroTitle: string;
  heroIntroText: string;
  heroDescription: string;

  clientImage: string;
  clientTitle: string;
  clientDescription: string;

  challengePreText: string;
  challengeHighlightedText: string;
  challengePostText: string;

  operationalTitle: string;
  operationalConcerns: Array<{
    iconSrc: string;
    title: string;
    description: string;
  }>;
  operationalConclusion: string;

  geologyImage: string;
  geologyTitle: string;
  geologySubtitle: string;
  geologyHeading: string;
  geologyDescription: string;

  processItems: ProcessItemData[];

  outcomeTitle: string;
  outcomeSubtitle: string;
  outcomeListTitle: string;
  outcomeListItems: string[];
  outcomeRightSectionImage: string;

  partnerBannerImage: string;
  partnerTitle: string;
  partnerDescription: string;
  partnerCtaText: string;
}

const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({ data }) => {
  const pageTitle = "Case Study";
  const pageDescription = "";
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
      <StudyHero
        heroImage={data.heroImage}
        title={data.heroTitle}
        introText={data.heroIntroText}
        description={data.heroDescription}
      />

      {/* <AboutClient
        image={data.clientImage}
        title={data.clientTitle}
        description={data.clientDescription}
      /> */}

      <ChallengingEnvironment
        preText={data.challengePreText}
        highlightedText={data.challengeHighlightedText}
        postText={data.challengePostText}
      />

      <OperationalContinuity
        title={data.operationalTitle}
        concerns={data.operationalConcerns}
        conclusionText={data.operationalConclusion}
      />

      <Geology
        image={data.geologyImage}
        title={data.geologyTitle}
        subtitle={data.geologySubtitle}
        heading={data.geologyHeading}
        description={data.geologyDescription}
        data={data}
      />

      <Outcome
        title={data.outcomeTitle}
        subtitle={data.outcomeSubtitle}
        listTitle={data.outcomeListTitle}
        listItems={data.outcomeListItems}
        rightSectionImage={data.outcomeRightSectionImage}
      />

      <Partner
        bannerImage={data.partnerBannerImage}
        title={data.partnerTitle}
        description={data.partnerDescription}
        ctaText={data.partnerCtaText}
      />
    </Layout>
  );
};

export default CaseStudyTemplate;
