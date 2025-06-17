import React from "react";
import { PlatinumCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Platinum = () => {
  return (
    <>
      <CaseStudyTemplate data={PlatinumCaseStudyData} />
    </>
  );
};

export default Platinum;
