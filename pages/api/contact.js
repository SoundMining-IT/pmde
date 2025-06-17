import nodemailer from "nodemailer";

// Load environment variables (Next.js does this automatically in API routes)
const {
  RECAPTCHA_SECRET_KEY,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    name,
    surname,
    number,
    organisation,
    message,
    consent, // You might not need consent on backend if validated frontend, but good to have
    recaptchaToken,
  } = req.body;

  // --- Basic Validation ---
  if (!name || !surname || !number || !message || !recaptchaToken) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // --- reCAPTCHA Verification ---
  try {
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
      method: "POST",
    });
    const recaptchaData = await recaptchaResponse.json();

    console.log("reCAPTCHA Verification Data:", recaptchaData); // Log for debugging

    if (!recaptchaData.success) {
      // Score threshold check for v3, hostname check etc can be added here if needed
      return res
        .status(400)
        .json({ error: "reCAPTCHA verification failed. Please try again." });
    }
    // Optional: Check recaptchaData.score if using v3, or recaptchaData.hostname
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.status(500).json({ error: "Could not verify reCAPTCHA." });
  }

  // --- Nodemailer Setup ---
  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: parseInt(EMAIL_SERVER_PORT || "465", 10), // Ensure port is a number
    secure: parseInt(EMAIL_SERVER_PORT || "465", 10) === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
    // Optional: Add TLS options if needed (e.g., ignore self-signed certs in dev)
    // tls: {
    //   rejectUnauthorized: process.env.NODE_ENV === 'production'
    // }
  });

  // --- Email Content ---
  const mailSubject = `New Contact Form Submission from ${name} ${surname}`;
  const mailBody = `
    You received a new message from your website contact form:

    Name: ${name}
    Surname: ${surname}
    Number: ${number}
    Organisation: ${organisation || "N/A"}
    Message:
    ${message}

    Consent Given: ${consent ? "Yes" : "No"}
  `;

  const mailOptions = {
    from: EMAIL_FROM, // Sender address (must often match authenticated user)
    to: EMAIL_TO, // List of receivers
    subject: mailSubject,
    text: mailBody, // Plain text body
    // html: `<p>HTML version of the message</p>` // Optional HTML version
  };

  // --- Send Email ---
  try {
    console.log("Attempting to send email..."); // Log before sending
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Only if using ethereal.email

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    // Provide a more generic error to the frontend
    return res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
}
