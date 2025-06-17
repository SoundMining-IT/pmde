import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const AnimatedEstablishSection = () => {
  // Animation controls for the main heading
  const headingControls = useAnimation();
  const [headingRef, headingInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animation controls for the red text
  const redTextControls = useAnimation();
  const [redTextRef, redTextInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animation controls for the span text
  const spanTextControls = useAnimation();
  const [spanTextRef, spanTextInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animation controls for the date
  const dateControls = useAnimation();
  const [dateRef, dateInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Update animations when elements come into view
  useEffect(() => {
    if (headingInView) {
      headingControls.start("visible");
    } else {
      headingControls.start("hidden");
    }
  }, [headingControls, headingInView]);

  useEffect(() => {
    if (redTextInView) {
      redTextControls.start("visible");
    } else {
      redTextControls.start("hidden");
    }
  }, [redTextControls, redTextInView]);

  useEffect(() => {
    if (spanTextInView) {
      spanTextControls.start("visible");
    } else {
      spanTextControls.start("hidden");
    }
  }, [spanTextControls, spanTextInView]);

  useEffect(() => {
    if (dateInView) {
      dateControls.start("visible");
    } else {
      dateControls.start("hidden");
    }
  }, [dateControls, dateInView]);

  // Main heading variants
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Red text variants with scale and opacity
  const redTextVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  // Span text variants
  const spanTextVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  // Date variants with a fade up effect
  const dateVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  };

  return (
    <section className="establish-section">
      <div className="flex col ac jc tc establish">
        <motion.h1
          ref={headingRef}
          initial="hidden"
          animate={headingControls}
          variants={headingVariants}
        >
          <h2>
            <motion.span
              id="red-text"
              ref={redTextRef}
              initial="hidden"
              animate={redTextControls}
              variants={redTextVariants}
            >
              PMDE
            </motion.span>{" "}
            is an international, independant <br />
            consultancy{" "}
            <motion.span
              ref={spanTextRef}
              initial="hidden"
              animate={spanTextControls}
              variants={spanTextVariants}
            >
              delivering independent solutions <br /> to the mining industry.
            </motion.span>
          </h2>
        </motion.h1>
        <motion.span
          className="date"
          ref={dateRef}
          initial="hidden"
          animate={dateControls}
          variants={dateVariants}
        >
          Established 2004
        </motion.span>
      </div>
    </section>
  );
};

export default AnimatedEstablishSection;
