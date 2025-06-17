import React from "react";

// Define props for the mobile hero
interface HeroMobileProps {
  backgroundImage?: string; // Optional background image URL
  title: string; // Required title
  subtitle?: string; // Optional subtitle
  description?: string; // Optional description
}

const HeroMobile: React.FC<HeroMobileProps> = ({
  backgroundImage, // Destructure props
  title,
  subtitle,
  description,
}) => {
  return (
    <section
      className="hero-mobile section-wrapper mobile"
      style={{
        width: "100vw",
        // --- Layout & Sizing ---
        position: "relative",
        minHeight: "300px", // Adjust height as needed for mobile
        display: "flex",
        alignItems: "center", // Vertically center content container
        justifyContent: "center", // Horizontally center content container
        padding: "1.5rem", // Internal spacing

        // --- Background Image ---
        // Use the prop if provided, otherwise fallback (e.g., to a color or nothing)
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        // Add a fallback background color if image might not load or isn't provided
        backgroundColor: "#333", // Example dark fallback color
      }}
    >
      {/* Content Container */}
      <div
        className="hero-mobile-content"
        style={{
          // --- Text Alignment & Appearance ---
          textAlign: "center", // <<< ENSURES ALL TEXT INSIDE IS CENTERED
          color: "white", // Default text color, adjust as needed
          maxWidth: "90%", // Max width for content on small screens
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)", // Basic shadow for readability
        }}
      >
        {/* Title (Required) */}
        <h1
          className="hero-mobile-title"
          style={{
            fontSize: "clamp(1.8rem, 6vw, 2.8rem)", // Responsive font size
            margin: 0,
            marginBottom: "0.4em",
          }}
        >
          {title} {/* Use title prop */}
        </h1>

        {/* Subtitle (Optional) */}
        {subtitle && ( // Conditionally render if subtitle prop exists
          <h2
            className="hero-mobile-subtitle"
            style={{
              fontSize: "clamp(1rem, 4vw, 1.4rem)", // Responsive font size
              margin: 0,
              marginBottom: "0.6em", // Add spacing if description follows
              fontWeight: "normal",
              opacity: 0.9,
            }}
          >
            {subtitle} {/* Use subtitle prop */}
          </h2>
        )}

        {/* Description (Optional) */}
        {description && ( // Conditionally render if description prop exists
          <p
            className="hero-mobile-description"
            style={{
              fontSize: "clamp(0.9rem, 3vw, 1.1rem)", // Responsive font size
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {description} {/* Use description prop */}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroMobile;
