import React from "react";

interface AboutClientProps {
  image: string;
  title: string;
  description: string;
}

const AboutClient: React.FC<AboutClientProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <section className="about-client flex col ac jc">
      <div className="content flex row ac jc">
        <div className="rel-image">
          <img src={image} alt="Client" />
        </div>
        <div className="flex col al jc" id="client-info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutClient;
