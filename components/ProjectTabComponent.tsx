// src/components/ProjectTabsComponent.tsx
import React from "react";

// Assuming these content components exist in the same directory or adjust paths
import ProjectManagementContent from "./ProjectManagementContent";
import InfrastructureContent from "./InfrastructureContent";
import ProjectExecutionContent from "./ProjectExecutionContent";

// Define types for the structured data (can be imported or defined here)
export type TabItem = {
  // Export if used elsewhere
  inactiveIcon: string;
  activeIcon: string;
  label: string;
};

export type TabContentData = {
  // Export if used elsewhere
  type: "projectManagement" | "infrastructure" | "projectExecution" | string; // Add known types
  items?: TabItem[]; // Optional, only for projectManagement type
  title: string;
  subtitle: string;
  p1Strong?: string; // Optional
  p1Regular?: string; // Optional
  descriptionStrong?: string; // Optional
  // Add other potential fields as needed
};

// Props for the main TabsComponent
type TabsProps = {
  tabs: string[];
  tabContents: { [key: string]: TabContentData };
  activeTab: number; // State is controlled by parent
  setActiveTab: (index: number) => void; // Function to update parent's state
};

const ProjectTabsComponent: React.FC<TabsProps> = ({
  tabs,
  tabContents,
  activeTab,
  setActiveTab,
}) => {
  const renderTabContent = () => {
    const currentTabName = tabs[activeTab];
    const contentData = tabContents[currentTabName];

    if (!contentData) {
      return <p>No content available for {currentTabName}.</p>;
    }

    // Use the 'type' field from the data to decide which component to render
    switch (contentData.type) {
      case "projectManagement":
        return <ProjectManagementContent {...(contentData as any)} />; // Cast if necessary
      case "infrastructure":
        return <InfrastructureContent {...(contentData as any)} />; // Cast if necessary
      case "projectExecution":
        return <ProjectExecutionContent {...(contentData as any)} />; // Cast if necessary
      default:
        console.warn(
          `Unknown tab content type: ${contentData.type} for tab ${currentTabName}`
        );
        return <p>Content format not recognized for {currentTabName}.</p>;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)} // Calls parent's state setter
          >
            <span>{tab}</span>
          </div>
        ))}
      </div>

      <div className="tabs-content">
        <div className="content-area">{renderTabContent()}</div>
      </div>
      {/* Add ONLY the necessary styles for the red underline and basic layout */}
      <style jsx>{`
        .tabs-container {
          width: 100%;
          /* Add other container styles as needed */
        }
        .tabs-header {
          display: flex;
          margin-bottom: 20px; /* Space between header and content */
        }
        .tab-item {
          padding: 10px 20px; /* Example padding */
          cursor: pointer;
          position: relative; /* For the ::after pseudo-element */
          color: #555; /* Example inactive color */
          transition: color 0.3s ease;
        }
        .tab-item:hover {
          color: #000; /* Example hover color */
        }
        .tab-item.active {
          color: black; /* Example active color (matches underline) */
          font-weight: bold;
        }
        .tab-item.active::after {
          content: "";
          position: absolute;
          bottom: -1px; /* To sit on top of the .tabs-header border-bottom */
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #990033; /* Your red underline color */
        }
        .tabs-content {
          /* Add styles for content area if needed */
          padding: 10px;
        }
        .content-area {
          /* Styles for the direct child of .tabs-content */
        }
      `}</style>
    </div>
  );
};

export default ProjectTabsComponent;
