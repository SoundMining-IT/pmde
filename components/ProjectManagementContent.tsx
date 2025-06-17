// ProjectManagementContent.tsx
import React, { useState, useEffect, useRef } from "react";

// Type for the icon items
type TabItem = {
  inactiveIcon: string;
  activeIcon: string;
  label: string;
};

// Props matching the data structure for this type
type ProjectManagementContentProps = {
  title: string;
  subtitle: string;
  p1Strong: string;
  p1Regular: string;
  items: TabItem[];
};

const ProjectManagementContent: React.FC<ProjectManagementContentProps> = ({
  title,
  subtitle,
  p1Strong,
  p1Regular,
  items = [], // Default to empty array
}) => {
  // --- Icon Rotation Logic ---
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Start unpaused
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (items.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      // Only advance if not paused
      if (!isPaused) {
        setActiveIconIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    }, 3000);
  };

  // Manage timer based on items count and pause state
  useEffect(() => {
    startRotation();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, isPaused]);

  // Reset index/pause state when items array instance changes
  useEffect(() => {
    setActiveIconIndex(0);
    setIsPaused(false);
  }, [items]);

  // Event Handlers
  const handleMouseEnter = (index: number) => {
    setActiveIconIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleClick = (index: number) => {
    setActiveIconIndex(index);
    setIsPaused(true); // Keep paused on click
    // Optional: Resume after delay
    // setTimeout(() => setIsPaused(false), 3000);
  };
  // --- End Icon Rotation Logic ---

  return (
    // Use class names from the original injected HTML for styling consistency
    <div className="project-management-container">
      <h2 className="project-title">{title}</h2>
      <h3 className="project-subtitle">{subtitle}</h3>
      <div className="project-content">
        {/* Assuming left/right structure from original HTML */}
        <div className="left-text">
          <p>
            <strong>{p1Strong}</strong>
          </p>
        </div>
        <div className="right-text">
          <p>{p1Regular}</p>
        </div>
      </div>

      {/* Render rotating icons if items exist */}
      {items.length > 0 && (
        <div className="subtabs-container" style={{ paddingTop: "30px" }}>
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`} // More stable key if possible
              className={`subtab-item ${
                index === activeIconIndex ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              <div className="subtab-content">
                <div className="icon-container">
                  <img
                    src={
                      index === activeIconIndex
                        ? item.activeIcon
                        : item.inactiveIcon
                    }
                    alt={item.label}
                    className="subtab-icon"
                  />
                </div>
                {/* Style from original HTML */}
                <span className="subtab-label" style={{ color: "black" }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManagementContent;
