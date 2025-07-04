import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./AnimatedButton"; // Assuming AnimatedButton exists and accepts href

// Define the slides data with a unique link for each
const slides = [
  {
    title:
      "PMDE secures new mining area, ensuring operational continuity for a magnetite mining operation.",
    content:
      "In 2017, a magnetite mining operation faced imminent depletion, threatening production and jobs. PMDE conducted geological mapping, model validation, and pit optimisation, enabling the mine's owners to identify a viable mining area and maintain uninterrupted operations.",
    image: "/images/RockLand.webp",
    link: "/case-studies/ensuring-operational-continuity-for-magnetite-mine-in-steelpoort-south-africa", // Added link prop
  },
  {
    title:
      "PMDE resolves exploration backlog, enhancing resource planning for a manganese mining company.",
    content:
      "In 2023, a manganese mining company faced a backlog of unlogged drillholes, delaying resource updates. PMDE deployed geologists to log, sample, and quality-check 5,600m of core, reducing the backlog by 62% and improving resource planning.",
    image: "/images/exploration.webp",
    link: "/case-studies/addressing-drillhole-backlogs-to-enhance-mineral-resource-accuracy", // Added link prop
  },
  {
    title:
      "PMDE drives vanadium project value to $1.05 billion through integrated technical and social expertise.",
    content:
      "By providing end-to-end support, PMDE helped an ASX-listed vanadium company navigate complex technical, financial, and social challenges. Their expertise in feasibility studies, resource estimation, and stakeholder engagement increased the project's NPV from $401M to $1.05 billion.",
    image: "/images/HeroVanadium.webp",
    link: "/case-studies/comprehensive-support-for-vanadium-mine-development-driving-project-value-to-1-05", // Added link prop
  },
  {
    title:
      "PMDE enhances iron ore production efficiency through integrated mine planning and training.",
    content:
      "By addressing planning disconnects, training gaps, and operational silos, PMDE helped a global iron ore producer improve ROM quality, streamline workflows, and align short- and long-term planning for greater efficiency.",
    image: "/images/Production.webp",
    link: "/case-studies/optimising-iron-ore-mine-planning-for-increased-production-and-efficiency", // Added link prop
  },
  {
    title:
      "PMDE designs environmentally sensitive tunnel for iron ore transport, preserving protected habitat.",
    content:
      "By developing a 7km underground tunnel and assessing excavation methods, PMDE enabled efficient ore transport while safeguarding a chimpanzee habitat, integrating logistics with national infrastructure.",
    image: "/images/HeroTunnel.webp",
    link: "/case-studies/innovative-tunnel-design-for-environmentally-sensitive-iron-ore-mining", // Added link prop
  },
  {
    title:
      "PMDE drives operational turnaround, improving efficiency and profitability in manganese mining.",
    content:
      "By addressing cultural issues, restructuring reporting frameworks, and implementing strategic change management, PMDE revitalised mine performance, enhancing accountability, optimising production, and ensuring long-term economic sustainability.",
    image: "/images/Machine.webp", // Note: Image name might need updating if it's not coal
    link: "/case-studies/strategic-turnaround-for-improved-manganese-mine-performance", // Added link prop
  },
  {
    title:
      "PMDE implements strategic change management to stabilise mining operations and restore financial resilience.",
    content:
      "By addressing leadership failures, cultural misalignment, and financial instability, PMDE implemented immediate technical support and long-term restructuring strategies, ensuring operational efficiency, investor confidence, and a strengthened market position.",
    image: "/images/HeroStability.webp",
    link: "/case-studies/transforming-operational-and-financial-stability-through-strategic-change-management", // Added link prop
  },
  {
    title:
      "PMDE optimises tailings reclamation strategy, ensuring compliance and investment confidence.",
    content:
      "By evaluating tailings dumps for economic viability, securing Competent Person sign-off, and aligning technical disclosures with stock exchange requirements, PMDE enabled efficient resource use, regulatory approval, and strengthened investor confidence.",
    image: "/images/TailingsImg.webp",
    link: "/case-studies/strategic-management-and-competent-person-sign-off-for-tailings-reclamation", // Added link prop
  },
  {
    title:
      "PMDE enhances drill and blast efficiency through expert-led industry workshop.",
    content:
      "By equipping mining professionals with advanced blasting techniques, safety strategies, and optimisation methods, PMDE's Nahana workshop improved cost efficiency, regulatory compliance, and overall productivity in drill and blast operations.",
    image: "/images/HeroEIA.webp",
    link: "/case-studies/environmental-impact-assessment-for-new-mining-operation", // Added link prop
  },
  {
    title:
      "PMDE improves workplace safety and productivity through fatigue management training.",
    content:
      "By equipping mining professionals with fatigue risk assessments, shift scheduling strategies, and real-time monitoring tools, PMDE's Nahana workshop reduced safety incidents, enhanced worker alertness, and optimised operational efficiency.",
    image: "/images/HeroCoal.webp", // Note: Image name might need updating if not related to EIA
    link: "/case-studies/cost-optimization-strategy-for-underground-coal-mine", // Added link prop
  },
  {
    title:
      "PMDE delivers skilled talent through strategic labour brokering, ensuring operational continuity.",
    content:
      "By providing pre-vetted professionals, streamlining hiring processes, and offering contract-based staffing solutions, PMDE helped a leading mining company maintain efficiency, reduce costs, and access specialised expertise without long-term commitments.",
    image: "/images/HeroPlatinum.webp", // Note: Image name might need updating if not platinum
    link: "/case-studies/risk-management-framework-for-platinum-group-metal-extraction", // Added link prop
  },
];

// Accepts imagePath prop to set a custom background image (prop currently unused but kept)
const Carousel = ({}) => {
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
    }, 10000); // 12 seconds

    return () => clearInterval(interval); // Clear on unmount or before next run
  }, [currentIndex]); // Added empty dependency array to run effect only once on mount

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      // Explicitly type direction
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
    exit: (direction: number) => ({
      // Explicitly type direction
      x: direction < 0 ? 1000 : -1000, // Corrected exit direction logic
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
    visible: (custom: number) => ({
      // Explicitly type custom
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

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="progress-indicators">
      {slides.map((_, index) => (
        <motion.div
          key={index}
          className={`indicator ${index === currentIndex ? "active" : ""}`}
          initial={{ scale: 1 }}
          animate={
            index === currentIndex
              ? { scale: [1, 1.2, 1], backgroundColor: "#ffffff" }
              : { scale: 1, backgroundColor: "rgba(255,255,255,0.5)" }
          }
          transition={{ duration: 0.4 }}
          onClick={() => {
            // Determine direction based on clicked index vs current index
            const newDirection =
              index > currentIndex ? 1 : index < currentIndex ? -1 : 0;
            if (newDirection !== 0) {
              setDirection(newDirection);
              setCurrentIndex(index);
            }
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="carousel">
      {/* Background Image Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          className="image-placeholder"
          style={{
            backgroundImage: `url(${slides[currentIndex].image})`,
          }}
          key={`bg-${currentIndex}`} // Key ensures re-animation on change
          initial="initial"
          animate="animate"
          exit="exit"
          variants={backgroundVariants}
        />
      </AnimatePresence>

      {/* Content Area */}
      <div className="content-wrapper">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex} // Key ensures component re-renders on index change
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="slide"
          >
            <div className="text-content">
              {/* Title */}
              <motion.h2
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={0} // Custom prop for staggered animation delay
              >
                {slides[currentIndex].title}
              </motion.h2>

              {/* Content */}
              <motion.p
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={1} // Custom prop for staggered animation delay
              >
                {slides[currentIndex].content}
              </motion.p>

              {/* Button with Dynamic Link */}
              <motion.div
                className="button-box"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={2} // Custom prop for staggered animation delay
              >
                {/* ---- THIS IS THE CORRECTED LINE ---- */}
                <AnimatedButton
                  href={slides[currentIndex].link} // Use the link from the current slide object
                  text="Read Full Success Story"
                />
                {/* ---- END OF CORRECTION ---- */}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {/* --- Using original class names and structure --- */}
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
      {/* --- End of original structure --- */}

      {/* Progress Indicators */}
      <ProgressIndicator />

      {/* Styles (Restored from original prompt) */}
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
          /* Changed position to absolute for smooth transitions */
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 10%;
          box-sizing: border-box; /* Ensure padding doesn't expand slide */
        }

        .text-content {
          color: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 600px;
          /* Added background/blur for better readability */
          z-index: 3; /* Ensure text is above potential overlaps */
        }

        .text-content h2 {
          margin-top: 0; /* Reset default margin */
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .text-content p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        /* Original button styling */
        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          border: none;
          border-radius: 50%; /* Make them circular */
          padding: 10px; /* Adjust padding */
          cursor: pointer;
          display: flex; /* Center icon */
          align-items: center; /* Center icon */
          justify-content: center; /* Center icon */
          z-index: 4; /* Above other content */
          transition: background-color 0.2s ease; /* Smooth hover */
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
          display: block; /* Ensure image behaves correctly */
        }
        /* End original button styling */

        .progress-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3; /* Adjusted z-index to be above placeholder but potentially below buttons if needed */
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: background-color 0.3s ease; /* Smooth transition */
        }

        .indicator.active {
          background-color: white;
        }

        /* Optional: Media query from original for responsiveness */
        @media (max-width: 1024px) {
          .text-content {
            max-width: 75%;
            padding: 1.5rem;
          }
          .text-content h2 {
            font-size: 1.5rem;
          }
          .text-content p {
            font-size: 0.9rem;
          }
          .prev,
          .next {
            padding: 8px;
          }
          .prev img,
          .next img {
            width: 20px;
            height: 20px;
          }
          .indicator {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;

// --------------- NOTE ---------------
// Make sure you have a component named AnimatedButton.js (or .tsx)
// in the same directory (or correct relative path './AnimatedButton')
// that accepts 'href' and 'text' props.
// Example AnimatedButton.js remains the same:
/*
import Link from 'next/link'; // Or your routing library's Link component
import { motion } from 'framer-motion';

const AnimatedButton = ({ href, text }) => {
  // Basic validation for href
  const validHref = typeof href === 'string' ? href : '/'; // Default to '/' if href is not a string

  return (
    <Link href={validHref} passHref legacyBehavior>
        <motion.a
            className="animated-button" // Add some base styling for this class
            whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }} // Example hover
            whileTap={{ scale: 0.95 }}
            style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#007bff', // Example color
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none',
                cursor: 'pointer',
                textAlign: 'center'
            }}
        >
            {text}
        </motion.a>
    </Link>
  );
};

export default AnimatedButton;
*/
