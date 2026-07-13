const ILMIC_EMAIL = "info.ilmichealthcare@gmail.com";
const ILMIC_FROM_NAME = "ILMIC Health Care";

const getSmtpPort = () => {
  const port = Number.parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || "587", 10);
  return Number.isNaN(port) ? 587 : port;
};

const getSmtpConfig = () => {
  const host = process.env.HOST || process.env.SMTP_HOST || "smtp.gmail.com";
  const user = process.env.EMAIL_USER || process.env.SMTP_USER || ILMIC_EMAIL;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const port = getSmtpPort();

  return {
    host,
    port,
    secure: port === 465,
    auth: pass ? { user, pass } : undefined,
    tls: { minVersion: "TLSv1.2" },
  };
};

const getNotificationEmail = () =>
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.LEAD_NOTIFICATION_EMAIL ||
  process.env.ADMIN_EMAIL ||
  process.env.EMAIL_USER ||
  ILMIC_EMAIL;

const buildFromAddress = (displayName = ILMIC_FROM_NAME) => {
  const user = process.env.EMAIL_USER || ILMIC_EMAIL;
  return `"${displayName}" <${user}>`;
};

const withDeliverabilityHeaders = (mailOptions = {}) => ({
  ...mailOptions,
  from: mailOptions.from || buildFromAddress(),
  replyTo: mailOptions.replyTo || process.env.EMAIL_USER || ILMIC_EMAIL,
  headers: {
    "X-Mailer": "ILMIC Health Care",
    ...(mailOptions.headers || {}),
  },
});

module.exports = {
  ILMIC_EMAIL,
  ILMIC_FROM_NAME,
  getSmtpConfig,
  getNotificationEmail,
  buildFromAddress,
  withDeliverabilityHeaders,
};
