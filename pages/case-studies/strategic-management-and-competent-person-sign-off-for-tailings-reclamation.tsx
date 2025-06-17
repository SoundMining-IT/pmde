import React from "react";
import { TailingsCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Tailings = () => {
  return (
    <>
      <CaseStudyTemplate data={TailingsCaseStudyData} />
    </>
  );
};

export default Tailings;
