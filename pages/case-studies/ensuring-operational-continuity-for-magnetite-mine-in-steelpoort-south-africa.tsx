import React from "react";
import { SteelpoortCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Steelpoort = () => {
  return (
    <>
      <CaseStudyTemplate data={SteelpoortCaseStudyData} />
    </>
  );
};

export default Steelpoort;
