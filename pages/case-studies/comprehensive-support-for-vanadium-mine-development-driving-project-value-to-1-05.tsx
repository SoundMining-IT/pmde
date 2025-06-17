import React from "react";
import { VanadiumCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Vanadium = () => {
  return (
    <>
      <CaseStudyTemplate data={VanadiumCaseStudyData} />
    </>
  );
};

export default Vanadium;
