const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const {
  getSmtpConfig,
  withDeliverabilityHeaders,
} = require("./emailConfig");

const createTransporter = () => nodemailer.createTransport(getSmtpConfig());

const sendMailPromise = (body) =>
  new Promise((resolve, reject) => {
    const transporter = createTransporter();
    const mailOptions = withDeliverabilityHeaders(body);

    transporter.verify((err) => {
      if (err) {
        console.error("Email verification error:", err);
        return reject(err);
      }
      transporter.sendMail(mailOptions, (sendErr, data) => {
        if (sendErr) {
          console.error("Error sending email:", sendErr);
          return reject(sendErr);
        }
        resolve(data);
      });
    });
  });

const sendEmail = (body, res, message) => {
  const transporter = createTransporter();
  const mailOptions = withDeliverabilityHeaders(body);

  transporter.verify((err) => {
    if (err) {
      console.error("Verification error:", err);
      res.status(403).send({
        message: `Error during verification: ${err.message}`,
      });
    } else {
      transporter.sendMail(mailOptions, (sendErr) => {
        if (sendErr) {
          console.error("Error sending email:", sendErr);
          res.status(403).send({
            message: `Error sending email: ${sendErr.message}`,
          });
        } else {
          res.send({ message });
        }
      });
    }
  });
};

const minutes = 30;
const emailVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

const passwordVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

const supportMessageLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

const phoneVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 2,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

module.exports = {
  sendEmail,
  sendMailPromise,
  emailVerificationLimit,
  passwordVerificationLimit,
  supportMessageLimit,
  phoneVerificationLimit,
};
