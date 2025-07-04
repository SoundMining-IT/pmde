import type { NextPage } from "next";
import Head from "next/head";

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - PMDE</title>
        <meta
          name="description"
          content="Privacy Policy for PMDE, detailing how we collect, use, and protect your personal information in compliance with South Africa's POPIA."
        />
      </Head>

      <main className="policy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: 11 June 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to PMDE ("we," "us," or "our"). We are committed to
            protecting your personal information and your right to privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our sound
            engineering, production, and mastering services (the "Services").
          </p>
          <p>
            This policy is drafted in accordance with the Protection of Personal
            Information Act 4 of 2013 ("POPIA") of South Africa. We encourage
            you to read this privacy policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access the site or
            our services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you express an interest in obtaining information about us or
            our Services, when you participate in activities on the website, or
            otherwise when you contact us.
          </p>
          <p>
            The personal information that we collect may include the following:
          </p>
          <ul>
            <li>
              <strong>Personal Identification Information:</strong> Name,
              surname, email address, phone number, and company name.
            </li>
            <li>
              <strong>Project Information:</strong> Details and files related to
              your audio projects, such as audio tracks, project notes, and
              creative briefs.
            </li>
            <li>
              <strong>Financial Information:</strong> Billing address and
              payment details necessary for processing invoices. Note: Sensitive
              payment information (like credit card numbers) is processed by our
              third-party payment gateway (e.g., Paystack, Yoco) and is not
              stored on our servers.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type and
              version, and other technology on the devices you use to access
              this website.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Services for a variety
            of business purposes described below, based on our legitimate
            business interests and to comply with our legal obligations.
          </p>
          <ul>
            <li>
              <strong>To Provide and Manage Our Services:</strong> To create and
              manage your account, process your projects, and deliver the final
              audio products.
            </li>
            <li>
              <strong>To Facilitate Communication:</strong> To respond to your
              inquiries, send you project updates, and provide customer support.
            </li>
            <li>
              <strong>For Business Operations:</strong> To process payments,
              send invoices, and for internal record-keeping.
            </li>
            <li>
              <strong>To Protect Our Services:</strong> To help maintain the
              safety, security, and integrity of our website and services.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing Your Information</h2>
          <p>
            We do not share, sell, rent, or trade your information with third
            parties for their promotional purposes. We may share information
            with the following parties:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with third-party vendors, consultants, and other service providers
              who perform services for us or on our behalf and require access to
              such information to do that work (e.g., payment processors, cloud
              hosting services).
            </li>
            <li>
              <strong>Legal Obligations:</strong> We may disclose your
              information where we are legally required to do so in order to
              comply with applicable law, governmental requests, or legal
              process.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, despite our safeguards and efforts
            to secure your information, no electronic transmission over the
            Internet or information storage technology can be guaranteed to be
            100% secure.
          </p>
        </section>

        <section>
          <h2>6. Your Rights Under POPIA</h2>
          <p>
            As a data subject in South Africa, you have the following rights
            under POPIA:
          </p>
          <ul>
            <li>
              <strong>Right of Access:</strong> You have the right to request a
              copy of the personal information we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You have the right to
              request the correction of inaccurate or incomplete personal
              information.
            </li>
            <li>
              <strong>Right to Erasure (Deletion):</strong> You have the right
              to request the deletion of your personal information, subject to
              legal and contractual retention requirements.
            </li>
            <li>
              <strong>Right to Object to Processing:</strong> You have the right
              to object to the processing of your personal information.
            </li>
            <li>
              <strong>Right to Lodge a Complaint:</strong> You have the right to
              lodge a complaint with the Information Regulator of South Africa
              if you believe our processing of your information is unlawful.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us using the contact
            details provided below.
          </p>
        </section>

        <section>
          <h2>7. Data Retention</h2>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy policy, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements).
          </p>
        </section>

        <section>
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated
            version will be indicated by a "Last Updated" date and the updated
            version will be effective as soon as it is accessible. We encourage
            you to review this privacy policy frequently to be informed of how
            we are protecting your information.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may contact
            us at:
          </p>
          <div className="contact-details">
            <p>
              <strong>PMDE</strong>
            </p>

            {/* <p>
              [Your Physical Address, e.g., 123 Audio Lane, Johannesburg, 2000,
              South Africa]
            </p> */}
            <p>
              Email: <a href="mailto:info@pmde.mu">info@pmde.mu</a>
            </p>
            <p>Phone: +27 (0) 64 511 6099</p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .policy-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px 40px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          line-height: 1.7;
          color: #333;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        h1 {
          font-size: 2.5rem;
          color: #1a1a1a;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 1.75rem;
          color: #2c3e50;
          margin-top: 40px;
          margin-bottom: 15px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 8px;
        }

        p {
          margin-bottom: 1.2em;
        }

        .last-updated {
          color: #7f8c8d;
          font-size: 0.9rem;
          margin-bottom: 30px;
        }

        ul {
          padding-left: 20px;
          margin-bottom: 1.2em;
        }

        li {
          margin-bottom: 0.8em;
        }

        a {
          color: #3498db;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        a:hover {
          color: #2980b9;
          text-decoration: underline;
        }

        strong {
          color: #2c3e50;
        }

        .contact-details {
          background-color: #f9f9f9;
          border-left: 3px solid #3498db;
          padding: 20px;
          border-radius: 4px;
          margin-top: 10px;

          p {
            margin-bottom: 0.5em;
          }
        }

        @media (max-width: 1024px) {
          .policy-container {
            padding: 20px 25px;
            margin: 20px auto;
          }
          h1 {
            font-size: 2rem;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Optional: Add a global style to set the body background for a cleaner look */}
      <style jsx global>{`
        body {
          background-color: #f4f6f9;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicyPage;
