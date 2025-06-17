// ProjectSolutionsData.js

// --- Tab Names ---
export const ProjectSolutionsTabs = [
    "Project Management",
    "Infrastructure and Logistics",
    "Project Execution",
];

// --- Items specifically for Project Management Tab ---
export const ProjectSolutionsItems = [
  { inactiveIcon: "/images/Icon1NotSelected1.svg", activeIcon: "/images/Group 1350.svg", label: "Stewardship" },
  { inactiveIcon: "/images/Icon1NotSelected2.svg", activeIcon: "/images/Group 1351.svg", label: "Team" },
  { inactiveIcon: "/images/Icon1NotSelected3.svg", activeIcon: "/images/Group 1352.svg", label: "Stakeholders" },
  { inactiveIcon: "/images/Icon1NotSelected4.svg", activeIcon: "/images/Group 1353.svg", label: "Value" },
  { inactiveIcon: "/images/Icon1NotSelected5.svg", activeIcon: "/images/Group 1354.svg", label: "Systems Thinking" },
  { inactiveIcon: "/images/Icon1NotSelected6.svg", activeIcon: "/images/Group 1361.svg", label: "Leadership" },
  { inactiveIcon: "/images/Icon1NotSelected7.svg", activeIcon: "/images/Group 1360.svg", label: "Tailoring" },
  { inactiveIcon: "/images/Icon1NotSelected8.svg", activeIcon: "/images/Group 1359.svg", label: "Quality" },
  { inactiveIcon: "/images/Icon1NotSelected9.svg", activeIcon: "/images/Group 1358.svg", label: "Complexity" },
  // { inactiveIcon: "/images/Icon1NotSelected10.svg", activeIcon: "/images/Icon1Selected10.svg", label: "Risk" },
  // { inactiveIcon: "/images/Icon1NotSelected11.svg", activeIcon: "/images/Icon1Selected11.svg", label: "Adaptability and Resiliency" },
  // { inactiveIcon: "/images/Icon1NotSelected12.svg", activeIcon: "/images/Icon1Selected12.svg", label: "Change" },
];

// --- Structured Tab Content Data ---
export const ProjectSolutionsTabData = {
  "Project Management": {
    type: "projectManagement", // Unique type identifier
    title: "Project Management",
    subtitle: "GUIDED BY INDUSTRY STANDARDS.",
    p1Strong: "Our project managers adhere to PMBoK principles and hold PMI certifications, blending academic expertise with practical experience.",
    p1Regular: "By following the 12 PMBOK principles, we ensure effective, timely, and cost-efficient project delivery, maintaining high standards of professionalism and risk management to keep your projects on schedule and within budget.",
    items: ProjectSolutionsItems, // Assign the specific items for this tab
  },
  "Infrastructure and Logistics": {
    type: "infrastructure", // Unique type identifier
    title: "Infrastructure and Logistics",
    subtitle: "Comprehensive infrastructure and logistical support",
    // No carousel component needed directly in data, rendered by component
    descriptionStrong: "We deliver the vital infrastructure and logistics required to support the efficient operation of small to medium-sized mining and exploration projects.",
  },
  "Project Execution": {
    type: "projectExecution", // Unique type identifier
    title: "Project Execution",
    subtitle: "Comprehensive operational phase services",
     // No flipcard component needed directly in data, rendered by component
    descriptionStrong: "From construction to closure, we provide end-to-end solutions that ensure your project’s success, safety, and sustainability throughout the operational phase.",
  },
};

// No need for ProjectSolutionsTabContents (the old HTML string object) anymore