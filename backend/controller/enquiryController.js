const Enquiry = require("../models/Enquiry");
const nodemailer = require("nodemailer");

// Create an Enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, companyName, productId, productName, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).send({ message: "Name, email, phone, and message are required" });
    }

    // Validate productId — only pass if it's a valid 24-char MongoDB ObjectId
    const mongoose = require("mongoose");
    const safeProductId =
      productId && mongoose.Types.ObjectId.isValid(productId) ? productId : null;

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      companyName,
      productId: safeProductId,
      productName,
      message,
    });

    await newEnquiry.save();

    // ── Nodemailer Email Notification ──────────────────────────────
    const mailHost = process.env.HOST || process.env.SMTP_HOST;
    const mailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const mailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
    const mailPort = process.env.EMAIL_PORT || process.env.SMTP_PORT || 465;
    const adminEmail = process.env.ADMIN_EMAIL || mailUser; // fallback to sender

    if (mailHost && mailUser && mailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: mailHost,
          port: parseInt(mailPort),
          secure: parseInt(mailPort) === 465,
          auth: {
            user: mailUser,
            pass: mailPass,
          },
        });

        const htmlBody = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
            <div style="background:#0F4C81;padding:24px;text-align:center">
              <h1 style="color:white;margin:0;font-size:22px">📩 New Enquiry – ILMIC Health Care</h1>
            </div>
            <div style="padding:24px;background:#f9fafb">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:160px">Name:</td><td style="color:#111827">${name}</td></tr>
                <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Email:</td><td style="color:#111827">${email}</td></tr>
                <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Phone:</td><td style="color:#111827">${phone}</td></tr>
                <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Company:</td><td style="color:#111827">${companyName || "N/A"}</td></tr>
                <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Product:</td><td style="color:#111827">${productName || "General Enquiry"}</td></tr>
                <tr><td style="padding:8px 0;font-weight:bold;color:#374151;vertical-align:top">Message:</td><td style="color:#111827">${message}</td></tr>
              </table>
            </div>
            <div style="padding:16px 24px;background:#0F4C81;text-align:center">
              <p style="color:#bfdbfe;margin:0;font-size:12px">ILMIC Health Care – Pharmaceutical Distributor | ilmichealthcare.com</p>
            </div>
          </div>
        `;

        // 1. Notify admin
        await transporter.sendMail({
          from: `"ILMIC Health Care Enquiries" <${mailUser}>`,
          to: adminEmail,
          subject: `🔔 New Enquiry from ${name} – ${productName || "General"}`,
          html: htmlBody,
          text: `New Enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${companyName || 'N/A'}\nProduct: ${productName || 'General Enquiry'}\nMessage: ${message}`,
        });

        // 2. Send confirmation to customer
        await transporter.sendMail({
          from: `"ILMIC Health Care" <${mailUser}>`,
          to: email,
          subject: `We received your enquiry – ILMIC Health Care`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
              <div style="background:#0F4C81;padding:24px;text-align:center">
                <h1 style="color:white;margin:0;font-size:20px">Thank you, ${name}!</h1>
              </div>
              <div style="padding:24px;background:#f9fafb">
                <p style="color:#374151">We have received your enquiry regarding <strong>${productName || "our products"}</strong> and our team will get back to you within <strong>24 hours</strong>.</p>
                <p style="color:#374151">📞 You can also reach us at: <a href="tel:+9188102 72080" style="color:#0F4C81;font-weight:bold">+91 88102 72080</a></p>
              </div>
              <div style="padding:16px 24px;background:#0F4C81;text-align:center">
                <p style="color:#bfdbfe;margin:0;font-size:12px">ILMIC Health Care – Trusted Pharmaceutical Distributor</p>
              </div>
            </div>
          `,
        });

      } catch (emailErr) {
        console.error("Failed to send notification email:", emailErr.message);
      }
    }

    res.status(201).send({
      message: "Enquiry submitted successfully",
      enquiry: newEnquiry,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get all enquiries (Admin only)
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.send(enquiries);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update Enquiry status (Admin only)
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["New", "Contacted", "Closed"].includes(status)) {
      return res.status(400).send({ message: "Invalid status value" });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).send({ message: "Enquiry not found" });
    }

    enquiry.status = status;
    await enquiry.save();

    res.send({ message: "Enquiry status updated successfully", enquiry });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
};
