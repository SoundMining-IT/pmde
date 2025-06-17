import React from "react";
import AnimatedButton from "../AnimatedButton";

interface PartnerProps {
  bannerImage: string;
  title: string;
  description: string;
  ctaText: string;
}

const Partner: React.FC<PartnerProps> = ({
  bannerImage,
  title,
  description,
  ctaText,
}) => {
  return (
    <section className="partner flex col ac jc">
      <div className="abs">
        <img src={bannerImage} alt="Banner" />
      </div>
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>{ctaText}</span>
        <div className="cta-button">
          <AnimatedButton href="/contact" text="Get In Touch" />
        </div>
      </div>
    </section>
  );
};

export default Partner;
