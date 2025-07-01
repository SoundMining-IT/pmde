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
  extraImage?: string;
  ctaText: string;
  ctaHref: string;
};

const StandardTabContent: React.FC<StandardTabContentProps> = (props) => {
  // --- START: NEW LOGIC FOR INSTANT TRANSITIONS ---

  // 'activeContent' holds the data that is CURRENTLY visible on screen.
  // We initialize it with the first set of props the component receives.
  const [activeContent, setActiveContent] = useState(props);

  // 'fadeState' controls the CSS class for the fade animation ('fade-in' or 'fade-out').
  const [fadeState, setFadeState] = useState("fade-in");

  // This effect runs whenever the incoming props from the parent component change.
  useEffect(() => {
    // We check if the new props are different from the content we are currently showing.
    // 'heading' is a reliable property to check for a content change.
    if (props.heading !== activeContent.heading) {
      // 1. Start the fade-out animation.
      setFadeState("fade-out");

      // 2. Wait for the fade-out animation (300ms) to complete.
      const timer = setTimeout(() => {
        // 3. Once invisible, INSTANTLY update the content with the new props...
        setActiveContent(props);
        // 4. ...and immediately trigger the fade-in animation for the new content.
        setFadeState("fade-in");
      }, 300); // IMPORTANT: This duration must match your CSS transition time.

      // Cleanup function to clear the timeout if the component unmounts mid-transition.
      return () => clearTimeout(timer);
    }
  }, [props, activeContent.heading]); // This effect depends on the incoming props.

  // --- END: NEW LOGIC FOR INSTANT TRANSITIONS ---

  // --- Sub-item rotation logic (now uses 'activeContent' instead of 'props') ---
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // We now get the 'items' from our internal 'activeContent' state.
  const { items = [] } = activeContent;

  useEffect(() => {
    const startRotation = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (items.length <= 1 || isPaused) return;

      timerRef.current = setInterval(() => {
        if (!isPaused) {
          setActiveIconIndex((prevIndex) => (prevIndex + 1) % items.length);
        }
      }, 3000);
    };
    startRotation();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, isPaused]);

  // Effect to reset the sub-item carousel when the main content changes.
  useEffect(() => {
    setActiveIconIndex(0);
    setIsPaused(false);
  }, [items]);

  // Event Handlers for Subtab Interaction
  const handleMouseEnter = (index: number) => {
    setActiveIconIndex(index);
    setIsPaused(true);
  };
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  const handleClick = (index: number) => {
    setActiveIconIndex(index);
    setIsPaused(true);
  };

  // The entire component now renders based on 'activeContent'
  // and has the 'fadeState' class on its root element for animations.
  return (
    <div className={`tab-layout ${fadeState}`}>
      <div className="left-section flex col ac jc">
        {activeContent.logoTitle && (
          <h2 id="logo-title">{activeContent.logoTitle}</h2>
        )}
        {/* We add a 'key' here. This tells React it's a new element, ensuring a clean re-render. */}
        <img
          key={activeContent.image}
          src={activeContent.image}
          alt={activeContent.altText}
        />
      </div>

      <div className="right-section">
        <div className="right-down">
          <h2>
            <strong>{activeContent.heading}</strong>
          </h2>
          <div className="right-double">
            {activeContent.p1Strong && (
              <p style={{ paddingBottom: "20px" }}>
                <strong>{activeContent.p1Strong}</strong>
              </p>
            )}
            <p>{activeContent.p1Regular}</p>
          </div>
        </div>
        <h3 style={{ paddingTop: "20px", color: "var(--color3)" }}>
          <strong>{activeContent.subHeading}</strong>
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
        ) : activeContent.extraImage ? (
          <div className="extra-image-container">
            <img
              src={activeContent.extraImage}
              alt="Valuations Supplementary Visual"
            />
          </div>
        ) : null}

        <div className="cta-button-container">
          <AnimatedButton
            text={activeContent.ctaText}
            href={activeContent.ctaHref}
          />
        </div>
      </div>

      {/* The required CSS for the fade transition. */}
      {/* You can move this to your global CSS file if you prefer. */}
      <style jsx>{`
        .tab-layout {
          /* Add your existing layout styles here (e.g., display: flex) */
          transition: opacity 0.3s ease-in-out;
        }
        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }

        /* --- Your existing styles below --- */
        .left-section {
          /* Your styles */
        }
        .right-section {
          /* Your styles */
        }
        #logo-title {
          /* Your styles */
        }
        img {
          /* Your styles */
        }
        .subtabs-container {
          /* Your styles */
        }
        .subtab-item {
          /* Your styles */
        }
      `}</style>
    </div>
  );
};

export default StandardTabContent;
