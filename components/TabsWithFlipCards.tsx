import React, { useState } from "react";
import FlipCard from "./FlipCard";

type TabData = {
  title: string;
  description: string;
  subtitle?: string;
  items: { frontImage: string; frontText: string; backText: string }[];
};

type TabsWithFlipCardsProps = {
  tabs: TabData[];
};

const TabsWithFlipCards: React.FC<TabsWithFlipCardsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-flipcards-container" id="env-tabs">
      {/* Tabs Header */}
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        <h2>{tabs[activeTab].title}</h2>
        {/* Conditionally render the subtitle if it exists */}
        {tabs[activeTab].subtitle && (
          <h3 className="tab-subtitle">{tabs[activeTab].subtitle}</h3>
        )}
        <p>{tabs[activeTab].description}</p>

        {/* FlipCard Items */}
        <div className="flipcard-container">
          {tabs[activeTab].items.map((item, index) => (
            <FlipCard
              key={index}
              frontImage={item.frontImage}
              frontText={item.frontText}
              backText={item.backText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsWithFlipCards;
