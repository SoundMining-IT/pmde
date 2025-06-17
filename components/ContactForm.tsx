import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import SubmitButton from "./SubmitButton";
// Remove AnimatedButton import if using standard button
// import AnimatedButton from "./AnimatedButton";

// Use environment variable for Site Key
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!; // Add '!' if sure it's set

// Define status types for better feedback
type FormStatus = "idle" | "submitting" | "success" | "error";
type FormStatusMessage = { type: FormStatus; message: string } | null;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    number: "",
    organisation: "",
    message: "",
    consent: false,
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatusMessage>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  if (!RECAPTCHA_SITE_KEY) {
    console.error("reCAPTCHA Site Key is not set in environment variables!");
    // Optionally render an error message to the user
    return <p>Contact form cannot be displayed. Configuration error.</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (
      token &&
      formStatus?.type === "error" &&
      formStatus.message.includes("reCAPTCHA")
    ) {
      setFormStatus(null); // Clear reCAPTCHA-specific error if user completes it
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: "submitting", message: "Sending..." });

    // --- Validation ---
    if (!formData.consent) {
      setFormStatus({
        type: "error",
        message: "Please agree to the terms to submit.",
      });
      return;
    }
    if (!recaptchaToken) {
      setFormStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    // --- Send data to backend API ---
    try {
      const response = await fetch("/api/contact", {
        // Your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken, // Send the token
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle errors from the API (e.g., reCAPTCHA failure, email failure)
        throw new Error(result.error || "An unknown error occurred.");
      }

      // --- Success ---
      setFormStatus({
        type: "success",
        message: "Message sent successfully! Thank you.",
      });
      // Reset form
      setFormData({
        name: "",
        surname: "",
        number: "",
        organisation: "",
        message: "",
        consent: false,
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset(); // Reset reCAPTCHA widget
    } catch (error: any) {
      console.error("Submission Error:", error);
      setFormStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
      // Don't reset token on error, let user retry
      setRecaptchaToken(null); // But DO reset the token state
      recaptchaRef.current?.reset(); // And reset the widget
    }
  };

  const isSubmitting = formStatus?.type === "submitting";

  return (
    <div className="contact-form-container flex col ac jc">
      <div className="form-left">
        <h1 className="form-title">GET IN TOUCH</h1>
        <p className="form-subtext">
          Ready to take your minerals project to the next level?
        </p>
      </div>

      <form className="form-right" onSubmit={handleSubmit}>
        {/* --- Input Fields --- */}
        <div className="input-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="input-row">
          <input
            type="tel" // Use type="tel" for numbers
            name="number"
            placeholder="Number"
            value={formData.number}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <input
            type="text"
            name="organisation"
            placeholder="Organisation"
            value={formData.organisation}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <textarea
          name="message"
          placeholder="Write your message here"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          rows={5} // Give it some initial height
        />

        {/* --- Consent Checkbox --- */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="consent-checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            disabled={isSubmitting}
            // Consider adding aria-describedby if you have separate error message element
          />
          {/* More specific label text */}
          <label htmlFor="consent-checkbox">
            I agree to allow PMDE to contact me regarding my inquiry using the
            details provided above.
          </label>
        </div>

        {/* --- reCAPTCHA --- */}
        <div
          className="recaptcha-container"
          style={{ margin: "1rem 0", background: "none" }}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </div>

        {/* --- Status Message --- */}
        {formStatus && (
          <p
            style={{
              marginBottom: " 1rem",

              color:
                formStatus.type === "error"
                  ? "red"
                  : formStatus.type === "success"
                  ? "white"
                  : "inherit",
            }}
          >
            {formStatus.message}
          </p>
        )}

        {/* --- Submit Button --- */}
        {/* <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button> */}

        {/* Or if AnimatedButton renders a button with type="submit" */}
        <SubmitButton
          text={isSubmitting ? "Submitting..." : "Submit"}
          type="submit" // Specify type="submit"
          disabled={isSubmitting} // Pass the disabled state
          // Optionally pass other props like backgroundColor etc.
        />
      </form>

      {/* Add some basic styling for the submit button if needed */}
      <style jsx>{`
        .submit-button {
          padding: 10px 20px;
          background-color: #8b0000; /* Example color */
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 1rem;
          transition: background-color 0.2s ease;
        }
        .submit-button:hover:not(:disabled) {
          background-color: #a52a2a; /* Darker hover */
        }
        .submit-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px; /* Add space between checkbox and label */
          margin: 0.5rem 0;
        }
        .input-row {
          display: flex;
          gap: 1rem; /* Add space between inputs */
          width: 100%; /* Ensure rows take full width */
          margin-bottom: 1rem;
        }
        .input-row input {
          flex: 1; /* Make inputs share space equally */
        }
        .form-right input,
        .form-right textarea {
          /* Add some basic input styling if not already present */
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%; /* Make textarea full width */
          box-sizing: border-box; /* Include padding in width */
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
