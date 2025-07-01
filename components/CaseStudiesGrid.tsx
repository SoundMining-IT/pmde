import React from "react";
import Head from "next/head";
import Link from "next/link";

// Define the type for a single case study
interface CaseStudy {
  id: string;
  title: string;
  image: string;
  alt: string;
  link?: string; // Optional link property
}

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({ caseStudies }) => {
  return (
    <>
      <Head>
        <style>{`
          .case-studies-container {
            padding: 20px;
          }
          
          .case-studies-inner {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .case-studies-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
           column-gap: 16px;
            row-gap: 44px;     
          }
          
          .case-study-card {
            border-radius: 8px;
            width: 250px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
         background-color: var(--color4);
            height: 340px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            position: relative;
          }
          
          .case-study-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          
          .case-study-card:active {
            transform: translateY(0);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          
          .case-study-image-wrapper {
            width: 100%;
            height: 0;
            padding-bottom: 75%; /* 4:3 aspect ratio */
            position: relative;
            overflow: hidden;
          }
          
          .case-study-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .case-study-card:hover .case-study-image {
            transform: scale(1.05);
          }
          
          .case-study-title-container {
            padding: 10px;
            background-color: var(--color4);
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60px;
            position: relative;
            z-index: 2;
            transition: background-color 0.3s ease;
          }
          
          .case-study-card:hover .case-study-title-container {
            background-color: #d8d8d8;
          }
          
          .case-study-title {
            font-size: var(--text-medium, 12px);
            text-align: center;
            font-weight: 600;
            margin: 0;
            line-height: 1.3;
            color: #333;
            max-width: 80%;
            transition: color 0.3s ease;
          }
          
          .case-study-card:hover .case-study-title {
            color: #000;
          }
          
          .case-study-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0);
            transition: background-color 0.3s ease;
            z-index: 1;
          }
          
          .case-study-card:hover .case-study-overlay {
            background-color: rgba(0,0,0,0.05);
          }
          
          @media (max-width: 1024px) {
            .case-studies-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 640px) {
            .case-studies-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Head>

      <div className="case-studies-container">
        <div className="case-studies-inner">
          <div className="case-studies-grid">
            {caseStudies.map((study) => (
              <Link
                href={study.link || `/case-studies/${study.id}`}
                key={study.id}
                passHref
              >
                <div
                  className="case-study-card"
                  onClick={() =>
                    console.log(`Clicked on case study: ${study.title}`)
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`Read more about ${study.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      console.log(`Keyboard interaction with: ${study.title}`);
                    }
                  }}
                >
                  <div className="case-study-overlay"></div>
                  <div className="case-study-image-wrapper">
                    <img
                      src={study.image}
                      alt={study.alt}
                      className="case-study-image"
                    />
                  </div>
                  <div className="case-study-title-container">
                    <p className="case-study-title">{study.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Complete sample data with all 11 case studies
const miningCaseStudies = [
  {
    id: "1",
    title:
      "Ensuring Operational Continuity for Magnetite Mine in Steelpoort, South Africa",
    image: "/updatedImages/Blog1.webp",
    alt: "Worker in orange safety vest examining documents",
    link: "/case-studies/ensuring-operational-continuity-for-magnetite-mine-in-steelpoort-south-africa",
  },
  {
    id: "2",
    title: "Addressing Drillhole Backlogs to Enhance Mineral Resource Accuracy",
    image: "/updatedImages/Blog2.webp",
    alt: "Excavators at a mining site",
    link: "/case-studies/addressing-drillhole-backlogs-to-enhance-mineral-resource-accuracy",
  },
  {
    id: "3",
    title:
      "Comprehensive Support for Vanadium Mine Development, Driving Project Value to $1.05 billion",
    image: "/updatedImages/Blog12.webp",
    alt: "Yellow mining trucks on a road",
    link: "/case-studies/comprehensive-support-for-vanadium-mine-development-driving-project-value-to-1-05",
  },
  {
    id: "4",
    title:
      "Optimising Iron Ore Mine Planning for Increased Production and Efficiency",
    image: "/updatedImages/Blog13.webp",
    alt: "Mining equipment at an iron ore mine",
    link: "/case-studies/optimising-iron-ore-mine-planning-for-increased-production-and-efficiency",
  },
  {
    id: "5",
    title:
      "Innovative Tunnel Design for Environmentally Sensitive Iron Ore Mining",
    image: "/updatedImages/Blog14.webp",
    alt: "Mining tunnel",
    link: "/case-studies/innovative-tunnel-design-for-environmentally-sensitive-iron-ore-mining",
  },
  {
    id: "6",
    title: "Strategic Turnaround for Improved Manganese Mine Performance",
    image: "/updatedImages/Blog6.webp",
    alt: "Mining site with machinery",
    link: "/case-studies/strategic-turnaround-for-improved-manganese-mine-performance",
  },
  {
    id: "7",
    title:
      "Transforming Operational and Financial Stability Through Strategic Change Management",
    image: "/updatedImages/Blog7.webp",
    alt: "Workers in safety gear at a mining site",
    link: "/case-studies/transforming-operational-and-financial-stability-through-strategic-change-management",
  },
  {
    id: "8",
    title:
      "Strategic Management and Competent Person Sign-Off for Tailings Reclamation",
    image: "/images/insights5.webp",
    alt: "Mining equipment",
    link: "/case-studies/strategic-management-and-competent-person-sign-off-for-tailings-reclamation",
  },
  {
    id: "9",
    title: "Drill and Blast Assessment for New Mining Operation",
    image: "/updatedImages/Blog15.webp",
    alt: "Environmental assessment at mining site",
    link: "/case-studies/environmental-impact-assessment-for-new-mining-operation",
  },
  {
    id: "10",
    title: "Workplace Safety Strategy for Underground Coal Mine",
    image: "/updatedImages/Blog10.webp",
    alt: "Underground coal mining operation",
    link: "/case-studies/cost-optimization-strategy-for-underground-coal-mine",
  },
  {
    id: "11",
    title: "Labour Brokering Framework for Platinum Group Metal Extraction",
    image: "/updatedImages/Blog11.webp",
    alt: "Platinum mining operation",
    link: "/case-studies/risk-management-framework-for-platinum-group-metal-extraction",
  },
];

const CaseStudiesExample = () => {
  return <CaseStudiesGrid caseStudies={miningCaseStudies} />;
};

export default CaseStudiesExample;
