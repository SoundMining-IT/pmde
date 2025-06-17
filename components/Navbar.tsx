import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Define service links data
const serviceLinks = [
  {
    href: "/corporate-advisory",
    label: "Corporate Advisory",
    desktopClassName: "circle c1",
  },
  {
    href: "/technical-expertise",
    label: "Technical Expertise",
    desktopClassName: "circle c2",
  },
  {
    href: "/project-solutions",
    label: "Project Management and Execution",
    desktopClassName: "circle c3",
  },
  {
    href: "/social-and-environmental-solutions",
    label: "Social and Environmental Solutions",
    desktopClassName: "circle c4",
  },
  {
    href: "/people-excellence",
    label: "People Excellence",
    desktopClassName: "circle c5",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Animation variants
  const logoVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 1,
      },
    },
  };

  const navItemsVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 1.0,
      },
    },
  };

  const navItemVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo Placeholder with Motion */}
        <motion.div
          className="logo"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          viewport={{ once: true }}
        >
          <Link href="/">
            <img src="/images/PMDE logo.svg" alt="Logo" />
          </Link>
        </motion.div>

        {/* Menu links with conditional rendering for services */}
        <motion.ul
          className={`nav-links ${menuOpen ? "open" : ""}`}
          initial="hidden"
          animate="visible"
          variants={navItemsVariants}
        >
          {/* ABOUT US */}
          <motion.li variants={navItemVariant}>
            <Link href="/about-us">About Us</Link>
          </motion.li>

          {/* Conditional rendering for SERVICES AND OFFERINGS */}
          {menuOpen ? (
            // Mobile view: Flattened service items
            <>
              {serviceLinks.map((item, index) => (
                <motion.li
                  key={`mobile-service-${index}`}
                  variants={navItemVariant}
                >
                  <Link href={item.href}>{item.label}</Link>
                </motion.li>
              ))}
            </>
          ) : (
            // Desktop view: "SERVICES AND OFFERINGS" dropdown
            <motion.li
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              variants={navItemVariant}
            >
              <span className="dropdown-toggle">SERVICES AND OFFERINGS</span>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  {serviceLinks.map((item, index) => (
                    <li
                      key={`desktop-service-${index}`}
                      className={item.desktopClassName}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          )}

          {/* INSIGHTS */}
          <motion.li variants={navItemVariant}>
            <Link href="/insights">Insights</Link>
          </motion.li>

          {/* CONTACT US */}
          <motion.li className="pulse pulse-subtle" variants={navItemVariant}>
            <Link href="/contact" className="contact-btn">
              CONTACT US
            </Link>
          </motion.li>
        </motion.ul>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
