import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll, // For scroll parallax
  useTransform, // For scroll parallax
} from "framer-motion";

interface HeroProps {
  // Image Layers
  backgroundImage?: string;
  middleImage?: string; // Added
  foregroundImage?: string; // Added

  // Text Content
  title: string;
  subtitle?: string;
  description?: string;

  // Layout & Animation
  textPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  textAlign?: "left" | "right" | "center";
  slideDirection?: "left" | "right" | "up" | "down"; // For text entrance

  // Parallax Control
  parallaxStrength?: number; // Mouse parallax intensity
  titleParallaxFactor?: number; // Scroll parallax for title
  contentParallaxFactor?: number; // Scroll parallax for subtitle/desc
  middleImageParallaxFactor?: number; // Scroll parallax for middle image
  contentScrollDirectionY?: "up" | "down" | "none"; // Vertical scroll direction
  contentScrollDirectionX?: "left" | "right" | "none"; // Added: Horizontal scroll direction
}

const Hero: React.FC<HeroProps> = ({
  // Images
  backgroundImage,
  middleImage,
  foregroundImage,
  // Text
  title,
  subtitle,
  description,
  // Layout & Animation
  textPosition = "center",
  textAlign = "center",
  slideDirection = "left",
  // Parallax Defaults
  parallaxStrength = 10, // Mouse parallax strength
  titleParallaxFactor = 0.5, // Title scroll factor
  contentParallaxFactor = 0.4, // Subtitle/desc scroll factor
  middleImageParallaxFactor = 0.3, // Middle image scroll factor (slower)
  contentScrollDirectionY = "down", // Default vertical direction
  contentScrollDirectionX = "none", // Added: Default horizontal direction ('none')
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // ==========================================
  // == MOUSE PARALLAX STATE & EFFECT        ==
  // ==========================================
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []); // Runs once on mount
  // ==========================================
  // == END MOUSE PARALLAX STATE & EFFECT    ==
  // ==========================================

  // --- Scroll Parallax Setup ---
  const { scrollY } = useScroll();

  // --- Determine scroll direction multipliers ---
  const scrollDirectionMultiplierY =
    contentScrollDirectionY === "up"
      ? -1
      : contentScrollDirectionY === "down"
      ? 1
      : 0; // 0 if 'none'

  const scrollDirectionMultiplierX =
    contentScrollDirectionX === "left"
      ? -1
      : contentScrollDirectionX === "right"
      ? 1
      : 0; // 0 if 'none'

  // --- Calculate effective factors (using specific X/Y if provided, else fallback) ---
  // Example using fallback, could be more complex if specific props were added
  const effectiveTitleFactor = titleParallaxFactor;
  const effectiveContentFactor = contentParallaxFactor;

  // --- Create Motion Values for X and Y transforms ---
  const titleScrollY = useTransform(
    scrollY,
    (latest) => latest * effectiveTitleFactor * scrollDirectionMultiplierY
  );
  const titleScrollX = useTransform(
    scrollY,
    (latest) => latest * effectiveTitleFactor * scrollDirectionMultiplierX // Use same factor for magnitude
  );
  const contentScrollY = useTransform(
    scrollY,
    (latest) => latest * effectiveContentFactor * scrollDirectionMultiplierY
  );
  const contentScrollX = useTransform(
    scrollY,
    (latest) => latest * effectiveContentFactor * scrollDirectionMultiplierX // Use same factor for magnitude
  );

  const middleImageScrollY = useTransform(
    scrollY,
    (latest) => latest * middleImageParallaxFactor
  );

  // --- Mouse Parallax Calculations ---
  const middleOffsetX = useMemo(() => {
    const maxX = ref.current?.offsetWidth || 1; // Use component width
    const midX = maxX / 2;
    return (mouseX - midX) * (parallaxStrength / (midX * 8)); // Slower movement for middle
  }, [mouseX, parallaxStrength]); // Depend on mouseX and strength

  const middleOffsetY = useMemo(() => {
    const maxY = ref.current?.offsetHeight || 1; // Use component height
    const midY = maxY / 2;
    return (mouseY - midY) * (parallaxStrength / (midY * 8)); // Slower movement for middle
  }, [mouseY, parallaxStrength]); // Depend on mouseY and strength

  const foregroundOffsetX = useMemo(() => {
    const maxX = ref.current?.offsetWidth || 1;
    const midX = maxX / 2;
    return (mouseX - midX) * (parallaxStrength / (midX * 4)); // Faster movement for foreground
  }, [mouseX, parallaxStrength]);

  const foregroundOffsetY = useMemo(() => {
    const maxY = ref.current?.offsetHeight || 1;
    const midY = maxY / 2;
    return (mouseY - midY) * (parallaxStrength / (midY * 4)); // Faster movement for foreground
  }, [mouseY, parallaxStrength]);

  // --- Entrance Animation Variants ---
  const getSlideVariants = (direction: string) => {
    const slideDistance = 50;
    switch (direction) {
      case "left":
        return {
          hidden: { x: -slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "up":
        return {
          hidden: { y: -slideDistance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          hidden: { y: slideDistance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      default:
        return {
          hidden: { x: -slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
    }
  };
  const slideVariants = getSlideVariants(slideDirection);
  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: slideVariants.hidden,
    visible: {
      ...slideVariants.visible,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  // --- End Entrance Animation Variants ---

  return (
    <section
      className={`hero ${textPosition} text-${textAlign} section-wrapper desktop`}
      ref={ref}
      style={{
        position: "relative", // Crucial for absolute positioning of layers
        minHeight: "600px", // Ensure enough height for parallax
        overflow: "hidden", // Contain all layers and effects
        // Background is now an inner layer, not applied here
      }}
    >
      {backgroundImage && (
        <motion.div
          className="hero-background-image" // Renamed for clarity
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1, // Backmost layer
            // y: backgroundScrollY,
            overflow: "hidden", // Ensure Image fill works correctly
          }}
        >
          <Image
            src={backgroundImage}
            alt="Hero background" // *** CHANGE TO DESCRIPTIVE ALT TEXT ***
            fill
            style={{ objectFit: "cover" }}
            priority={true} // *** Load Eagerly ***
            quality={85} // Adjust as needed
            // placeholder="blur" // Optional
            // blurDataURL="..." // Needed if using blur
          />
        </motion.div>
      )}

      {/* Layer 2: Middle Image */}
      {middleImage && (
        <motion.div
          className="hero-middle-image-container" // Renamed for clarity
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2, // Above background
            mixBlendMode: "color-dodge", // Apply blend mode to wrapper
            willChange: "transform", // Performance hint for browser
            translateX: middleOffsetX, // Mouse X parallax
            translateY: middleOffsetY, // Mouse Y parallax
            y: middleImageScrollY, // Scroll Y parallax
            overflow: "hidden", // Ensure Image fill works correctly
          }}
        >
          <Image
            src={middleImage}
            alt="Hero middle layer decoration" // *** CHANGE TO DESCRIPTIVE ALT TEXT ***
            fill
            style={{ objectFit: "cover" }} // Or 'contain' etc.
            priority={true} // *** Load Eagerly ***
            quality={85}
            // placeholder="blur"
            // blurDataURL="..."
          />
        </motion.div>
      )}

      {/* Layer 3: Content (Text) */}
      <motion.div
        className="content" // Keep class for potential general styling
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          position: "relative", // Position relative to the section
          zIndex: 3, // Above middle image
          display: "flex", // Use flex for alignment via parent section classes
          flexDirection: "column",
          // Alignment styles are controlled by parent section (textPosition)
          // Padding and max-width applied via CSS below
          // This container itself doesn't move with scroll/mouse
          height: "100%", // Ensure content container tries to fill height for alignment
          // Map textPosition to flex alignment
          justifyContent: textPosition.includes("top")
            ? "flex-start"
            : textPosition.includes("bottom")
            ? "flex-end"
            : "center",
          // Map textPosition to flex alignment
          alignItems: textPosition.includes("left")
            ? "flex-start"
            : textPosition.includes("right")
            ? "flex-end"
            : "center",
        }}
      >
        <div
          className="content-inner"
          style={{ maxWidth: "800px", padding: "2rem" }}
        >
          {" "}
          {/* Inner wrapper for padding/width */}
          <motion.h1
            className="title"
            variants={item} // Entrance animation
            style={{
              x: titleScrollX, // Added horizontal scroll transform
              y: titleScrollY,
            }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.h2
              className="subtitle"
              variants={item} // Entrance animation
              style={{
                x: contentScrollX, // Added horizontal scroll transform
                y: contentScrollY,
              }}
            >
              {subtitle}
            </motion.h2>
          )}
          {description && (
            <motion.p
              className="description"
              variants={item} // Entrance animation
              style={{
                x: contentScrollX, // Added horizontal scroll transform
                y: contentScrollY,
              }}
            >
              {description}
            </motion.p>
          )}
          {/* Optional: Also apply scroll parallax if needed */}
          {/* <motion.div
            className="bottom-arch" // Needs styling in CSS
            variants={item}
            style={{ y: contentScrollY }}
          /> */}
        </div>
      </motion.div>

      {/* Layer 4: Foreground Image */}
      {foregroundImage && (
        <motion.div
          className="hero-foreground-image" // Renamed for clarity
          style={{
            position: "absolute",
            top: 0, // Ensure it aligns correctly (removed extra top:0 in original)
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 4, // On top of content
            mixBlendMode: "normal", // Or screen, multiply etc.
            pointerEvents: "none", // Allow clicks to pass through
            willChange: "transform",
            translateX: foregroundOffsetX, // Mouse X parallax (faster)
            translateY: foregroundOffsetY, // Mouse Y parallax (faster)

            overflow: "hidden", // Ensure Image fill works correctly
          }}
        >
          <Image
            src={foregroundImage}
            alt="Hero foreground element" // *** CHANGE TO DESCRIPTIVE ALT TEXT ***
            fill
            style={{ objectFit: "cover" }} // Adjust as needed
            priority={true} // *** Load Eagerly ***
            quality={85}
            // placeholder="blur"
            // blurDataURL="..."
          />
        </motion.div>
      )}

      <style jsx>{`
        /* Section level alignment controlled by classes like .top-left */
        /* We use flexbox on the .content div style directly now */
        /* Parent section text-align controls alignment inside .content-inner */
        .hero.text-left .content-inner {
          text-align: left;
        }
        .hero.text-right .content-inner {
          text-align: right;
        }
        .hero.text-center .content-inner {
          text-align: center;
        }

        /* Basic text styling - adjust colors, fonts, sizes */
        .title,
        .subtitle,
        .description {
          color: white; /* Example */
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6); /* Example */
          margin-bottom: 0.5em;
        }
        .title {
          font-size: clamp(2rem, 5vw, 3.5rem); /* Responsive size */
        }
        .subtitle {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
        }
        .description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          line-height: 1.6;
        }

        .bottom-arch {
          /* Add styles for your bottom arch element here */
          /* e.g., height: 10px; width: 50px; background: red; */
        }
      `}</style>
    </section>
  );
};

export default Hero;
