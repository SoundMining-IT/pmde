import React from "react";

interface ConcernItem {
  iconSrc: string;
  title: string;
  description: string;
}

interface OperationalContinuityProps {
  title: string;
  concerns: ConcernItem[];
  conclusionText: string;
}

const OperationalContinuity: React.FC<OperationalContinuityProps> = ({
  title,
  concerns,
  conclusionText,
}) => {
  return (
    <section className="operational-continuity flex col ac jc">
      <div className="content">
        <h2>{title}</h2>
        <div className="concerns">
          {concerns.map((concern, index) => (
            <div key={index} className="col-item flex col al jl">
              <img src={concern.iconSrc} alt={`Concern ${index + 1}`} />
              <span>{concern.title}</span>
              <p>{concern.description}</p>
            </div>
          ))}
        </div>
        <h2 className="bottom-text">{conclusionText}</h2>
      </div>
    </section>
  );
};

export default OperationalContinuity;
