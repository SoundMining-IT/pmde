import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

const slides = [
  {
    title:
      "ESTABLISHED IN 2004, WE HAVE PARTNERED WITH OVER 450 CLIENTS ACROSS SIX CONTINENTS.",
    contentBold:
      "Working with top-tier South African mining companies and private firms, our global network exceeds client expectations in geosciences, mining, processing, environmental, and finance.",
    content:
      "With diverse skills and experience, we uncover opportunities and capture value, covering the entire minerals chain, upholding the highest standards.",
    image: "/images/MyPrecious.webp",
  },
  {
    title:
      "ESTABLISHED IN 2004, WE HAVE PARTNERED WITH OVER 450 CLIENTS ACROSS SIX CONTINENTS.",
    contentBold:
      "We provide tailored, full-spectrum solutions to address the dynamic challenges of the minerals industry, supporting clients at every stage.",
    content:
      "Committed to community development, we make regular contributions to non-profit organisations, reflecting our dedication to excellence, integrity, and social responsibility.",

    image: "/images/MyPrecious.webp",
  },
];

// Accepts imagePath prop to set a custom background image
const EstablishCarousel = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction: any) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: any) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const backgroundVariants = {
    initial: {
      scale: 1.05,
      opacity: 0.8,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Animation for navigation buttons
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  // Progress indicator
  const ImprovedProgressIndicator = () => {
    return (
      <div className="dots-container">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

        <style jsx>{`
          .dots-container {
            position: absolute;
            bottom: 30px;
            left: -16%;
            display: flex;
            justify-content: center;
            gap: 12px;
            z-index: 10;
          }

          .dot {
            width: 14px;
            height: 14px;
            border: none;
            border-radius: 50%;
            background-color: var(--color3);
            cursor: pointer;
            padding: 0;
            transition: all 0.3s ease;
          }

          .dot.active {
            background-color: #d0cabe;
            transform: scale(1.2);
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="establish-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          className="image-placeholder"
          style={{
            backgroundImage: `url(${slides[currentIndex].image})`,
          }}
          key={`bg-${currentIndex}`}
          // initial="initial"
          // animate="animate"
          // exit="exit"
          // variants={backgroundVariants}
        />
      </AnimatePresence>

      <div className="content-wrapper">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="slide"
          >
            <div className="text-content">
              <motion.h2
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {slides[currentIndex].title}
              </motion.h2>

              <motion.span
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="bold-text"
                custom={1}
              >
                {slides[currentIndex].contentBold}
              </motion.span>

              <motion.p
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                {slides[currentIndex].content}
              </motion.p>

              {/* <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <AnimatedButton href="/" text="Read Full Success Story" />
              </motion.div> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        className="prev"
        onClick={prevSlide}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <img src="/images/Arrow left.svg" alt="Previous" />
      </motion.button>

      <motion.button
        className="next"
        onClick={nextSlide}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <img src="/images/Arrow right.svg" alt="Next" />
      </motion.button>

      <ImprovedProgressIndicator />

      <style jsx>{`
        .carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 600px;
        }

        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 2;
          display: flex;
          align-items: center;
        }

        .slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 10%;
        }

        .text-content {
          color: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 600px;
          backdrop-filter: blur(10px);
        }

        .text-content h2 {
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .text-content p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .prev:hover,
        .next:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        .prev img,
        .next img {
          width: 24px;
          height: 24px;
        }

        .progress-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }

        .indicator.active {
          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default EstablishCarousel;
