import React, { useState, useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton"; // Assuming this component is SSR-safe
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic"; // Import next/dynamic

// Dynamically import Lottie, ensuring it's not part of the SSR/SSG bundle
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false, // This is the crucial part
  // Optional: you can add a loading component here if the Lottie player itself takes time to load
  // loading: () => <p style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Lottie Player...</p>
});

const slides = [
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "Our professional geologists are experienced across all commodities, delivering services from target generation and exploration programmes to geological modelling and Resource estimation.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/11.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Exploration and Geology",
    imagePath: "",
    link: "/technical-expertise",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "We provide a range of environmental solutions alongside social and stakeholder engagement services—critical for securing and maintaining a mining operation’s social and environmental licence to operate.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/2.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Environmental and Social",
    imagePath: "",
    link: "/social-and-environmental-solutions",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "At Sound Mining, our design specialists collaborate across disciplines to create integrated designs backed by extensive experience and proprietary knowledge, delivering unrivalled results.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/3.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Mine Design",
    imagePath: "",
    link: "/corporate-advisory",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "Our production scheduling and integrated planning solutions are designed to balance practicality, strategic goals, and financial requirements—both in the short term and across the Life of Mine.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/4.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Scheduling",
    imagePath: "",
    link: "/corporate-advisory",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "Choosing the right equipment is critical. We assess capacity, efficiency, and the latest technologies, ensuring every selection enhances operational performance while aligning with project requirements and future advancements.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/5.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Equipment Selection",
    imagePath: "",
    link: "/technical-expertise",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "Efficient logistics enable seamless operations. Through detailed trade-off studies, we develop optimal techno-economic solutions for workforce movement, material transport, and broken rock handling.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/6.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Materials Handling",
    imagePath: "",
    link: "/project-solutions",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "We collaborate closely with all stakeholders to ensure workforce needs are met throughout the Life of Mine. Guided by the Social and Labour Plan, we focus on upskilling and empowering the local community.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/7.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Workforce and Material ",
    imagePath: "",
    link: "/people-excellence",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "Accurate cost estimation is key to profitable mining. We use fit-for-purpose software to generate capital and operating costs across the Life of Mine.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/8.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Cost Estimation",
    imagePath: "",
    link: "/technical-expertise",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "Our expert valuators assess mineral assets to determine economic viability, project value, and guide strategic decisions. We adhere to international reporting standards and actively contribute to global valuation committees.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/9.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Financial Modeling",
    imagePath: "",
    link: "/project-solutions",
  },
  {
    title: "END-TO-END ADVISORY ACROSS THE MINING LIFECYCLE",
    description:
      "We implement closure plans during and after mine life, covering land rehabilitation, water management, and ecological restoration to meet regulatory requirements. Our expertise includes environmental monitoring, compliance, and reporting.",
    backgroundImage: "/images/LottieBackground.webp",
    animationPath: "/lotties/10.json",
    buttonText: "LEARN MORE",
    bottomHeader: "Mine Closure",
    imagePath: "",
    link: "/technical-expertise",
  },
];

const lottieCache = new Map();

const MiningCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnimationData, setCurrentAnimationData] = useState(null);
  const [isLoadingSlideContent, setIsLoadingSlideContent] = useState(true);
  const [isGloballyPreloading, setIsGloballyPreloading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const preloadAllLotties = async () => {
      setIsGloballyPreloading(true);
      const lottieSlidesToPreload = slides.filter(
        (slide) =>
          slide.animationPath &&
          !slide.imagePath &&
          !lottieCache.has(slide.animationPath)
      );

      const preloadPromises = lottieSlidesToPreload.map(async (slide) => {
        try {
          // Ensure fetch paths are correct for your public directory structure
          // e.g., if lotties are in public/lotties/1.json, then '/lotties/1.json' is correct
          const response = await fetch(slide.animationPath);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ${slide.animationPath}: ${response.statusText}`
            );
          }
          const data = await response.json();
          if (isMounted) {
            lottieCache.set(slide.animationPath, data);
          }
        } catch (error) {
          console.error(
            `Error preloading Lottie for ${slide.bottomHeader} (${slide.animationPath}):`,
            error
          );
        }
      });

      await Promise.allSettled(preloadPromises);

      if (isMounted) {
        setIsGloballyPreloading(false);
      }
    };

    preloadAllLotties();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingSlideContent(true);
    setCurrentAnimationData(null);

    const slide = slides[currentIndex];

    if (slide.imagePath && slide.imagePath.trim() !== "") {
      setCurrentAnimationData(null);
      if (isMounted) setIsLoadingSlideContent(false);
      return;
    }

    if (slide.animationPath) {
      if (lottieCache.has(slide.animationPath)) {
        const cachedData = lottieCache.get(slide.animationPath);
        if (cachedData) {
          if (isMounted) {
            setCurrentAnimationData(cachedData);
            setIsLoadingSlideContent(false);
          }
        } else {
          console.warn(
            `Lottie data for ${slide.animationPath} not found in cache or failed to load.`
          );
          if (isMounted) setIsLoadingSlideContent(false);
        }
      } else if (!isGloballyPreloading) {
        console.warn(
          `Lottie ${slide.animationPath} not found in cache. Fetching on-demand.`
        );
        const fetchOnDemand = async () => {
          try {
            const response = await fetch(slide.animationPath);
            if (!response.ok)
              throw new Error(`On-demand fetch failed: ${response.statusText}`);
            const data = await response.json();
            if (isMounted) {
              lottieCache.set(slide.animationPath, data);
              setCurrentAnimationData(data);
            }
          } catch (error) {
            console.error(
              `Error fetching Lottie on-demand for ${slide.animationPath}:`,
              error
            );
          } finally {
            if (isMounted) setIsLoadingSlideContent(false);
          }
        };
        fetchOnDemand();
      }
    } else {
      if (isMounted) setIsLoadingSlideContent(false);
    }

    return () => {
      isMounted = false;
    };
  }, [currentIndex, isGloballyPreloading]);

  const FadeInText: React.FC<{ children: React.ReactNode; delay?: number }> = ({
    children,
    delay = 0,
  }) => {
    const ref = useRef(null);
    // useInView is generally SSR-safe with Framer Motion
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
      <motion.div
        key={currentIndex + (children?.toString().substring(0, 20) || "")}
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentIndex];

  if (
    isGloballyPreloading &&
    slides[0]?.animationPath &&
    !lottieCache.has(slides[0].animationPath) &&
    !slides[0]?.imagePath
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Or a more appropriate height for your carousel
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Preparing animations, please wait...
      </div>
    );
  }

  return (
    <div className="mining-carousel">
      <div
        className="carousel-background"
        style={{
          backgroundImage: `url(${currentSlideData.backgroundImage})`,
          transition: "background-image 0.5s ease-in-out",
        }}
      />

      <div className="carousel-content">
        <button
          className="prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <img src="/images/Arrow left.svg" alt="Previous" />
        </button>

        <div className="info-box">
          <FadeInText>
            <div className="free-form-text">
              <h1>{currentSlideData.bottomHeader}</h1>
            </div>
            <h2
              className="mining-title"
              style={{
                paddingTop: "calc(50vh - 250px)",
                fontWeight: "bold",
                minHeight: "60px",
              }}
            >
              {currentSlideData.title}
            </h2>
            <FadeInText delay={0.3}>
              <p style={{ minHeight: "100px" }}>
                {currentSlideData.description}
              </p>
            </FadeInText>
          </FadeInText>

          <FadeInText delay={0.15}>
            <div
              className="lottie-container"
              style={{
                minHeight: "200px",
                paddingBlock: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {currentSlideData.imagePath &&
              currentSlideData.imagePath.trim() !== "" ? (
                <img
                  key={currentSlideData.imagePath}
                  src={currentSlideData.imagePath}
                  alt={currentSlideData.bottomHeader}
                  style={{
                    maxHeight: "200px",
                    maxWidth: "400px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              ) : isLoadingSlideContent ? (
                <div className="loading-animation">Loading Animation...</div>
              ) : currentAnimationData ? (
                // Lottie component will only be rendered client-side
                // because of the dynamic import with ssr: false
                <Lottie
                  animationData={currentAnimationData}
                  loop
                  autoPlay // Lottie prop is autoPlay (camelCase)
                  style={{ height: 200, width: 400 }}
                />
              ) : (
                <div className="animation-fallback">
                  Animation not available
                </div>
              )}
            </div>
          </FadeInText>

          <div className="cta-button" style={{ marginTop: "20px" }}>
            <AnimatedButton
              text={currentSlideData.buttonText}
              href={currentSlideData.link}
            />
          </div>
        </div>

        <button className="next" onClick={nextSlide} aria-label="Next slide">
          <img src="/images/Arrow right.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default MiningCarousel;
