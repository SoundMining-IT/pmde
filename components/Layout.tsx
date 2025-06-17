import React, { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import CTABanner from "./CTABanner";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showCTABanner?: boolean; // Toggle for showing/hiding CTA Banner
  showFooterOnly?: boolean; // Toggle for showing/hiding Footer only
  isContactPage?: boolean; // New prop to identify the contact page
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showCTABanner = true,
  showFooterOnly = false,
  isContactPage = false, // Default to false
}) => {
  const closeMenu = useState(false); // Placeholder for closeMenu function
  return (
    <div className="layout">
      <Navbar />

      <main
        className={`main-content ${isContactPage ? "overflow-hidden" : ""}`}
      >
        {children}
      </main>
      <div
        className="back-to-top flex col ac jc"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src="/images/Back to top arrow.svg" />
        <h3>TOP</h3>
      </div>
      {showCTABanner && <CTABanner />}
      {showFooterOnly && <Footer />}
    </div>
  );
};

export default Layout;
