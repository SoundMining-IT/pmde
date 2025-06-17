// ProjectExecutionContent.tsx
import React from "react";
import FlipCardRow from "./ProjectFlipcardContainer"; // Assuming path is correct

// Props matching the data structure for this type
type ProjectExecutionContentProps = {
  title: string;
  subtitle: string;
  descriptionStrong: string;
};

const ProjectExecutionContent: React.FC<ProjectExecutionContentProps> = ({
  title,
  subtitle,
  descriptionStrong,
}) => {
  return (
    // Structure matching the original component's specific rendering
    <>
      <h1 className="project-title ">{title}</h1>
      <h3 className="project-subtitle ">{subtitle}</h3>
      {/* Layout from original component */}
      <div className="left-text">
        <p
          style={{
            // Style from original component
            color: "black",
            fontSize: "var(--text-medium)",
            maxWidth: "60%",
          }}
        >
          <strong>{descriptionStrong}</strong>
        </p>
      </div>
      <FlipCardRow />
    </>
  );
};

export default ProjectExecutionContent;
