import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Your testimonials data remains the same
const testimonials = [
  {
    text: '"Over the years, PMDE have provided valuable technical and investment advice on precious and base metal assets in Africa. Their local insight greatly supported informed investment decisions in the region."',
    name: "Phil Wilson",
    job: "Retired VP Technical",
    company: "FRANCO NEVADA CORPORATION",
    corp: "",
  },
  {
    text: '"Worked closely with lenders and stakeholders to deliver bankable studies, in line with recognised industry policies and guidelines."',
    name: "Beverly Mona",
    job: "Technical Lead",
    company: "MINING INVESTMENTS,",
    corp: "INDUSTRIAL DEVELOPMENT CORPORATION",
  },
  {
    text: '"PMDE has been a trusted technical partner to Sedibelo Resources for over a decade, delivering strategic plans, cost-effective designs and reserve sign-offs for both open-pit and underground operations."',
    name: "Aart Broekhuizen",
    job: "Executive",
    company: "Sedibelo Resources Limited",
    corp: "",
  },
  {
    text: '"Highly recommend PMDE for their deep expertise and reliable project evaluations. Their insights and innovative thinking consistently drive efficiency and sustainable practices."',
    name: "Rob Ingram",
    job: "Independent advisor",
    company: "JSE",
    corp: "",
  },

  {
    text: '"I\'ve worked with PMDE several times and always found them professional and reliable. They define clear strategies and deliver detailed, high-quality outputs while aligning with client expectations."',
    name: "Richard Thomas",
    job: "COO",
    company: "Aris Mining",
    corp: "Canada, South America",
  },
  {
    text: '"I’ve relied on PMDE across roles and companies for 20 years. Their experienced team, trusted leadership and consistent delivery make them my go-to partner for technical services."',
    name: "Richard Tayelor",
    job: "Chief Investment Officer",
    company: "Horizon Corporation",
    corp: "London",
  },
  {
    text: '"PMDE plays a key role in engineering education, offering our students practical experience and strong mentorship. Their ongoing support helps bridge the gap between theory and industry."',
    name: "Prof Schalk Kok",
    job: "Chair",
    company: "School of Engineering",
    corp: "University of Pretoria",
  },
];

// Animation variants for the slide transition
const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000, // Start off-screen
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0, // Move to center
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000, // Exit off-screen
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    };
  },
};

const TestimonialCarousel = () => {
  const [[currentIndex, direction], setPage] = useState([0, 0]); // [index, direction]

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    // Wrap around using modulo
    if (newIndex < 0) {
      newIndex = testimonials.length - 1;
    } else if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    setPage([newIndex, newDirection]);
  };

  // Get the current testimonial object safely
  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <div className="testimonial-carousel-redesign">
      {/* Background Image - Replace with your actual image */}
      <div
        className="background-image"
        style={{ backgroundImage: `url('/path/to/your/mine-background.jpg')` }}
      ></div>

      {/* Content Box and Navigation */}
      <div className="carousel-content-area">
        {/* Previous Button */}
        <motion.button
          className="arrow prev"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous testimonial"
          style={{
            background: "none",
            border: "none",
            width: "100px",
            height: "100px",
            cursor: "pointer",
          }}
        >
          {/* SVG for left arrow */}
          <img
            src="/images/Arrow Left.svg"
            alt="Next"
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: "50%",
            }}
          />
        </motion.button>

        {/* White Content Box */}
        <div className="content-box">
          <div
            className="quotes"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 999 }}
          >
            <img src="/images/quote.svg" alt="Quote" />
          </div>{" "}
          {/* Using a simple quote character */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex} // Important for AnimatePresence to detect changes
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="testimonial-slide"
            >
              <p className="text">{currentTestimonial.text}</p>
              {/* <div className="author-details">
                <span className="name">
                  {currentTestimonial.name?.toUpperCase()}
                </span>
                <span className="job-company">
                  {currentTestimonial.job && `${currentTestimonial.job}, `}
                  {currentTestimonial.company}
                  {currentTestimonial.corp && ` (${currentTestimonial.corp})`}
                </span>
              </div> */}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <motion.button
          className="arrow next"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next testimonial"
          style={{
            background: "none",
            border: "none",
            width: "100px",
            height: "100px",
            cursor: "pointer",
          }}
        >
          {/* SVG for right arrow */}
          <img
            src="/images/Arrow Right.svg"
            alt="Next"
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: "50%",
            }}
          />
        </motion.button>
      </div>

      {/* Optional: Progress Indicators */}
      <div className="progress-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .testimonial-carousel-redesign {
          position: relative;
          width: 100%;
          /* Adjust height or use aspect-ratio as needed */
          height: 500px;
          overflow: hidden; /* Hide overflowing animation */
          display: flex; /* Center content area */
          justify-content: center;
          align-items: center;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 1;
          /* Add a filter if needed */
          /* filter: brightness(0.8); */
        }

        .carousel-content-area {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between; /* Space out arrows and box */
          width: 90%; /* Control overall width */
          max-width: 1000px; /* Max width of the central area */
        }

        .content-box {
          overflow: visible;
          position: relative;
          background-color: rgba(
            255,
            255,
            255,
            0.9
          ); /* Semi-transparent white */
          padding: 40px 60px 60px 60px; /* Top, R/L, Bottom */
          border-radius: 0px;
          width: 70%; /* Width relative to carousel-content-area */
          height: 350px; /* Ensure minimum height */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: flex; /* For centering slide content */
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .testimonial-slide {
          width: 100%; /* Take full width of content-box padding */
          position: absolute; /* Needed for AnimatePresence transitions */
        }

        .text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #2d3748; /* Dark text color */
          margin-top: 30px; /* Space below quotes */
          margin-bottom: 30px;
          font-style: italic;
        }

        .author-details {
          margin-top: auto; /* Push to bottom if content is short */
        }

        .name {
          display: block;
          font-weight: bold;
          color: #c53030; /* Red color like example */
          font-size: 1rem;
          margin-bottom: 5px;
          letter-spacing: 0.5px;
        }

        .job-company {
          display: block;
          font-size: 0.9rem;
          color: #4a5568; /* Slightly lighter gray */
        }

        .arrow {
          background: none;
          border: none;

          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 3;

          flex-shrink: 0; /* Prevent arrows from shrinking */
        }

        .arrow:active {
          transform: scale(0.95); /* Slight shrink on click */
        }

        .prev {
          /* Position adjusted by flex justify-content */
        }
        .next {
          /* Position adjusted by flex justify-content */
          transform: scaleX(-1); /* Flip the right arrow SVG */
        }

        .progress-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;
          padding: 0;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .indicator.active {
          background-color: #c53030; /* Red for active */
          border-color: #c53030;
          transform: scale(1.2);
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .testimonial-carousel-redesign {
            height: auto; /* Allow height to adjust */
            min-height: 450px;
            padding-bottom: 60px; /* Space for indicators */
          }
          .carousel-content-area {
            width: 95%;
            flex-direction: column; /* Stack box and arrows */
          }
          .content-box {
            width: 100%; /* Full width on small screens */
            padding: 30px 20px 40px 20px;
            order: 2; /* Box below arrows */
            min-height: 200px;
          }

          .text {
            font-size: 1rem;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .arrow {
            position: absolute; /* Position arrows absolutely */
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            order: 1; /* Arrows above box */
          }
          .prev {
            left: 5px;
          }
          .next {
            right: 5px;
            transform: scaleX(-1) translateY(-50%); /* Keep flipped */
          }
          .carousel-content-area > .arrow:first-of-type {
            /* Target prev specifically if needed */
            margin-bottom: 0;
          }
          .carousel-content-area > .arrow:last-of-type {
            /* Target next specifically if needed */
            margin-top: 0;
          }
          .progress-indicators {
            bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;
