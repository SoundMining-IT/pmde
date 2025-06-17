import React from "react";
import { StabilityCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Stability = () => {
  return (
    <>
      <CaseStudyTemplate data={StabilityCaseStudyData} />
    </>
  );
};

export default Stability;
