const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  console.log(`📨 Sending OTP to ${email}: ${otp}`); // debug line

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
    console.log("✅ OTP email sent");
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
  }
};

module.exports = sendOTP;

