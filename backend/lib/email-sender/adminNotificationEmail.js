const { sendMailPromise } = require("./sender");

const getAdminEmail = () =>
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.LEAD_NOTIFICATION_EMAIL ||
  process.env.EMAIL_USER;

const getDisplayValue = (value) => {
  if (value === undefined || value === null || value === "") return "N/A";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value.en || value.title || JSON.stringify(value);
  }
  return String(value);
};

const buildNotificationHtml = ({ title, subtitle, rows }) => {
  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;width:180px;">${label}</td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;">${getDisplayValue(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:#0b1d3d;color:#ffffff;padding:20px 24px;">
          <h2 style="margin:0;font-size:20px;">${title}</h2>
          <p style="margin:8px 0 0;opacity:0.85;">${subtitle}</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111827;">
            ${tableRows}
          </table>
        </div>
      </div>
    </div>
  `;
};

const sendAdminNotification = async ({
  subject,
  title,
  subtitle,
  rows,
  replyTo,
  fromName = "ILMIC Health Care",
}) => {
  const adminEmail = getAdminEmail();

  if (!adminEmail || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(`Skipping admin notification (${subject}): email is not configured`);
    return false;
  }

  await sendMailPromise({
    from: `"${fromName}" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    replyTo: replyTo || process.env.EMAIL_USER,
    subject,
    html: buildNotificationHtml({ title, subtitle, rows }),
  });

  console.log(`Admin notification sent: ${subject}`);
  return true;
};

const queueAdminNotification = (payload) => {
  sendAdminNotification(payload).catch((err) => {
    console.error(`Failed to send admin notification (${payload.subject}):`, err.message);
  });
};

const getProductSummary = (product) => {
  if (!product) return "General enquiry";

  if (Array.isArray(product.items) && product.items.length > 0) {
    return product.items
      .map(
        (item) =>
          `${item.name || getDisplayValue(item.title) || "Item"} (Qty: ${item.quantity || 1})`
      )
      .join(", ");
  }

  return getDisplayValue(product.title) || "General enquiry";
};

const queueLeadNotificationEmail = (lead) => {
  const data = lead?.toObject ? lead.toObject() : lead;
  const productSummary = getProductSummary(data.product);

  queueAdminNotification({
    subject: `New Lead: ${data.name} - ${productSummary}`,
    title: "New Lead Received",
    subtitle: "A new enquiry was submitted on ILMIC Health Care.",
    replyTo: data.email,
    fromName: "ILMIC Health Care Leads",
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Service", data.service],
      ["Service Date", data.serviceDate],
      ["Location", data.location || data.address],
      ["Address", data.address],
      ["District", data.district],
      ["State", data.state],
      ["Pincode", data.pincode],
      ["Product / Enquiry", productSummary],
      ["Message", data.message || "No message"],
      ["Submitted At", new Date(data.createdAt || Date.now()).toLocaleString()],
    ],
  });
};

const queueBatteryServiceNotificationEmail = (request) => {
  const data = request?.toObject ? request.toObject() : request;

  queueAdminNotification({
    subject: `New Battery Service Request: ${data.name} - ${data.serviceType}`,
    title: "New Battery Service Request",
    subtitle: "A customer submitted a battery service request.",
    replyTo: data.email,
    fromName: "ILMIC Health Care Battery Service",
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Address", data.address],
      ["City", data.city],
      ["State", data.state],
      ["Pincode", data.pincode],
      ["Battery Brand", data.batteryBrand],
      ["Battery Model", data.batteryModel],
      ["Battery Capacity", data.batteryCapacity],
      ["Battery Type", data.batteryType],
      ["Service Type", data.serviceType],
      ["Problem", data.problemDescription],
      ["Preferred Date", data.preferredDate],
      ["Additional Notes", data.additionalNotes],
      ["Submitted At", new Date(data.createdAt || Date.now()).toLocaleString()],
    ],
  });
};

const queueOrderNotificationEmail = (order) => {
  const data = order?.toObject ? order.toObject() : order;
  const user = data.user_info || {};
  const cartSummary = (data.cart || [])
    .map(
      (item) =>
        `${getDisplayValue(item.title)} x ${item.quantity || 1} (${item.price || 0})`
    )
    .join("; ");

  queueAdminNotification({
    subject: `New Order: ${data.orderId || data._id} - ${user.name || "Customer"}`,
    title: "New Order Received",
    subtitle: "A customer placed a new order on ILMIC Health Care.",
    replyTo: user.email,
    fromName: "ILMIC Health Care Orders",
    rows: [
      ["Order ID", data.orderId || data._id],
      ["Invoice", data.invoice],
      ["Customer Name", user.name],
      ["Customer Email", user.email],
      ["Customer Phone", user.contact || user.phone],
      ["Payment Method", data.paymentMethod],
      ["Order Status", data.status],
      ["Subtotal", data.subTotal],
      ["Shipping", data.shippingCost],
      ["Discount", data.discount],
      ["Total", data.total],
      ["Items", cartSummary],
      ["Shipping Address", user.address],
      ["City", user.city],
      ["State/Country", user.country],
      ["Zip Code", user.zipCode],
      ["Placed At", new Date(data.createdAt || Date.now()).toLocaleString()],
    ],
  });
};

const queueReviewNotificationEmail = (review, productTitle) => {
  const data = review?.toObject ? review.toObject() : review;

  queueAdminNotification({
    subject: `New Product Review: ${data.name} (${data.rating}/5)`,
    title: "New Product Review",
    subtitle: "A customer submitted a new product review.",
    replyTo: undefined,
    fromName: "ILMIC Health Care Reviews",
    rows: [
      ["Reviewer", data.name],
      ["Rating", `${data.rating}/5`],
      ["Product", productTitle || data.product],
      ["Comment", data.comment],
      ["Status", data.status],
      ["Submitted At", new Date(data.createdAt || Date.now()).toLocaleString()],
    ],
  });
};

const queueCommentNotificationEmail = (comment, blogTitle) => {
  const data = comment?.toObject ? comment.toObject() : comment;

  queueAdminNotification({
    subject: `New Blog Comment: ${data.name}`,
    title: "New Blog Comment",
    subtitle: "A reader commented on your blog.",
    replyTo: data.email,
    fromName: "ILMIC Health Care Blog",
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Website", data.website],
      ["Blog", blogTitle || data.blogId],
      ["Comment", data.comment],
      ["Status", data.status],
      ["Submitted At", new Date(data.createdAt || Date.now()).toLocaleString()],
    ],
  });
};

const queueCustomerSignupNotificationEmail = (customer, signupMethod = "Email") => {
  const data = customer?.toObject ? customer.toObject() : customer;

  queueAdminNotification({
    subject: `New Customer Signup: ${data.name || data.email}`,
    title: "New Customer Registered",
    subtitle: "A new customer created an account on ILMIC Health Care.",
    replyTo: data.email,
    fromName: "ILMIC Health Care Accounts",
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Signup Method", signupMethod],
      ["Registered At", new Date(data.createdAt || Date.now()).toLocaleString()],
    ],
  });
};

module.exports = {
  sendAdminNotification,
  queueAdminNotification,
  queueLeadNotificationEmail,
  queueBatteryServiceNotificationEmail,
  queueOrderNotificationEmail,
  queueReviewNotificationEmail,
  queueCommentNotificationEmail,
  queueCustomerSignupNotificationEmail,
};
