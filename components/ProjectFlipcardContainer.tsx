import React from "react";
import FlipCard from "@/components/FlipCard"; // adjust if needed

const flipCards = [
  {
    frontImage: "/images/Project1.webp",
    frontText: "Construction and Deconstruction",
    backText:
      "Our team ensures projects stay on track, within budget, and safe—from site preparation to facility establishment and deconstruction. We oversee every detail for seamless execution.",
  },
  {
    frontImage: "/images/Project2.webp",
    frontText: "Site Closure",
    backText:
      "We provide full site closure services, ensuring compliance and safe decommissioning. Our team restores sites to a stable condition, ready for future use and development.",
  },
  {
    frontImage: "/images/Project3.webp",
    frontText: "Rehabilitation",
    backText:
      "Our rehabilitation services restore environments through soil stabilisation, re-vegetation, and long-term monitoring, ensuring ecological recovery and compliance with environmental and sustainability standards.",
  },
  {
    frontImage: "/images/Project4.webp",
    frontText: "Environmental Management",
    backText:
      "We implement proactive environmental management through audits, compliance assessments, and tailored plans to monitor and mitigate mining impacts, safeguarding ecosystems throughout operations.",
  },
  {
    frontImage: "/images/Project5.webp",
    frontText: "Procurement",
    backText:
      "We manage procurement to ensure timely, cost-effective sourcing of materials, equipment, and services, maintaining quality, budget, and project specifications through strong supplier relationships.",
  },
];

const FlipCardRow = () => {
  return (
    <div
      className="flipcard-row"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "left",
        padding: "2rem 0rem",
        position: "relative",
        zIndex: 9999,
      }}
    >
      {flipCards.map((card, i) => (
        <FlipCard
          key={i}
          frontImage={card.frontImage}
          frontText={card.frontText}
          backText={card.backText}
        />
      ))}
    </div>
  );
};

export default FlipCardRow;
