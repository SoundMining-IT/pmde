import { useState, useEffect } from "react";
import AnimatedButton from "./AnimatedButton";

const slides = [
  {
    title: "Corporate Advisory",
    description:
      "We provide independent advisory services, providing expert insights to support funding decisions for banks, equity firms, stock exchanges, funds, and legal firms.",
    icon: "/images/Page-1.svg",
    backgroundIllustration: "/images/bg-illustration1.svg",
    buttonText: "EXPLORE SOLUTIONS",
    link: "/corporate-advisory",
  },
  {
    title: "Technical Expertise",
    description:
      "Our geoscience, engineering, mining, and processing specialists optimise mineral projects, delivering technical solutions that enhance project viability and efficiency.",
    icon: "/images/Group 1221.svg",
    backgroundIllustration: "/images/bg-illustration2.svg",
    buttonText: "EXPLORE SOLUTIONS",
    link: "/technical-expertise",
  },
  {
    title: "Project Management and Execution",
    description:
      "We offer project management and turnkey solutions, ensuring seamless execution, from infrastructure development to site closure and rehabilitation.",
    icon: "/images/content-management_9130095.svg",
    backgroundIllustration: "/images/bg-illustration3.svg",
    buttonText: "EXPLORE SOLUTIONS",
    link: "/project-solutions",
  },
  {
    title: "Social and Environmental Solutions",
    description:
      "We help companies achieve their Sustainability Development Goals and maintain compliance with their Environmental and Social licence to operate.",
    icon: "/images/Group 1229.svg",
    backgroundIllustration: "/images/bg-illustration3.svg",
    buttonText: "EXPLORE SOLUTIONS",
    link: "/social-and-environmental-solutions",
  },
  {
    title: "People Xcellence",
    description:
      "Through tailored education, training, and industry networking, we equip professionals and learners with the skills needed to thrive in the minerals industry.",
    icon: "/images/g5631.svg",
    backgroundIllustration: "/images/bg-illustration3.svg",
    buttonText: "EXPLORE SOLUTIONS",
    link: "/people-excellence",
  },
];

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");

  // A single handler for both next and previous navigation
  const handleNavigation = (direction: any) => {
    // Prevent multiple clicks during an animation
    if (isAnimating) return;

    setIsAnimating(true);
    setFadeState("fade-out");

    // Wait for the fade-out animation (300ms) to complete
    setTimeout(() => {
      // Once invisible, update the index
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % slides.length;
        } else {
          return (prevIndex - 1 + slides.length) % slides.length;
        }
      });

      // Start the fade-in animation for the new content
      setFadeState("fade-in");

      // Wait for the fade-in animation to finish before allowing another click
      // This timeout ensures the full fade cycle completes.
      setTimeout(() => {
        setIsAnimating(false);
      }, 300); // This duration should match the CSS transition duration
    }, 300); // This duration should match the CSS transition duration
  };

  const nextSlide = () => handleNavigation("next");
  const prevSlide = () => handleNavigation("prev");

  return (
    <div className="advisory-carousel">
      <div className="carousel-container">
        <button className="prev" onClick={prevSlide} disabled={isAnimating}>
          <img src="/images/Arrow left.svg" alt="Previous" />
        </button>

        {/* The fadeState class now controls the transition */}
        <div className={`slide ${fadeState}`}>
          <div className="icon-container">
            <img
              // Add a key to force React to re-render the img element on change,
              // preventing any potential flickering or stale image issues.
              key={currentIndex}
              src={slides[currentIndex].icon}
              alt="Slide Icon"
              className="slide-icon"
            />
          </div>

          <div className="text-content">
            <h2>{slides[currentIndex].title}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: slides[currentIndex].description,
              }}
            />
            <div className="cta-button">
              <AnimatedButton
                href={slides[currentIndex].link}
                text={slides[currentIndex].buttonText}
              />
            </div>
          </div>
        </div>

        <button className="next" onClick={nextSlide} disabled={isAnimating}>
          <img src="/images/Arrow right.svg" alt="Next" />
        </button>
      </div>

      {/* The CSS remains the same as it correctly handles the animation */}
      <style jsx>{`
        .advisory-carousel {
          position: relative;
          width: 100%;
        }

        .carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .slide {
          display: flex;
          /* The transition property makes the opacity change smooth */
          transition: opacity 0.3s ease-in-out;
        }

        .fade-in {
          opacity: 1;
        }

        .fade-out {
          opacity: 0;
        }

        .prev,
        .next {
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
          padding: 10px;
        }

        .prev:disabled,
        .next:disabled {
          cursor: wait;
        }
      `}</style>
    </div>
  );
};

export default ServicesCarousel;
