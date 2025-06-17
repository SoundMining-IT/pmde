import React from "react";
import { DrillholeCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Drillhole = () => {
  return (
    <>
      <CaseStudyTemplate data={DrillholeCaseStudyData} />
    </>
  );
};

export default Drillhole;
