// SimpleTextContent.tsx
import React from "react";

// Props matching the structured data
type SimpleTextContentProps = {
  title: string;
  subtitle?: string; // Optional
  p1Strong?: string; // Optional
  p1Regular?: string; // Optional
};

const SimpleTextContent: React.FC<SimpleTextContentProps> = ({
  title,
  subtitle,
  p1Strong,
  p1Regular,
}) => {
  // Use class names from the original injected HTML for styling consistency
  return (
    <div className="people-tab-container">
      {" "}
      {/* Or a more generic class if preferred */}
      <h1 className="project-title">{title}</h1>
      {/* Render subtitle only if it exists and is not empty */}
      {subtitle && <h2 className="project-subtitle">{subtitle}</h2>}
      <div className="project-content">
        {/* Render left text (strong) only if it exists */}
        {p1Strong && (
          <div className="left-text">
            <p>
              <strong>{p1Strong}</strong>
            </p>
          </div>
        )}
        {/* Render right text (regular) only if it exists */}
        {/* Adjust layout class if needed based on whether p1Strong exists */}
        {p1Regular && (
          <div className={p1Strong ? "right-text" : "left-text"}>
            <p>{p1Regular}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleTextContent;
