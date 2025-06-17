import React, { useState, useEffect } from "react";

const images = [
  "/updatedImages/Carousel1.webp",
  "/updatedImages/Carousel2.webp",
  "/updatedImages/Carousel3.webp",
  "/updatedImages/Carousel4.webp",
  "/updatedImages/Carousel5.webp",
  "/updatedImages/Carousel7.webp",
  "/updatedImages/Carousel8.webp",
  "/updatedImages/Carousel9.webp",
  "/updatedImages/Carousel10.webp",
  "/updatedImages/Carousel11.webp",
];

const InfrastructureCarousel = () => {
  const [index, setIndex] = useState(1);
  const total = images.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const getSlideStyle = (i: number): React.CSSProperties => {
    const offset = i - index;
    const absOffset = Math.abs(offset);

    const baseStyle: React.CSSProperties = {
      flex: "0 0 auto",
      transition:
        "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
      borderRadius: "8px",
    };

    if (isMobile) {
      return {
        ...baseStyle,
        width: "100%",
        margin: "0",
        transform:
          offset === 0
            ? "translateX(0) scale(1)"
            : `translateX(${offset * 100}%) scale(0.9)`,
        opacity: offset === 0 ? 1 : 0,
        zIndex: offset === 0 ? 100 : 0,
        pointerEvents: offset === 0 ? "auto" : "none",
      };
    } else {
      // --- Desktop-specific adjustments ---
      const desktopCentralItemWidth = 380; // Increased width for the central image
      const itemMarginHorizontal = 10; // Margin on each side (left/right)

      const sideItemScale = 0.75;
      const sideItemOpacity = 0.6;
      const farItemScale = 0.5;
      const farItemOpacity = 0;

      let scale = farItemScale;
      let opacity = farItemOpacity;
      let zIndex = 10; // Default z-index for far items
      let boxShadow = "0 2px 6px rgba(0,0,0,0.05)";

      if (offset === 0) {
        // Central active item
        scale = 1;
        opacity = 1;
        zIndex = 100;
        boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      } else if (absOffset === 1) {
        // Immediate neighbors
        scale = sideItemScale;
        opacity = sideItemOpacity;
        zIndex = 90;
        boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
      }
      // For absOffset >= 2, they use the default farItemScale, farItemOpacity, and lower zIndex

      return {
        ...baseStyle,
        width: `${desktopCentralItemWidth}px`, // Base width for all desktop items for consistent track calculation
        margin: `0 ${itemMarginHorizontal}px`,
        transform: `scale(${scale})`, // Scaling happens in place, track transform handles centering
        opacity: opacity,
        zIndex: zIndex,
        boxShadow: boxShadow,
        pointerEvents: opacity === 0 ? "none" : "auto", // Make non-visible items non-interactive
      };
    }
  };

  let trackTransform = `translateX(0)`;
  if (!isMobile) {
    const desktopCentralItemWidth = 380;
    const itemMarginHorizontal = 10;
    const centralItemFullWidth =
      desktopCentralItemWidth + itemMarginHorizontal * 2; // Full space taken by one central item

    // To center the 'index'-th item's slot in the viewport:
    // Move track left by: (index * fullWidthOfOneItemSlot)
    // Then, shift track right by: 50% of viewport width
    // Then, shift track left by: 50% of one item's slot width
    const trackOffsetForCurrentIndex = index * centralItemFullWidth;
    trackTransform = `translateX(calc(50% - ${trackOffsetForCurrentIndex}px - ${
      centralItemFullWidth / 2
    }px))`;
  } else {
    trackTransform = `translateX(-${index * 100}%)`;
  }

  return (
    <div className="infra-carousel-container">
      <button
        className="infra-carousel-button infra-carousel-prev"
        onClick={prev}
        aria-label="Previous image"
      >
        <div className="arrow-icon-wrapper">
          <img src="/images/Arrow left.svg" alt="Previous" />
        </div>
      </button>

      <div className="infra-carousel-slider">
        <div
          className="infra-carousel-track"
          style={{
            transform: trackTransform,
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="infra-carousel-slide-wrapper"
              style={getSlideStyle(i)}
            >
              <img
                src={src}
                alt={`Infrastructure example ${i + 1}`}
                className="infra-carousel-image"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="infra-carousel-button infra-carousel-next"
        onClick={next}
        aria-label="Next image"
      >
        <div className="arrow-icon-wrapper">
          <img src="/images/Arrow right.svg" alt="Next" />
        </div>
      </button>

      <style jsx>{`
        .infra-carousel-container {
          position: relative;
          max-width: 1200px; /* Can be adjusted based on total width of 3 images */
          margin: 2rem auto;
          padding: 0 40px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .infra-carousel-slider {
          overflow: hidden;
          position: relative;
          width: 100%;
          /* height: 450px; /* Optional: Set a fixed height for the slider area on desktop */
        }

        @media (max-width: 767px) {
          .infra-carousel-container {
            padding: 0 10px;
          }
        }

        .infra-carousel-track {
          display: flex;
          align-items: center; /* Vertically align items, especially useful if they have different scaled heights */
          transition: transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
          height: 100%; /* Ensure track takes full height of slider if slider has fixed height */
        }

        /* infra-carousel-slide-wrapper gets its style dynamically */

        .infra-carousel-image {
          width: 100%;
          height: 100%; /* Allow image to fill the height of its wrapper if wrapper controls aspect */
          border-radius: 8px;
          display: block;
          object-fit: cover; /* Changed to cover to fill the space, adjust if 'contain' is preferred */
          /* max-height for mobile is handled below */
        }

        @media (min-width: 768px) {
          /* Desktop */
          .infra-carousel-image {
            /* For desktop, if you want images to determine their own height based on aspect ratio: */
            height: auto; /* Let image determine height based on its aspect ratio and wrapper width */
            max-height: 420px; /* Increased max-height for larger desktop images */
            object-fit: contain; /* Revert to contain for desktop if cover crops too much */
          }
        }
        @media (max-width: 767px) {
          /* Mobile */
          .infra-carousel-image {
            max-height: 220px; /* Max height for mobile images */
            object-fit: contain;
          }
        }

        .infra-carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000;
          padding: 0;
          background-color: transparent;
          transition: opacity 0.2s ease;
        }
        .infra-carousel-button:hover {
          opacity: 0.7;
        }

        .infra-carousel-prev {
          left: 0px;
        }

        .infra-carousel-next {
          right: 0px;
        }

        .arrow-icon-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-icon-wrapper img {
          width: 50%;
          height: 50%;
        }

        @media (max-width: 767px) {
          .infra-carousel-button {
            width: 35px;
            height: 35px;
          }
          .infra-carousel-prev {
            left: -5px;
          }
          .infra-carousel-next {
            right: -5px;
          }
        }
      `}</style>
    </div>
  );
};

export default InfrastructureCarousel;
