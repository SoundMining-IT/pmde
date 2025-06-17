import React from "react";
import { EIACaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const EIA = () => {
  return (
    <>
      <CaseStudyTemplate data={EIACaseStudyData} />
    </>
  );
};

export default EIA;
