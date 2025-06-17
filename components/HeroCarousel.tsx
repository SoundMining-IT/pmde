import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Interface for individual slide content
interface SlideContent {
  subtitle?: string;
  description?: string;
}

interface HeroProps {
  backgroundImage?: string;
  foregroundImage?: string;
  middleImage?: string;
  // Fixed title that doesn't change in the carousel
  title: string;
  // Single content or array of slide contents
  content?: string | string[] | SlideContent | SlideContent[];
  textPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  textAlign?: "left" | "right" | "center";
  slideDirection?: "left" | "right" | "up" | "down";
  carouselEnabled?: boolean;
  carouselInterval?: number; // Time in milliseconds between slides
  parallaxStrength?: number; // Adjust the parallax effect strength
  titleParallaxFactor?: number; // e.g., title moves 20% of scroll distance
  contentParallaxFactor?: number; // e.g., subtitle/desc moves 10%
  middleImageParallaxFactor?: number;
}

const HeroCarousel: React.FC<HeroProps> = ({
  backgroundImage,
  foregroundImage,
  middleImage,
  title,
  content,
  textPosition = "center",
  textAlign = "center",
  slideDirection = "left",
  carouselEnabled = false,
  carouselInterval = 5000, // Default 5 seconds
  parallaxStrength = 10, // Further reduced parallax strength for subtle movement
  titleParallaxFactor = 0.5, // e.g., title moves 20% of scroll distance
  contentParallaxFactor = 0.5, // e.g., subtitle/desc moves 10%
  middleImageParallaxFactor = 0.5,
}) => {
  // Reference for the container to detect when it's in view
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // State to track mouse position within the hero
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // --- Scroll Parallax Setup (New) ---
  // 1. Get scroll progress relative to the viewport height
  const { scrollY } = useScroll(); // Tracks window scroll Y position

  // 2. Create MotionValues that transform scrollY into a slower translateY
  //    We adjust the scrollY by a factor to control parallax speed.
  //    A negative factor makes it move up as you scroll down (appears further away).
  const titleScrollY = useTransform(
    scrollY,
    (latest) => latest * titleParallaxFactor // Positive factor
  );
  const contentScrollY = useTransform(
    scrollY,
    (latest) => latest * contentParallaxFactor // Positive factor
  );

  const middleImageScrollY = useTransform(
    scrollY,
    (latest) => latest * middleImageParallaxFactor // Use the new factor
  );

  // Effect to update mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const middleOffsetX = useMemo(() => {
    const maxX = ref.current?.offsetWidth || 1;
    const midX = maxX / 2;
    // Adjust the divisor for less movement (e.g., * 8 instead of * 4 for foreground)
    return (mouseX - midX) * (parallaxStrength / (midX * 8));
  }, [mouseX, parallaxStrength]); // Note: Removed ref from deps, offsetWidth doesn't usually change dynamically

  const middleOffsetY = useMemo(() => {
    const maxY = ref.current?.offsetHeight || 1;
    const midY = maxY / 2;
    // Adjust the divisor for less movement
    return (mouseY - midY) * (parallaxStrength / (midY * 8));
  }, [mouseY, parallaxStrength]); // Note: Removed ref from deps, offsetHeight doesn't usually change dynamically

  // Calculate foreground image movement based on mouse position (even less movement)
  const foregroundOffsetX = useMemo(() => {
    const maxX = ref.current?.offsetWidth || 1;
    const midX = maxX / 2;
    return (mouseX - midX) * (parallaxStrength / (midX * 4)); // Even less movement
  }, [mouseX, parallaxStrength]);

  const foregroundOffsetY = useMemo(() => {
    const maxY = ref.current?.offsetHeight || 1;
    const midY = maxY / 2;
    return (mouseY - midY) * (parallaxStrength / (midY * 4)); // Even less movement
  }, [mouseY, parallaxStrength]);

  // Handle carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Process content to ensure it's in the right format
  const processedContent: SlideContent[] = useMemo(() => {
    if (!content) return [{}];
    if (typeof content === "string") return [{ subtitle: content }];
    if (Array.isArray(content) && typeof content[0] === "string")
      return (content as string[]).map((subtitle) => ({ subtitle }));
    if (!Array.isArray(content) && typeof content === "object")
      return [content as SlideContent];
    return content as SlideContent[];
  }, [content]);

  // Calculate the total number of slides
  const totalSlides = processedContent.length;

  // Set up carousel interval
  useEffect(() => {
    if (!carouselEnabled || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, carouselInterval);
    return () => clearInterval(interval);
  }, [carouselEnabled, carouselInterval, totalSlides]);

  // Determine slide properties based on direction
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
          visible: { y: slideDistance, opacity: 1 },
        };
      default:
        return {
          hidden: { x: -slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
    }
  };

  const slideVariants = getSlideVariants(slideDirection);

  // Animation variants
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

  // Get current slide content
  const currentContent = carouselEnabled
    ? processedContent[currentSlide]
    : processedContent[0];

  // Handle dot navigation
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  // Determine text alignment - force left alignment when carousel is enabled
  const effectiveTextAlign = carouselEnabled ? "left" : textAlign;

  return (
    <section
      className={`hero desktop ${textPosition} ${
        carouselEnabled ? "carousel-mode" : ""
      } section-wrapper`}
      ref={ref}
      style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}
    >
      {backgroundImage && (
        <motion.div // Optional: Keep motion div for complex animations if needed
          className="background-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            // Apply scroll/mouse transforms to this container if needed
            // y: backgroundScrollY, // Example if background had parallax
          }}
        >
          <Image
            src={backgroundImage} // Can be imported image or URL string
            alt="Hero background" // CHANGE TO DESCRIPTIVE ALT TEXT
            fill // Makes the image fill the parent container
            style={{ objectFit: "cover" }} // Behaves like background-size: cover
            quality={85} // Adjust quality vs file size (default 75)
            priority={true} // *** CRITICAL: Tells Next.js to load this image eagerly ***
            // placeholder="blur" // Optional: Use blur-up effect
            // blurDataURL={backgroundBlurDataURL} // Required if placeholder="blur"
          />
        </motion.div>
      )}

      {/* Middle Image Layer using next/image */}
      {middleImage && (
        <motion.div
          className="middle-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            mixBlendMode: "color-dodge",
            // Apply mouse/scroll parallax transforms HERE
            translateX: middleOffsetX,
            translateY: middleOffsetY,
            y: middleImageScrollY, // Scroll parallax
            willChange: "transform",
          }}
        >
          <Image
            src={middleImage}
            alt="Hero middle layer" // CHANGE ALT TEXT
            fill
            style={{ objectFit: "cover" }} // Or 'contain' etc. if needed
            quality={85}
            priority={true} // Also load this eagerly
            // placeholder="blur"
            // blurDataURL={middleBlurDataURL}
          />
        </motion.div>
      )}

      {/* Foreground Image Layer using next/image */}
      {foregroundImage && (
        <motion.div
          className="foreground-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99, // Should be above content unless intended otherwise
            mixBlendMode: "normal",
            // Apply mouse parallax transforms HERE
            translateX: foregroundOffsetX,
            translateY: foregroundOffsetY,
            // No scroll parallax applied in original code, add if needed
            willChange: "transform",
          }}
        >
          <Image
            src={foregroundImage}
            alt="Hero foreground layer" // CHANGE ALT TEXT
            fill
            style={{ objectFit: "cover" }}
            quality={85}
            priority={true} // Load eagerly
            // placeholder="blur"
            // blurDataURL={foregroundBlurDataURL}
          />
        </motion.div>
      )}

      <motion.div
        className={`content  text-${effectiveTextAlign}`}
        id="home-custom"
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ position: "relative", zIndex: 3 }}
      >
        {/* Title is always fixed and doesn't change with carousel */}
        <motion.h1
          className="title"
          variants={item} // Keep existing enter animation variants
          style={{ y: titleScrollY }} // Apply the transformed scroll Y value
        >
          {title}
        </motion.h1>
        <div className="car-area">
          {/* Only subtitle and description change in carousel */}
          {currentContent.subtitle && (
            <motion.h2
              className="subtitle"
              variants={item}
              key={`subtitle-${currentSlide}`} // Keep key for carousel animation reset
              style={{ y: contentScrollY }} // Apply the transformed scroll Y value
            >
              {currentContent.subtitle}
            </motion.h2>
          )}

          {currentContent.description && (
            <motion.p
              className="description"
              variants={item}
              key={`description-${currentSlide}`} // Keep key for carousel animation reset
              style={{ y: contentScrollY }} // Apply the transformed scroll Y value
            >
              {currentContent.description}
            </motion.p>
          )}
        </div>

        {carouselEnabled && totalSlides > 1 && (
          <motion.div
            className="carousel-dots"
            variants={item} // Keep existing entrance animation variants
            style={{ y: contentScrollY }} // Apply the same scroll transform as subtitle/description
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </motion.div>
        )}

        {/* <motion.div className="bottom-arch" variants={item} /> */}
      </motion.div>

      <style jsx>{`
        .hero {
          min-height: 600px; /* Ensure enough space to move mouse */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        /* The styles for background-image and foreground-image are now inline */

        .hero.top-left .content {
          align-items: flex-start;
          justify-content: flex-start;
        }

        .hero.top-right .content {
          align-items: flex-end;
          justify-content: flex-start;
        }

        .hero.bottom-left .content {
          align-items: flex-start;
          justify-content: flex-end;
        }

        .hero.bottom-right .content {
          align-items: flex-end;
          justify-content: flex-end;
        }

        .hero.center .content {
          align-items: center;
          justify-content: center;
        }

        .content {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          max-width: 800px;
        }

        .text-left {
          text-align: left;
        }

        .text-right {
          text-align: right;
        }

        .text-center {
          text-align: center;
        }

        /* Override text alignment for carousel - always left-aligned */
        .carousel-mode .text-right,
        .carousel-mode .text-center {
          text-align: left;
        }

        .carousel-dots {
          display: flex;
          justify-content: flex-start; /* Left-align dots when in carousel mode */
          margin-top: 0rem;
        }

        .dot {
          height: 20px;
          width: 20px;
          margin: 0 5px;
          background-color: white;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .dot:first-child {
          margin-left: 0; /* Remove left margin from first dot */
        }

        .dot.active {
          background-color: var(--color5);
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
