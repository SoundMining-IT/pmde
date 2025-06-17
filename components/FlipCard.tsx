import React from "react";

type FlipCardProps = {
  frontImage: string;
  frontText: string;
  backText: string;
};

const FlipCard: React.FC<FlipCardProps> = ({
  frontImage,
  frontText,
  backText,
}) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div
          className="flip-card-front"
          style={{ backgroundImage: `url(${frontImage})` }}
        >
          <div className="overlay"></div>
          <span className="front-text">{frontText}</span>
        </div>
        <div className="flip-card-back">
          {/* <h2>{frontText}</h2> */}
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
