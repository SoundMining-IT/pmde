import React from "react";

interface AnimatedButtonProps {
  text: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  href,
  backgroundColor = "#9B0031", // Default deep red like in the image
  textColor = "#FFFFFF",
  hoverColor = "#7B0026",
  onClick,
}) => {
  // Create a unique class name based on the button's primary color
  const colorClassId = backgroundColor.replace("#", "");
  const buttonClass = `animated-button-${colorClassId}`;

  // Generate dynamic CSS for this specific button color
  const buttonStyles = `
    .${buttonClass} {
      --button-bg: #45596D;
      --button-text: ${textColor};
      --button-hover: #45596D;
    }
  `;

  return (
    <>
      <style>{buttonStyles}</style>
      <a
        href={href}
        target="_blank"
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className={`animated-button pulse pulse-subtle pulse-efficient ${buttonClass}`}
      >
        <div className="animated-button__background"></div>
        <div className="animated-button__content">
          <span className="animated-button__text">{text}</span>
          <div className="animated-button__icon">
            <img src="/images/Button icon.svg" alt="Button Icon" />
          </div>
        </div>
        <div className="animated-button__overlay"></div>
      </a>
    </>
  );
};

export default AnimatedButton;
