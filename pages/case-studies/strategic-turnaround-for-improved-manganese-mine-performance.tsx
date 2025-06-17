import React from "react";
import { ManganeseCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Manganese = () => {
  return (
    <>
      <CaseStudyTemplate data={ManganeseCaseStudyData} />
    </>
  );
};

export default Manganese;
