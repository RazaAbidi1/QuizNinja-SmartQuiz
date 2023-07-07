import express from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.email,
    pass: process.env.Password,
  },
});

export const SendEmail = (To, Subject, Body, cb) => {
  const mailOptions = {
    from: process.env.email,
    to: To,
    subject: Subject,
    text: Body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      cb(error, null);
    } else {
      console.log("Email sent: " + info.response);
      cb(null, info);
    }
  });
};
