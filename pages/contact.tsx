import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SeoMeta from "@/components/SEO";
import React from "react";

const contact = () => {
  const pageTitle = "Contact Us";
  const pageDescription =
    "Get in touch to discuss your next minerals project. Contact our team for expert guidance, tailored solutions, and responsive support. Let’s talk.";
  const pageImage = "/images/PMDELogo.jpg";
  const imageAlt = "PMDE Logo";
  return (
    <Layout isContactPage={true} showCTABanner={false} showFooterOnly={true}>
      <SeoMeta
        title={pageTitle}
        description={pageDescription}
        ogImage={pageImage}
        ogImageAlt={imageAlt}
        siteName="PMDE"
      />
      <div className="contact-section flex col ac jc">
        <ContactForm />
      </div>
    </Layout>
  );
};

export default contact;
