// StandardTabContent.tsx
import React, { useState, useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton"; // MAKE SURE this path is correct

// Type for the individual sub-items (icons/labels)
type TabItem = {
  inactiveIcon: string;
  activeIcon: string;
  label: string;
};

// Type for the props this component receives (matching the data structure)
type StandardTabContentProps = {
  logoTitle?: string;
  image: string;
  altText: string;
  heading: string;
  p1Strong?: string;
  p1Regular: string;
  subHeading?: string;
  items?: TabItem[];
  extraImage?: string; // Add this
  ctaText: string;
  ctaHref: string;
};

const StandardTabContent: React.FC<StandardTabContentProps> = ({
  logoTitle,
  image,
  altText,
  heading,
  p1Strong,
  p1Regular,
  subHeading,
  extraImage,
  items = [], // Default to empty array to prevent errors
  ctaText,
  ctaHref,
}) => {
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Start unpaused for auto-rotation
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start or restart the rotation timer
  const startRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Don't rotate if 0 or 1 item, or if paused
    if (items.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      // We only advance if it's not paused when the interval fires
      // Using functional update is safer if state updates could be rapid,
      // but checking isPaused directly here is fine for this interval logic.
      if (!isPaused) {
        setActiveIconIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    }, 3000);
  };

  // Effect to manage the rotation timer based on items and pause state
  useEffect(() => {
    startRotation(); // Attempt to start rotation initially and whenever dependencies change

    // Cleanup function to clear interval when component unmounts
    // or when dependencies (items.length, isPaused) change before next effect run
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [items.length, isPaused]); // Rerun effect if item count changes or pause state changes

  // Effect to reset index and pause state when the items array itself changes (e.g., switching main tabs)
  useEffect(() => {
    setActiveIconIndex(0);
    setIsPaused(false); // Reset to unpaused when items change
    // The main effect [items.length, isPaused] will handle restarting the timer
  }, [items]); // Dependency is the items array instance

  // Event Handlers for Subtab Interaction
  const handleMouseEnter = (index: number) => {
    setActiveIconIndex(index);
    setIsPaused(true); // Pause rotation on hover
  };

  const handleMouseLeave = () => {
    setIsPaused(false); // Resume rotation on leave
    // The main effect handles restarting the timer when isPaused becomes false
  };

  const handleClick = (index: number) => {
    setActiveIconIndex(index);
    setIsPaused(true); // Keep paused on click (or optionally resume after timeout)
    // Example: Resume after 5 seconds
    // setTimeout(() => {
    //   setIsPaused(false);
    // }, 5000);
  };

  return (
    <div className="tab-layout">
      {" "}
      {/* Keep original class names for styling */}
      <div className="left-section flex col ac jc">
        {logoTitle && <h2 id="logo-title">{logoTitle}</h2>}
        <img src={image} alt={altText} />
      </div>
      <div className="right-section">
        <div className="right-down">
          <h2>
            <strong>{heading}</strong>
          </h2>
          <div className="right-double">
            {p1Strong && (
              <p style={{ paddingBottom: "20px" }}>
                <strong>{p1Strong}</strong>
              </p>
            )}
            <p>{p1Regular}</p>
          </div>
        </div>
        <h3 style={{ paddingTop: "20px", color: "var(--color3)" }}>
          <strong>{subHeading}</strong>
        </h3>

        {/* Render subtabs container only if there are items */}
        {items && items.length > 0 ? (
          <div className="subtabs-container">
            {items.map((subTab, index) => (
              <div
                key={`${subTab.label}-${index}`}
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
                          ? subTab.activeIcon
                          : subTab.inactiveIcon
                      }
                      alt={subTab.label}
                      className="subtab-icon"
                    />
                  </div>
                  <span className="subtab-label">{subTab.label}</span>
                </div>
              </div>
            ))}
          </div>
        ) : extraImage ? (
          <div className="extra-image-container">
            <img src={extraImage} alt="Valuations Supplementary Visual" />
          </div>
        ) : null}

        <div className="cta-button-container">
          {/* Render the button component directly */}
          <AnimatedButton text={ctaText} href={ctaHref} />
        </div>
      </div>
    </div>
  );
};

export default StandardTabContent;
