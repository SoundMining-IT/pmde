import React from "react";
import { CoalCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Coal = () => {
  return (
    <>
      <CaseStudyTemplate data={CoalCaseStudyData} />
    </>
  );
};

export default Coal;
