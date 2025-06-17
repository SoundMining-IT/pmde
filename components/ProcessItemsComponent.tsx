// ProcessItemsComponent_Carousel_Layout2_Style.tsx
import React, { useState, useEffect, useMemo, FC, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

// --- 1. Define Types (Unchanged) ---
interface IconPaths {
  active: string;
  inactive: string;
}

export interface ProcessItemData {
  id: string | number;
  iconPaths: IconPaths;
  title: string;
  description: string;
}

interface ProcessItemsProps {
  mainTitle?: string;
  items: ProcessItemData[];
  cycleInterval?: number;
  className?: string;
  itemsRowClassName?: string;
  itemWrapperClassName?: string;
  activeItemWrapperClassName?: string;
  inactiveItemWrapperClassName?: string;
  descriptionContainerClassName?: string;
  descriptionTransitionDuration?: number;
}

// --- 2. Define CSS (Carousel Style with Layout 2 Colors/Sizes) ---
const componentStyles = `
.process-items-component {
  font-family: sans-serif;
 
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center row and description */
}

.process-main-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem; /* More space before icons */
  text-transform: uppercase;
  text-align: center;
}

/* Row containing all visual items (icons) */
.process-items-visual-row {
  display: flex;
  justify-content: center;
  /* Align based on the bottom when size changes */
  align-items: flex-end;
  gap: 20px; /* Adjust gap between icons */
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  min-height: 110px; /* Height to accommodate largest (active) icon + transform */
  padding: 0 10px; /* Prevent items touching edges */
}

/* Wrapper for each individual item */
.item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  /* Base transition for smooth changes */
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 1; /* Start fully opaque */
}

/* Styles for the icon container within each item */
.item-icon-container {
  width: 60px; /* Default size (like inactive in image 2) */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* Border used for potential subtle highlight, transparent by default */
  border: 3px solid transparent;
  background-color: #F4E9ED; /* Inactive background color like image 2 */
  box-sizing: border-box;
  overflow: hidden;
  /* Transition size, background, border */
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

.item-icon-container img {
  display: block;
  max-width: 65%; /* Adjust icon size within circle */
  max-height: 65%;
  object-fit: contain;
  opacity: 0.6; /* Inactive opacity like image 2 */
  filter: grayscale(10%);
  /* Transition visual properties */
  transition: opacity 0.3s ease, filter 0.3s ease;
}

/* --- Specific styles for the ACTIVE item --- */
.item-wrapper.active {
  /* Make the active item slightly elevated */
  transform: translateY(-10px);
  opacity: 1; /* Ensure active is fully opaque */
}

.item-wrapper.active .item-icon-container {
  width: 100px; /* Larger size for active, like image 2 */
  height: 100px;
  background-color: #A3164A; /* Active background color like image 2 */
  /* Optional: Add a border if needed */
  /* border-color: #83063A; */
}

.item-wrapper.active .item-icon-container img {
  opacity: 1; /* Full opacity for active image */
  filter: grayscale(0%); /* No grayscale for active */
  max-width: 80%; /* Slightly larger icon % in active circle */
  max-height: 80%;
}
/* --- End Active Styles --- */


/* Container for the description text */
.process-description-container {
  text-align: center;
  min-height: 60px; /* Adjust based on typical text length */
  width: 90%; /* Allow description to be wider */
  max-width: 700px;
  position: relative; /* For transition positioning */
  margin-top: 1rem; /* Space after icons */
}

/* The actual content block for description transition */
.process-description-content {
   opacity: 1;
   /* Transition applied via classes */
}
.process-item-title-desc {
  font-size: 1rem;
  font-weight: bold;
  color: #A3164A; /* Match active color */
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}
.process-item-description-text {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* --- CSS Transition Classes for Description --- */
/* Slightly different animation */
.fade-desc-enter { opacity: 0; transform: translateY(15px); }
.fade-desc-enter-active { opacity: 1; transform: translateY(0); transition: opacity var(--desc-transition-duration, 300ms) ease-out, transform var(--desc-transition-duration, 300ms) ease-out; }
.fade-desc-exit { opacity: 1; transform: translateY(0); position: absolute; top: 0; left: 0; width: 100%; }
.fade-desc-exit-active { opacity: 0; transform: translateY(-15px); transition: opacity var(--desc-transition-duration, 300ms) ease-in, transform var(--desc-transition-duration, 300ms) ease-in; }
/* --- End CSS Transition Classes --- */
`;

// --- 3. Create the Component (Carousel Style Logic) ---
const DEFAULT_CYCLE_INTERVAL = 5000; // Can adjust
const DEFAULT_DESC_TRANSITION_DURATION = 300;

const ProcessItemsComponent: FC<ProcessItemsProps> = ({
  mainTitle = "THE PROCESS INVOLVED", // Default title
  items = [],
  cycleInterval = DEFAULT_CYCLE_INTERVAL,
  className = "",
  itemsRowClassName = "",
  itemWrapperClassName = "",
  activeItemWrapperClassName = "active", // Class added to active item
  // inactiveItemWrapperClassName = "inactive", // Not strictly needed if base style is inactive
  descriptionContainerClassName = "",
  descriptionTransitionDuration = DEFAULT_DESC_TRANSITION_DURATION,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const descriptionRef = useRef<HTMLDivElement>(null); // Ref for description transition

  // Memoize the active item for the description section
  const activeItem = useMemo(() => {
    if (!items || items.length === 0) return null;
    const validIndex =
      ((activeIndex % items.length) + items.length) % items.length;
    return items[validIndex];
  }, [items, activeIndex]);

  // Effect for auto-cycling
  useEffect(() => {
    const styleTagId = "process-items-component-styles";
    let styleElement = document.getElementById(
      styleTagId
    ) as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleTagId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = componentStyles;
    document.documentElement.style.setProperty(
      "--desc-transition-duration",
      `${descriptionTransitionDuration}ms`
    );

    if (items.length <= 1) {
      if (items.length === 1 && activeIndex !== 0) setActiveIndex(0);
      return;
    }
    const timerId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, cycleInterval);
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, cycleInterval, activeIndex, descriptionTransitionDuration]);

  const handleIconClick = (index: number) => {
    setActiveIndex(index);
  };

  if (!items || items.length === 0) {
    return (
      <div className={`process-items-component ${className}`}>
        <p>No process steps available.</p>
      </div>
    );
  }

  const currentValidIndex =
    ((activeIndex % items.length) + items.length) % items.length;

  return (
    <div className={`process-items-component ${className}`}>
      {mainTitle && <h2 className="process-main-title">{mainTitle}</h2>}

      {/* Row of ALL Visual Items (Icons) */}
      <div className={`process-items-visual-row ${itemsRowClassName}`}>
        {items.map((item, index) => {
          const isActive = index === currentValidIndex;
          // Conditionally apply the active class
          const wrapperClass = isActive ? activeItemWrapperClassName : ""; // Removed inactive class necessity
          return (
            <div
              key={item.id}
              // Combine base class, prop class, and conditional active class
              className={`item-wrapper ${itemWrapperClassName} ${wrapperClass}`}
              onClick={() => handleIconClick(index)}
              aria-label={`Go to step: ${item.title || index + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleIconClick(index);
                }
              }}
            >
              <div className="item-icon-container">
                <img
                  // Show the icon corresponding to the item's state (active/inactive)
                  src={
                    isActive ? item.iconPaths.active : item.iconPaths.inactive
                  }
                  alt={`${item.title || "Step " + (index + 1)} icon`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Description Section (fades based on activeItem) */}
      {activeItem && (
        <div
          className={`process-description-container ${descriptionContainerClassName}`}
        >
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeItem.id} // Change key triggers transition
              nodeRef={descriptionRef} // Use ref for StrictMode compatibility
              timeout={descriptionTransitionDuration}
              classNames="fade-desc" // CSS classes for description fade
            >
              <div ref={descriptionRef} className="process-description-content">
                <h3 className="process-item-title-desc">{activeItem.title}</h3>
                <p className="process-item-description-text">
                  {activeItem.description}
                </p>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      )}
    </div>
  );
};

export default ProcessItemsComponent;
