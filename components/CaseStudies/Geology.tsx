import React from "react";
import ProcessItemsComponent from "../ProcessItemsComponent";
import { CaseStudyData } from "../study-template";

interface GeologyProps {
  image: string;
  title: string;
  subtitle: string;
  heading: string;
  description: string;
  data?: CaseStudyData;
}

export interface CaseStudyTemplateProps {
  data: CaseStudyData;
}

const Geology: React.FC<GeologyProps & CaseStudyTemplateProps> = ({
  image,
  title,
  subtitle,
  heading,
  description,
  data,
}) => {
  return (
    <section className="geology flex col ac jc">
      <div className="content">
        <img src={image} alt="Geology" />
        <div className="flex col al jl" id="geology-wrapper">
          <h1>{title}</h1>
          <span>{subtitle}</span>
          <div className="row-content flex row al jl">
            <h2>{heading}</h2>
            <p>{description}</p>
          </div>
        </div>
        {data.processItems && data.processItems.length > 0 && (
          <ProcessItemsComponent
            cycleInterval={4000} // Or make this dynamic if needed
            mainTitle="The Process Involved" // Or make this dynamic if needed
            items={data.processItems}
          />
        )}
      </div>
    </section>
  );
};

export default Geology;
