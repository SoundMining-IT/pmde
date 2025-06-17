import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    text: "INNOVATIVE SOLUTIONS",
    subtext:
      "WE ARE INNOVATIVE THINKERS AND TRUSTED ADVISORS FOR YOUR PROJECTS.",
    description:
      "Our independent, forward-thinking solutions enhance project value and strengthen your business, helping you stay ahead in the competitive minerals industry.",
    leftImage: "/images/Side.webp",
    rightImage: "/images/Why-Choose-Us__0001_Layer-19.webp",
  },
  {
    id: 2,
    text: "EXPERT GUIDANCE",
    subtext:
      "We are trusted advisors and competent professionals for your projects.",
    description:
      "Our experience and insight ensure informed decisions at every stage of your mining project, guiding you through industry complexities.",
    leftImage: "/images/Why-Choose-Us__0003_Layer-17.webp",
    rightImage: "/images/Why-Choose-Us__0004_Layer-15.webp",
  },
  {
    id: 3,
    text: "Unwavering Commitment",
    subtext:
      "We uphold the highest standards of business conduct for your benefit.",
    description:
      "Our strong work ethic and commitment to excellence ensure results that consistently exceed your expectations.",
    leftImage: "/images/Why-Choose-Us__0005_Layer-14.webp",
    rightImage: "/images/Why-Choose-Us__0006_Layer-13.webp",
  },
  {
    id: 4,
    text: "Operational Excellence",
    subtext: "We prioritise quality in every aspect of our work. ",
    description:
      "Our structured quality system ensures efficient, precise solutions that consistently meet and exceed your requirements, driving operational excellence.",
    leftImage: "/images/Why-Choose-Us__0008_Layer-10.webp",
    rightImage: "/images/Why-Choose-Us__0009_Layer-0.webp",
  },
  // {
  //   id: 5,
  //   text: "Integrity First",
  //   subtext: "Integrity is at the heart of everything we do. ",
  //   description:
  //     "We build relationships based on honesty, professionalism, and trust, ensuring ethical conduct and transparency in every interaction, giving you confidence.",
  //   leftImage: "/images/integrity-left.jpg",
  //   rightImage: "/images/integrity-right.jpg",
  // },
];

const ChooseUsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Get current slide images
  const currentSlide = slides[currentIndex];
  const leftBackgroundStyle = {
    backgroundImage: `url(${currentSlide.leftImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out",
  };

  const rightBackgroundStyle = {
    backgroundImage: `url(${currentSlide.rightImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out",
  };

  return (
    <div className="carousel-container">
      <button className="nav-button left" onClick={prevSlide}>
        <img src="/images/Arrow left.svg" alt="Previous" />
      </button>

      <div className="carousel">
        <div className="side-block left" style={leftBackgroundStyle}></div>

        <div className="text-box">
          <h2 className="main-text">{currentSlide.text}</h2>
          <h3 className="sub-text">{currentSlide.subtext}</h3>
          <p className="description">{currentSlide.description}</p>
        </div>

        <div className="side-block right" style={rightBackgroundStyle}></div>
      </div>

      <button className="nav-button right" onClick={nextSlide}>
        <img src="/images/Arrow right.svg" alt="Next" />
      </button>

      {/* <div className="slide-number">{currentIndex + 1}</div> */}
    </div>
  );
};

export default ChooseUsCarousel;
