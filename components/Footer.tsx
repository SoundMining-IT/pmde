import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-curve"></div>
      <div className="container">
        <div className="footer-content">
          <p>Copyright 2025 PMDE</p>
          <Link target="_blank" href="/privacy-policy">
            Privacy Policy
          </Link>
        </div>
        <div className="social-icons">
          <Link
            href="https://www.linkedin.com/company/soundmining/"
            target="_blank"
            className="social-link"
          >
            <img src="/images/linkedin.svg" alt="linkedin" />
          </Link>
          {/* <Link href="/" target="_blank" className="social-link">
            <img src="/images/Youtube.svg" alt="linkedin" />
          </Link> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
