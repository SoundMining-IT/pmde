import React from "react";

interface StudyHeroProps {
  heroImage: string;
  title: string;
  introText: string;
  description: string;
}

const StudyHero: React.FC<StudyHeroProps> = ({
  heroImage,
  title,
  introText,
  description,
}) => {
  return (
    <section className="study-hero flex col ac jc">
      <div className="content">
        <div className="abs">
          <img src={heroImage} alt="Hero" />
        </div>
        <h2>{title}</h2>
        <div className="flex row">
          <span>{introText}</span>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default StudyHero;
