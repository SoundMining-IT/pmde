// PeopleExcellenceData.js

// --- Tab Names (Keep As Is) ---
export const PeopleExellenceTabs = [ // Note: Original data had 'Exellence' spelling
    "Tutoring and Mentorship",
    "Workshops",
    "Networking Opportunities to Stay Ahead",
    "Mine Planning Courses for Practical Expertise"
  ];
  
  // --- Structured Tab Content Data ---
  export const PeopleExcellenceTabData = {
    "Tutoring and Mentorship": {
      type: "simpleText", // Identifier for the content renderer
      title: "Tutoring and Mentorship",
      subtitle: "Empowering Future Leaders in Mining",
      p1Strong: "Strong maths and science results are crucial for leaners aiming for tertiary education and qualifications in the minerals industry.",
      p1Regular: "Our dedicated tutors help students improve their academic performance to meet these essential requirements.",
    },
    "Workshops": {
      type: "simpleText",
      title: "Workshops",
      subtitle: "Advancing Your Career with Expert Training",
      p1Strong: "We offer CPD-accredited, workshop-based courses to enhance your professional development and industry expertise.",
      p1Regular: "Available in-person or online, our courses provide flexible options to help you advance your career.",
    },
    "Networking Opportunities to Stay Ahead": {
      type: "simpleText",
      title: "Networking Opportunities to Stay Ahead",
      subtitle: "", // Original HTML had empty subtitle
      // Combined original left/right text into p1Strong as the right text was empty
      p1Strong: "Our networking offers a valuable networking platform for industry professionals to exchange insights, stay informed on the latest developments, and share opportunities, helping you stay connected and ahead in the industry.",
      p1Regular: "", // No regular text needed based on original structure
    },
    "Mine Planning Courses for Practical Expertise": {
      type: "simpleText",
      title: "Mine Planning Courses for Practical Expertise",
      subtitle: "", // Original HTML had empty subtitle
      p1Strong: "Our mine planning courses, led by experienced professionals, combine academic learning with hands-on experience.",
      p1Regular: "Working on active PMDE projects, you'll gain practical insights to prepare for real-world challenges in mine planning.",
    },
        "Labour Brokering": {
      type: "simpleText",
      title: "Labour Brokering",
      subtitle: "", // Original HTML had empty subtitle
      p1Strong: "Our labour brokering service connects you to skilled professionals across geology, engineering, safety, and operations. This allows you to scale teams quickly, improve delivery speed, and focus internal resources on core activities like exploration and extraction.",
      p1Regular: "We help mining, you access expert talent while reducing costs and increasing flexibility.",
    },
  };
  
  // No need for the old PeopleExcellenceTabContents (HTML string object) anymore