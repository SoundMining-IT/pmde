import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import TestimonialCarousel from "./TestimonialCarousel";

// Animation component for h1 elements
const AnimatedH1: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.h1>
  );
};

// Animation component for span elements
const AnimatedSpan: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.span>
  );
};

// Animation wrapper for a section with staggered children
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.section>
  );
};

const AnimatedStatsSection = () => {
  return (
    <AnimatedSection className="testimonials flex col ac jc">
      <div className="stats-graph">
        <div className="flex row ac jc stat-wrapper">
          <div className="flex col ac jc stat-item">
            <AnimatedH1 delay={0}>20+</AnimatedH1>
            <AnimatedSpan delay={0.2}>
              YEARS OF <br /> INDUSTRY EXPERIENCE
            </AnimatedSpan>
          </div>
          <div className="flex col ac jc stat-item">
            <AnimatedH1 delay={0.1}>500+</AnimatedH1>
            <AnimatedSpan delay={0.3}>
              PROJECTS <br /> COMPLETED
            </AnimatedSpan>
          </div>
          <div className="flex col ac jc stat-item">
            <AnimatedH1 delay={0.2}>50+</AnimatedH1>
            <AnimatedSpan delay={0.4}>
              MINERAL <br /> COMMODITIES
            </AnimatedSpan>
          </div>
          <div className="flex col ac jc stat-item">
            <AnimatedH1 delay={0.3}>6</AnimatedH1>
            <AnimatedSpan delay={0.5}>
              CONTINENTS <br /> SERVICED
            </AnimatedSpan>
          </div>
          <div className="flex col ac jc stat-item">
            <AnimatedH1 delay={0.4}>80+</AnimatedH1>
            <AnimatedSpan delay={0.6}>
              MINERAL RESOURCE <br /> AND RESERVE SIGN-OFFS
            </AnimatedSpan>
          </div>
        </div>
      </div>
      <TestimonialCarousel />
      {/* <div className="boulder-bottom" />
      <div className="boulder-top" />
      <div className="boulder-right" /> */}
    </AnimatedSection>
  );
};

export default AnimatedStatsSection;
