import Link from "next/link";
import Footer from "./Footer";
import AnimatedButton from "./AnimatedButton";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const CTABanner = () => {
  // Animation controls for left slide
  const leftControls = useAnimation();
  const [leftRef, leftInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animation controls for right slide
  const rightControls = useAnimation();
  const [rightRef, rightInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Update animations when elements come into view
  useEffect(() => {
    if (leftInView) {
      leftControls.start("visible");
    } else {
      leftControls.start("hidden");
    }
  }, [leftControls, leftInView]);

  useEffect(() => {
    if (rightInView) {
      rightControls.start("visible");
    } else {
      rightControls.start("hidden");
    }
  }, [rightControls, rightInView]);

  // Animation variants
  const leftVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightVariants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2, // Slight delay for staggered effect
      },
    },
  };

  return (
    <div className="cta-footer">
      <section className="cta-banner">
        <div className="container">
          <motion.div
            className="cta-text"
            ref={leftRef}
            initial="hidden"
            animate={leftControls}
            variants={leftVariants}
          >
            <h2 className="tr">
              READY TO <br />
              <span>
                REALISE YOUR
                <br /> MINING PROJECT'S <br /> POTENTIAL?
              </span>
            </h2>
          </motion.div>
          <motion.div
            className="cta-action"
            ref={rightRef}
            initial="hidden"
            animate={rightControls}
            variants={rightVariants}
          >
            <h3>
              CONTACT US <br /> TO GET STARTED
            </h3>
            <div style={{ marginTop: "20px" }}>
              <AnimatedButton href="/contact" text="Get in touch" />
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CTABanner;
