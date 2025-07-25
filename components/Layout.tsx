"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import CTABanner from "./CTABanner";
import Footer from "./Footer";

const BASE_STATUS_URL = "https://cp-status.netlify.app/api/checkStatus";
const CHECK_HTP_PARAM = "SM";
const CHECK_PASSWORD_PARAM = "checkStatus";

interface LayoutProps {
  children: ReactNode;
  showCTABanner?: boolean;
  showFooterOnly?: boolean;
  isContactPage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showCTABanner = true,
  showFooterOnly = false,
  isContactPage = false,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [isLoadingCheck, setIsLoadingCheck] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const closeMenu = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const url = `${BASE_STATUS_URL}?htp=${CHECK_HTP_PARAM}&password=${CHECK_PASSWORD_PARAM}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          if ("clientStatus" in data && data.clientStatus === true) {
            setIsAuthorized(true);
            setErrorMessage(null);
          } else {
            setIsAuthorized(false);
            setErrorMessage(data.message || "Access denied by status API.");
          }
        } else {
          setIsAuthorized(false);
          setErrorMessage(
            data.message || "An unexpected error occurred during authorization."
          );
        }
      } catch (err) {
        console.error("Error fetching authorization status:", err);
        setIsAuthorized(true);
        setErrorMessage(null);
      } finally {
        setIsLoadingCheck(false);
      }
    };

    checkAuthorization();
  }, []);

  if (!isAuthorized && !isLoadingCheck && errorMessage) {
    return (
      <div style={fullScreenCenterStyle}>
        <div style={errorCardStyle}>
          <h1 style={{ color: "#cc0000", marginBottom: "20px" }}>
            Website under maintenance
          </h1>

          <p style={{ marginTop: "30px", fontSize: "0.9rem", color: "#777" }}>
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }

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
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <img src="/images/Back to top arrow.svg" alt="Back to top" />
        <h3>TOP</h3>
      </div>
      {showCTABanner && <CTABanner />}
      {showFooterOnly && <Footer />}
    </div>
  );
};

export default Layout;

const fullScreenCenterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  padding: "20px",
  boxSizing: "border-box",
  backgroundImage: "url('/images/HomeHero.webp')",
};

const cardBaseStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  padding: "40px",
  maxWidth: "450px",
  width: "100%",
  textAlign: "center",
};

const errorCardStyle: React.CSSProperties = {
  ...cardBaseStyle,
  borderLeft: "5px solid #cc0000",
  color: "#333",
};

const backToTopStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#0070f3",
  color: "white",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "background-color 0.3s ease",
  zIndex: 1000,
};

const backToTopImageStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  marginBottom: "4px",
};

const backToTopTextStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  margin: 0,
  lineHeight: 1,
};
