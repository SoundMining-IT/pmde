// TabsComponent.tsx
import React, { useState } from "react";

// Import the content component needed
import SimpleTextContent from "./SimpleTextContent"; // Make sure this path is correct

// Define the structure expected in the tabContents prop for this use case
type TabContentData = {
  type: "simpleText" | string; // Expecting 'simpleText' or handle others
  title: string;
  subtitle?: string;
  p1Strong?: string;
  p1Regular?: string;
  // Add other potential fields if this component needs to be more generic later
};

// Props for the main TabsComponent
type TabsProps = {
  tabs: string[]; // e.g., ["Tutoring and Mentorship", ...]
  // Expects the structured data object keyed by tab name
  tabContents: { [key: string]: TabContentData };
};

const PeopleTabsComponent: React.FC<TabsProps> = ({ tabs, tabContents }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Function to render the correct content component
  const renderTabContent = () => {
    const currentTabName = tabs[activeTab];
    const contentData = tabContents[currentTabName];

    if (!contentData) {
      return <p>No content available for {currentTabName}.</p>;
    }

    // Render based on the 'type' field
    switch (contentData.type) {
      case "simpleText":
        // Pass the data object as props to the SimpleTextContent component
        return <SimpleTextContent {...contentData} />;
      default:
        console.warn(
          `Unsupported tab content type: ${contentData.type} for tab ${currentTabName}`
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
        /* Assuming .tabs-header, .tab-item, .tabs-content, .content-area 
           have their primary styles defined elsewhere (e.g., global CSS or another component).
           If not, you'd add them here (e.g., .tabs-header { display: flex; })
        */

        .tab-item {
          /* Ensure tab-item is a block or inline-block for proper width calculation 
             and that it can be a positioning context. 
             Its existing display/padding styles from your global CSS will apply.
          */
          position: relative; /* Crucial for the ::after pseudo-element */
          cursor: pointer; /* Good practice for clickable items */
          /* Add bottom padding if the underline feels too close to the text, e.g., padding-bottom: 5px; */
        }

        /* --- The Red Underline for the Active Tab --- */
        .tab-item.active::after {
          content: "";
          position: absolute;
          bottom: 0; /* Adjust if .tab-item has padding-bottom or .tabs-header has a border-bottom */
          /* e.g., if .tabs-header has border-bottom: 1px solid #ccc;, use bottom: -1px; */
          left: 0;
          width: 100%;
          height: 3px; /* Thickness of the underline */
          background-color: var(--color5); /* Color of the underline */
          /* Optional: add a transition for the underline appearing/disappearing */
          /* transition: width 0.3s ease-in-out; (if you want it to grow in) */
        }
      `}</style>
    </div>
  );
};

export default PeopleTabsComponent;
