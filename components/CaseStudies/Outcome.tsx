import React from "react";

interface OutcomeProps {
  title: string;
  subtitle: string;
  listTitle: string;
  listItems: string[];
  rightSectionImage: string;
}

const Outcome: React.FC<OutcomeProps> = ({
  title,
  subtitle,
  listTitle,
  listItems,
  rightSectionImage,
}) => {
  return (
    <section className="outcome flex row ac jc">
      <div className="left-section flex col al jc">
        <div className="content">
          <h2>{title}</h2>
          <span>{subtitle}</span>
          <div className="list">
            <h2>{listTitle}</h2>
            <ul>
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className="right-section"
        style={{ backgroundImage: `url(${rightSectionImage})` }}
      ></div>
    </section>
  );
};

export default Outcome;
