const {
  queueLeadNotificationEmail,
  sendAdminNotification,
} = require("./adminNotificationEmail");

module.exports = {
  sendLeadNotificationEmail: (lead) => queueLeadNotificationEmail(lead),
  queueLeadNotificationEmail,
  sendAdminNotification,
};
