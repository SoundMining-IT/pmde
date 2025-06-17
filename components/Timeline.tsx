import React, { useRef, useState, useEffect } from "react";

const timelineData = [
  {
    year: "2002",
    title: "The Beginning",
    description:
      "PMDE was founded with a clear purpose: to offer independent, insightful solutions grounded in integrity. From day one, our aim was to create lasting value for mining projects around the world.",
    position: "right",
    backgroundImage:
      "/images/industrial-factory-worker-standing-high-metal-construction-production-plant.webp",
  },
  {
    year: "2004",
    title: "Breaking Ground",
    description:
      "We secured our first large-scale ultra-deep gold mine project—an early milestone that set the tone for our growing reputation in technical excellence.",
    position: "left",
    backgroundImage:
      "/images/wide-shot-mining-field-with-industrial-structure_1.webp",
  },
  {
    year: "2005",
    title: "Launch of Design Engineering",
    description:
      "We expanded our capabilities with the launch of our Design Engineering Division, delivering tailored mine planning and infrastructure solutions aligned to each project’s unique needs.",
    position: "right",
    backgroundImage:
      "/images/factory-worker-working-with-laptop-computer-adept-procedure-checklist.webp",
  },
  {
    year: "2006",
    title: "Stepping onto the Global Stage",
    description:
      "We opened our first office in Marshalltown, Johannesburg—at the heart of the mining industry—and took on our first international project, marking the start of our global journey.",
    position: "left",
    backgroundImage:
      "/images/beautiful-overhead-cityscape-shot-with-drone.webp",
  },
  {
    year: "2008",
    title: "Navigating Change",
    description:
      "In response to the global financial crisis, we made a strategic shift to support junior mining companies, relocated to Rivonia, and broadened our commodity exposure—building resilience in uncertain times.",
    position: "right",
    backgroundImage: "/images/dump-truck-pit-mine_1.webp",
  },
  {
    year: "2012",
    title: "Strengthening Global Links",
    description:
      "We established a presence in Mauritius, creating a platform for international collaboration and expanding our reach across borders.",
    position: "left",
    backgroundImage:
      "/images/aerial-picture-north-north-east-coast-mauritius-island.webp",
  },
  {
    year: "2020",
    title: "Structuring for the Future",
    description:
      "We restructured our offering into five specialised divisions, ensuring every solution is fit-for-purpose and focused on supporting clients through every stage of the mining lifecycle.",
    position: "right",
    backgroundImage: "/images/high-angle-view-by-drone-industrial-sand.webp",
  },
];

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Removed isDragging, startY, scrollTop states

  const [translateY, setTranslateY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true); // Keep if you want the initial indicator
  const [maxScroll, setMaxScroll] = useState(0);
  // contentHeight and containerHeight can be kept for debugging or future use if needed
  // const [contentHeight, setContentHeight] = useState(0);
  // const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const calculateDimensions = () => {
      if (timelineRef.current && containerRef.current) {
        const timelineHeight = timelineRef.current.scrollHeight;
        const viewportHeight = containerRef.current.clientHeight;

        // setContentHeight(timelineHeight);
        // setContainerHeight(viewportHeight);

        const calculatedMaxScroll = Math.max(
          0,
          timelineHeight - viewportHeight
        );
        setMaxScroll(calculatedMaxScroll);

        if (showScrollIndicator) {
          // Only set timer if indicator is meant to be shown initially
          const timer = setTimeout(() => {
            setShowScrollIndicator(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [showScrollIndicator]); // Dependency on showScrollIndicator

  // Removed handleMouseDown, handleMouseMove, handleMouseUp
  // Removed handleTouchStart, handleTouchMove, handleTouchEnd
  // Removed useEffect for mousemove, mouseup, mouseleave listeners

  // Wheel event for scrolling with mouse wheel (if enabled)
  const handleWheel = (e: React.WheelEvent) => {
    // e.preventDefault(); // Optional: prevent default only if you handle all scrolling
    const newTranslateY = translateY + e.deltaY;

    if (newTranslateY < 0) {
      setTranslateY(0);
    } else if (newTranslateY > maxScroll) {
      setTranslateY(maxScroll);
    } else {
      setTranslateY(newTranslateY);
    }
    setShowScrollIndicator(false); // Hide indicator on any scroll
  };

  const scrollToTop = () => {
    setTranslateY(0);
    setShowScrollIndicator(false);
  };

  const scrollToBottom = () => {
    setTranslateY(maxScroll);
    setShowScrollIndicator(false);
  };

  const scrollBy = (amount: number) => {
    const newTranslateY = translateY + amount;
    if (newTranslateY < 0) {
      setTranslateY(0);
    } else if (newTranslateY > maxScroll) {
      setTranslateY(maxScroll);
    } else {
      setTranslateY(newTranslateY);
    }
    setShowScrollIndicator(false);
  };

  return (
    <div className="timeline-outer-wrapper">
      <div className="timeline-wrapper">
        <div className="timeline-container" ref={containerRef}>
          <div className="top-spacer"></div>
          <div
            className="timeline"
            ref={timelineRef}
            // Removed onMouseDown, onTouchStart, onTouchMove, onTouchEnd
            style={{ transform: `translateY(-${translateY}px)` }}
          >
            <div className="timeline-line"></div>
            {timelineData.map((item, index) => (
              <div key={index} className={`timeline-item ${item.position}`}>
                <h2 className="year">{item.year}</h2>
                <div className="content-box">
                  <div
                    className="timeline-image"
                    style={{ backgroundImage: `url(${item.backgroundImage})` }}
                  ></div>
                  <div className="timeline-content">
                    <h3 className="title">{item.title}</h3>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
                <div className="marker"></div>
              </div>
            ))}
          </div>
          <div className="bottom-spacer"></div>
          {showScrollIndicator && (
            <div className="scroll-indicator">
              {/* Changed text as dragging is removed */}
              <span>Use controls or scroll wheel</span>
              <div className="arrow-down"></div>
            </div>
          )}
        </div>
        {/* <div className="navigation-controls">
          <button
            className={`nav-button ${translateY <= 0 ? "disabled" : ""}`}
            onClick={scrollToTop}
            title="Scroll to top"
          >
            Top
          </button>
          <button
            className={`nav-button ${translateY <= 0 ? "disabled" : ""}`}
            onClick={() => scrollBy(-200)}
            title="Scroll up"
          >
            ▲
          </button>
          <button
            className={`nav-button ${
              translateY >= maxScroll ? "disabled" : ""
            }`}
            onClick={() => scrollBy(200)}
            title="Scroll down"
          >
            ▼
          </button>
          <button
            className={`nav-button ${
              translateY >= maxScroll ? "disabled" : ""
            }`}
            onClick={scrollToBottom}
            title="Scroll to bottom"
          >
            End
          </button>
        </div> */}
      </div>

      <style jsx>{`
        .timeline-outer-wrapper {
          position: relative;
          height: 100%;
          width: 100%;
        }
        .timeline-wrapper {
          margin-top: -80vh;
          margin-bottom: -10vh;
          position: relative;
          height: 100%;
          width: 100%;
          font-family: Arial, sans-serif;
          overflow: hidden; /* Keep this for containerRef */
        }
        .timeline-container {
          height: 100%;
          position: relative;
          overflow: hidden; /* This is the main viewport */
        }
        .timeline {
          /* Removed cursor style */
          user-select: none;
          /* Kept transition for button/wheel scrolling smoothness */
          transition: transform 0.3s ease-out;
          position: relative;
          margin-top: 750px; /* Initial offset */
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: #8b0000;
          transform: translateX(-50%);
        }
        .timeline-item {
          position: relative;
          margin-bottom: 0px;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 60px;
        }
        .timeline-item:first-child {
          margin-top: 40px;
        }
        .timeline-item:last-child {
          margin-bottom: 40px;
        }
        .timeline-item.left {
          align-items: flex-start;
        }
        .timeline-item.right {
          align-items: flex-end;
        }
        .year {
          font-size: var(--text-xxlarge);
          color: #8b0000;
          font-weight: bold;
        }
        .content-box {
          display: flex;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 500px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .timeline-image {
          flex: 0 0 150px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .timeline-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          padding: 20px;
          align-items: left;
          text-align: left;
        }
        .title {
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 12px;
          color: #333;
          text-align: left;
        }
        .description {
          font-size: 14px;
          line-height: 1.5;
          color: #555;
          margin: 0;
        }
        .marker {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #8b0000;
          border: 3px solid #fff;
          position: absolute;
          left: 50%;
          top: 30px;
          transform: translateX(-50%);
          z-index: 2;
          box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.3);
        }
        .timeline-item.left .content-box {
          margin-left: 0px;
        }
        .timeline-item.right .content-box {
          margin-right: 0px;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: #8b0000;
          font-weight: bold;
          animation: bounce 2s infinite;
          opacity: 0.8;
          z-index: 20;
        }
        .arrow-down {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #8b0000;
          margin: 10px auto 0;
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .navigation-controls {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 100;
        }
        .nav-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(139, 0, 0, 0.8);
          color: white;
          font-size: 16px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: opacity 0.3s, background-color 0.3s;
        }
        .nav-button:hover {
          opacity: 1;
          background-color: rgba(139, 0, 0, 1);
        }
        .nav-button.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .timeline-line {
            left: 40px;
          }
          .timeline-item {
            align-items: flex-start !important;
          }
          .timeline-item.left .content-box,
          .timeline-item.right .content-box {
            margin-left: 0px; /* Should be margin-left: 60px (40px line offset + 20px gap) on mobile if line is at 40px */
            margin-right: 0px;
            width: calc(100% - 70px); /* Adjusted for mobile line position */
          }
          .marker {
            left: 40px;
          }
          .year {
            margin-left: 70px; /* Relative to timeline-item start */
          }
          .navigation-controls {
            right: 10px;
          }
          .nav-button {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Timeline;
