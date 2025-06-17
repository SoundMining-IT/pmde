import React from "react";

interface SubmitButtonProps {
  text: string;
  href?: string; // Keep for link usage, but ignored if type='submit'
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void; // Allow click handling for both
  type?: "button" | "submit" | "reset"; // Define button type
  disabled?: boolean; // Add disabled state for forms
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  href,
  backgroundColor = "var(--color3)", // Default deep red
  textColor = "#FFFFFF",
  hoverColor = "var(--color3)",
  onClick,
  type = "button", // Default to 'button' if not specified
  disabled = false, // Default to not disabled
}) => {
  // Create a unique class name based on the button's primary color
  const colorClassId = backgroundColor.replace(/[^a-zA-Z0-9]/g, ""); // Ensure valid class name
  const buttonClass = `animated-button-${colorClassId}`;

  // Generate dynamic CSS for this specific button color
  const buttonStyles = `
    .${buttonClass} {
      --button-bg: ${backgroundColor};
      --button-text: ${textColor};
      --button-hover: ${hoverColor};
      /* Add styles for disabled state */
      opacity: ${disabled ? 0.6 : 1};
      cursor: ${disabled ? "not-allowed" : "pointer"};
      pointer-events: ${disabled ? "none" : "auto"};
    }
    /* Ensure internal elements inherit pointer-events correctly */
    .${buttonClass} * {
        pointer-events: inherit;
       
    }
  `;

  // Common class names
  const commonClasses = `animated-button pulse pulse-subtle pulse-efficient ${buttonClass}`;

  // Common internal structure
  const buttonInternals = (
    <div style={{ border: "none" }}>
      <div className="animated-button__background"></div>
      <div className="animated-button__content">
        <span className="animated-button__text">{text}</span>
        <div className="animated-button__icon">
          <img src="/images/Button icon.svg" alt="" />{" "}
          {/* Alt can be empty for decorative icons */}
        </div>
      </div>
      <div className="animated-button__overlay"></div>
    </div>
  );

  // Render as a <button> if type is 'submit', 'reset', or 'button' AND href is not provided
  // Or prioritize type='submit'/'reset' even if href is present (button action takes precedence)
  if (type === "submit" || type === "reset" || (type === "button" && !href)) {
    return (
      <>
        <style>{buttonStyles}</style>
        <button
          type={type} // Use the specified type ('submit', 'reset', 'button')
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} // Cast onClick type if needed
          className={commonClasses}
          disabled={disabled} // Apply disabled attribute
          aria-disabled={disabled} // Apply aria-disabled for accessibility
        >
          {buttonInternals}
        </button>
      </>
    );
  }

  // Otherwise, render as a link (<a>)
  return (
    <>
      <style>{buttonStyles}</style>
      <a
        href={disabled ? undefined : href} // Prevent navigation if disabled (optional)
        onClick={(e) => {
          if (disabled) {
            e.preventDefault(); // Prevent action if disabled
            return;
          }
          if (onClick) {
            // For links, we might still want to prevent default if onClick handles everything
            // e.preventDefault();
            onClick(e as React.MouseEvent<HTMLAnchorElement>); // Cast event type
          }
        }}
        className={`${commonClasses} ${disabled ? "disabled-link" : ""}`} // Add class for disabled styling if needed
        aria-disabled={disabled}
        // Add rel="noopener noreferrer" if opening external links in new tabs
      >
        {buttonInternals}
      </a>
    </>
  );
};

export default SubmitButton;
