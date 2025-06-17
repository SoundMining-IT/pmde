// InfrastructureContent.tsx
import React from "react";
import InfrastructureCarousel from "./InfrastructureCarousel"; // Assuming path is correct

// Props matching the data structure for this type
type InfrastructureContentProps = {
  title: string;
  subtitle: string;
  descriptionStrong: string;
};

const InfrastructureContent: React.FC<InfrastructureContentProps> = ({
  title,
  subtitle,
  descriptionStrong,
}) => {
  // No MutationObserver needed - Carousel interaction should be self-contained or handled via props if necessary

  return (
    // Structure matching the original component's specific rendering
    <>
      <h1 className="project-title ">{title}</h1>
      <h3 className="project-subtitle ">{subtitle}</h3>
      <InfrastructureCarousel />
      <div className="project-content">
        {/* Removed empty span from original */}
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
        {/* Add right-text div if needed */}
      </div>
    </>
  );
};

export default InfrastructureContent;
