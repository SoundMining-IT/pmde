import React from "react";
import { TunnelCaseStudyData } from "@/data/CaseStudyData";
import CaseStudyTemplate from "@/components/study-template";

const Tunnel = () => {
  return (
    <>
      <CaseStudyTemplate data={TunnelCaseStudyData} />
    </>
  );
};

export default Tunnel;
