// TabsComponent.tsx
import React, { useState } from "react";

// Import the specific content component we need for this data
import StandardTabContent from "./StandardTabContent"; // Make sure this path is correct

// Define the type definitions (as in your original code)
type TabItem = {
  inactiveIcon: string;
  activeIcon: string;
  label: string;
};

type TabContentData = {
  type: string;
  items?: TabItem[];
  logoTitle?: string;
  image: string;
  altText: string;
  heading: string;
  p1Strong?: string;
  p1Regular: string;
  subHeading?: string;
  ctaText: string;
  ctaHref: string;
  extraImage?: string; // ✅ Add this line
};

type TabsProps = {
  tabs: string[];
  tabContents: { [key: string]: TabContentData };
};

const StandardTabsComponent: React.FC<TabsProps> = ({ tabs, tabContents }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    const currentTabName = tabs[activeTab];
    const contentData = tabContents[currentTabName];

    if (!contentData) {
      return <p>No content available for {currentTabName}.</p>;
    }

    if (contentData.type === "standard") {
      return <StandardTabContent {...contentData} />;
    } else {
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
            onClick={() => setActiveTab(index)}
          >
            <span>{tab}</span>
          </div>
        ))}
      </div>
      <div className="tabs-content">
        <div className="content-area">{renderTabContent()}</div>
      </div>
      {/* Add ONLY the necessary styles for the red underline */}
      <style jsx>{`
        .tabs-header {
          /* Assuming this already has display: flex or similar from your existing styles */
          /* Add a general bottom border if you want the underline to sit on it */
          /* border-bottom: 1px solid #ccc; */
        }
        .tab-item {
          /* Assuming padding, cursor, etc., are already defined elsewhere or are default */
          position: relative; /* Crucial for the ::after pseudo-element */
          /* Add some bottom padding to the tab item itself if the underline feels too close to the text */
          /* padding-bottom: 5px; */ /* Example: adds 5px space below text before underline */
        }

        /* --- The Red Underline for the Active Tab --- */
        .tab-item.active::after {
          content: "";
          position: absolute;
          bottom: 0; /* Adjust if you added padding-bottom to .tab-item or have a header border */
          /* If .tabs-header has border-bottom: 1px solid #ccc;, use bottom: -1px; */
          left: 0;
          width: 100%;
          height: 3px; /* Thickness of the underline */
          background-color: var(--color5); /* Color of the underline */
        }

        /* Your existing styles for .tabs-container, .tabs-content, .content-area
           would remain if they are in a global stylesheet or another <style jsx> block.
           If they were in the previous example's <style jsx>, you'd keep them.
           For this minimal change, I'm only showing the essentials for the underline.
        */
      `}</style>
    </div>
  );
};

export default StandardTabsComponent;
