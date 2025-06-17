import React from "react";

interface ChallengingEnvironmentProps {
  preText: string;
  highlightedText: string;
  postText: string;
}

const ChallengingEnvironment: React.FC<ChallengingEnvironmentProps> = ({
  preText,
  highlightedText,
  postText,
}) => {
  return (
    <section className="challenging-environment flex col ac jc">
      <div className="content">
        <h1>
          {preText} <br />
          <span>{highlightedText}</span> {postText}
        </h1>
      </div>
    </section>
  );
};

export default ChallengingEnvironment;
