import React, { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import AnimatedButton from "./AnimatedButton"; // Assuming this component exists

// 1. Define TeamMember interface
interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedinUrl: string;
  backText: string; // Make it non-optional since all examples have it
}

const teamMembersData: TeamMember[] = [
  {
    name: "VAUGHN",
    title: "Founding Partner & Director",
    image: "/images/Group_1487.webp",
    linkedinUrl: "https://www.linkedin.com/in/vaughn-duke-76596ba/",
    backText:
      "Vaughn brings over 20 years of experience in strategic leadership and business development in the mining sector. He co-founded Sound Mining with a vision to drive innovation and excellence.",
  },
  {
    name: "PIETER",
    title: "Director & Mining Engineer",
    image: "/images/Group_1489.webp",
    linkedinUrl: "https://www.linkedin.com/in/pieter-potgieter-7484822b/",
    backText:
      "Pieter is a seasoned Mining Engineer with expertise in project management and operational efficiency. He plays a key role in delivering value to our clients.",
  },
  {
    name: "DIANA",
    title: "Director & Geologist",
    image: "/images/Group_1490.webp",
    linkedinUrl: "https://www.linkedin.com/in/diana-van-buren-60392a2b/",
    backText:
      "Diana is a highly skilled Geologist with a strong background in resource estimation and exploration. Her insights are crucial for project success.",
  },
  {
    name: "ROCHELLE",
    title: "Director & Mining Engineer",
    image: "/images/Group_1486.webp",
    linkedinUrl: "https://www.linkedin.com/in/rochelle-blunden-013b4990/",
    backText:
      "Rochelle specializes in mine planning and sustainable mining practices. She is dedicated to implementing innovative solutions for complex challenges.",
  },
  {
    name: "NICHOLAS",
    title: "Director & Geologist",
    image: "/images/Group_1488.webp",
    linkedinUrl: "https://www.linkedin.com/in/nicholas-weeks-44aaa6168/",
    backText:
      "Nicholas has extensive experience in geological modeling and data analysis. He contributes significantly to the technical excellence of our projects.",
  },
];

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersData); // 3. Type teamMembers state
  // const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>(
  //   {}
  // ); // 4. Type flippedStates

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // const toggleFlip = (index: number) => {
  //   // 5. Type 'index' parameter
  //   setFlippedStates((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  if (teamMembers.length === 0) {
    return (
      <div
        className="team-carousel-container"
        style={{
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>No team members to display at the moment.</p>
      </div>
    );
  }

  const N = teamMembers.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? N - 1 : prev - 1));
  };

  const nextSlide = () => {
    // Mistake in original: should be prev + 1 for next
    setCurrentIndex((prev) => (prev === N - 1 ? 0 : prev + 1));
  };

  // 6. Type parameters for renderCardContent
  const renderCardContent = (
    member: TeamMember,
    originalMemberIndex: number // Kept for consistency, though not used for flipping
  ) => {
    return (
      // The main container no longer needs an onClick or dynamic 'flipped' class
      <div className="flip-card">
        <div
          className="flip-card-front"
          style={{
            backgroundImage: `url(${member.image})`,
          }}
        >
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn profile of ${member.name}`}
            className="linkedin-icon-link"
            // We removed the stopPropagation as the parent click is also gone
          >
            <div className="linkedin-icon">
              <FaLinkedin />
            </div>
          </a>
        </div>
        {/* The entire flip-card-back element has been removed */}
      </div>
    );
  };

  const renderDesktopView = () => {
    const numVisibleDesktop = 3;
    let membersToDisplay: TeamMember[] = []; // 7. Type membersToDisplay

    if (N > 0) {
      if (N <= numVisibleDesktop) {
        membersToDisplay = [...teamMembers];
      } else {
        for (let i = 0; i < numVisibleDesktop; i++) {
          membersToDisplay.push(teamMembers[(currentIndex + i) % N]);
        }
      }
    }
    const showDesktopNavButtons = N > numVisibleDesktop;

    return (
      <>
        {showDesktopNavButtons && (
          <button className="nav-button left" onClick={prevSlide}>
            <img src="/images/Arrow left.svg" alt="Previous" />
          </button>
        )}

        <div className="team-carousel">
          {/* 8. Type 'member' and 'displayIdx' in map */}
          {membersToDisplay.map((member: TeamMember, displayIdx: number) => {
            // This logic to find originalMemberIndex is a bit complex
            // A simpler way might be to pass the actual original index or a unique ID
            // if membersToDisplay can be reordered or filtered in complex ways.
            // For now, this logic should get an index, but ensure it's what you intend.
            const actualMember =
              N <= numVisibleDesktop
                ? teamMembers[displayIdx]
                : teamMembers[(currentIndex + displayIdx) % N];
            const actualOriginalIndex = teamMembers.indexOf(actualMember);

            return (
              <div
                key={actualOriginalIndex} // Use original index from the main teamMembers array
                className={`team-member-item flex col ac jc tc ${
                  N > numVisibleDesktop && displayIdx === 0 ? "active-main" : ""
                }`}
              >
                {renderCardContent(member, actualOriginalIndex)}
                <p className="name">{member.name}</p>
                <p className="title">{member.title}</p>
              </div>
            );
          })}
        </div>

        {showDesktopNavButtons && (
          <button className="nav-button right" onClick={nextSlide}>
            <img src="/images/Arrow right.svg" alt="Next" />
          </button>
        )}
      </>
    );
  };

  const renderMobileView = () => {
    const currentMember = teamMembers[currentIndex];
    const showMobileNavButtons = N > 1;

    return (
      <>
        <div className="mobile-navigation">
          {showMobileNavButtons ? (
            <button className="nav-button left mobile-nav" onClick={prevSlide}>
              <img src="/images/Arrow left.svg" alt="Previous" />
            </button>
          ) : (
            <div className="nav-button-placeholder"></div>
          )}

          <div className="mobile-carousel">
            <div className="team-member-item" key={currentIndex}>
              {renderCardContent(currentMember, currentIndex)}
              <p className="name">{currentMember.name}</p>
              <p className="title">{currentMember.title}</p>
            </div>
          </div>

          {showMobileNavButtons ? (
            <button className="nav-button right mobile-nav" onClick={nextSlide}>
              <img src="/images/Arrow right.svg" alt="Next" />
            </button>
          ) : (
            <div className="nav-button-placeholder"></div>
          )}
        </div>

        {N > 1 && (
          <div className="slide-indicators">
            {/* 9. Type 'index' in map */}
            {teamMembers.map((_, index: number) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="team-carousel-container">
      {isMobile ? renderMobileView() : renderDesktopView()}

      <div className="cta-button" style={{ paddingTop: "60px" }}>
        <AnimatedButton
          href="https://www.linkedin.com/company/soundmining/"
          text="Connect With Our Team"
        />
      </div>

      <style jsx>{`
        .team-carousel-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          position: relative;
          padding: 0 60px;
          width: 100%;
          box-sizing: border-box;
          min-height: 350px;
        }

        .team-carousel {
          display: flex;
          gap: 20px;
          width: auto;
          max-width: calc(
            3 * 150px + 2 * 20px
          ); /* 3 cards (150px each) + 2 gaps (20px each) = 490px */
          justify-content: center;
          align-items: flex-start;
        }

        .team-member-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          flex-shrink: 0;
        }

        .flip-card {
          background-color: transparent;
          width: 150px;
          height: 200px;
          perspective: 1000px;
          cursor: pointer;
          border-radius: 8px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .flip-card-front {
          background-size: cover;
          background-position: center;
          color: white;
        }

        .flip-card-back {
          background-color: #900d23;
          color: white;
          transform: rotateY(180deg);
          padding: 15px;
          box-sizing: border-box;
        }

        .flip-card-back .back-text-content {
          font-size: 0.8rem;
          line-height: 1.4;
          text-align: center;
          max-width: 70%;
        }

        .flip-card-back .back-name {
          font-weight: bold;
          font-size: 1rem;
          margin-bottom: 5px;
        }
        .flip-card-back .back-title {
          font-size: 0.85rem;
        }

        .linkedin-icon-link {
          display: block;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
        }

        .linkedin-icon {
          background: #0077b5;
          color: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .linkedin-icon svg {
          font-size: 16px;
        }

        .name {
          font-weight: bold;
          margin-top: 12px;
          font-size: 1rem;
          color: #333;
        }

        .title {
          font-size: 0.8rem;
          color: #666;
          margin-top: 4px;
        }

        .nav-button {
          position: absolute;
          top: 80px;
          background: none;
          border: 2px solid #900d23;
          color: #900d23;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .nav-button:hover {
          background-color: #900d23;
          color: white;
        }
        .nav-button:hover img {
          filter: brightness(0) invert(1);
        }

        .nav-button img {
          width: 12px;
          height: 12px;
        }

        .nav-button.left {
          left: 10px;
        }

        .nav-button.right {
          right: 10px;
        }

        .nav-button-placeholder {
          width: 35px;
          height: 35px;
        }

        @media (max-width: 768px) {
          .team-carousel-container {
            padding: 0 10px;
            gap: 15px;
          }
          .team-carousel {
            display: none;
          }
          .nav-button.left:not(.mobile-nav),
          .nav-button.right:not(.mobile-nav) {
            display: none;
          }
          .mobile-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          .mobile-navigation .nav-button.mobile-nav {
            display: flex;
            position: static;
            transform: none;
            left: auto;
            right: auto;
            top: auto;
            width: 35px;
            height: 35px;
          }
          .mobile-carousel {
            display: flex;
            justify-content: center;
            flex: 1;
            margin: 0 5px;
          }
          .slide-indicators {
            display: flex;
            justify-content: center;
            margin-top: 15px;
          }
          .indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ccc;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .indicator.active {
            background: #900d23;
          }
        }

        @media (min-width: 769px) {
          .mobile-navigation,
          .slide-indicators,
          .nav-button-placeholder {
            display: none;
          }
          .team-carousel {
            display: flex;
          }
          .nav-button.left:not(.mobile-nav),
          .nav-button.right:not(.mobile-nav) {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamCarousel;
