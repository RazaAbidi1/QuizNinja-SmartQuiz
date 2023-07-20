// Import the nodemailer library
import nodemailer from "nodemailer";

// Create a nodemailer transporter with Gmail service and authentication credentials
const transporter = nodemailer.createTransport({
  service: "Gmail", // The email service to be used (in this case, Gmail)
  auth: {
    user: process.env.email, // The email address used for authentication (provided through environment variable)
    pass: process.env.Password, // The password used for authentication (provided through environment variable)
  },
});

// Send an email using the nodemailer transporter
export const SendEmail = (To, Subject, Body, cb) => {
  const mailOptions = {
    from: process.env.email, // The sender's email address (provided through environment variable)
    to: To, // The recipient's email address
    subject: Subject, // The subject of the email
    text: Body, // The body content of the email
  };

  // Send the email using the nodemailer transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // If there's an error while sending the email, log the error and call the callback function with the error
      console.log(error);
      cb(error, null);
    } else {
      // If the email is sent successfully, log the response and call the callback function with the information about the sent email
      console.log("Email sent: " + info.response);
      cb(null, info);
    }
  });
};
