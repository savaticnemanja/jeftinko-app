const path = require("path");
const fs = require("fs").promises;
const { pool } = require("@evershop/evershop/src/lib/postgres/connection");
const { getConfig } = require("@evershop/evershop/src/lib/util/getConfig");
const { Resend } = require("resend");
const { select } = require("@evershop/postgres-query-builder");
const { contries } = require("@evershop/evershop/src/lib/locale/countries");
const { provinces } = require("@evershop/evershop/src/lib/locale/provinces");
const { error } = require("@evershop/evershop/src/lib/log/logger");
const Handlebars = require("handlebars");
const { getEnv } = require("@evershop/evershop/src/lib/util/getEnv");
const { getValue } = require("@evershop/evershop/src/lib/util/registry");

module.exports = async function sendOrderConfirmationEmail(data) {
  try {
    const apiKey = getEnv("RESEND_API_KEY", "");
    const from = getConfig("resend.from", "");
    const adminEmail = getConfig("resend.admin_email", "");
    const adminSubject = getConfig("resend.admin_subject", "New Order Received");
    const orderPlaced = getConfig("resend.events.order_placed", {});
    const orderPlacedAdmin = getConfig("resend.events.order_admin_notifier", {}); // Admin config

    if (!apiKey || !from || !adminEmail) {
      console.log("Missing API key, from address, or admin email.");
      return;
    }

    if (orderPlaced.enabled !== true) {
      console.log("Order placed email event not enabled");
      return;
    }

    const resend = new Resend(apiKey);

    // Fetch order details
    const orderId = data.order_id;
    const order = await select().from("order").where("order_id", "=", orderId).load(pool);
    if (!order) {
      console.log(`Order ${orderId} not found.`);
      return;
    }

    order.items = await select().from("order_item").where("order_item_order_id", "=", order.order_id).execute(pool);

    order.shipping_address = await select().from("order_address").where("order_address_id", "=", order.shipping_address_id).load(pool);
    order.shipping_address.country_name = contries.find((c) => c.code === order.shipping_address.country)?.name || "";
    order.shipping_address.province_name = provinces.find((p) => p.code === order.shipping_address.province)?.name || "";

    order.billing_address = await select().from("order_address").where("order_address_id", "=", order.billing_address_id).load(pool);
    order.billing_address.country_name = contries.find((c) => c.code === order.billing_address.country)?.name || "";
    order.billing_address.province_name = provinces.find((p) => p.code === order.billing_address.province)?.name || "";

    // Prepare email data
    const emailDataFinal = await getValue("resend_order_confirmation_email_data", order, {});

    // Prepare customer email content
    let customerContent = {};
    if (orderPlaced.templatePath) {
      const customerTemplatePath = path.join(process.cwd(), orderPlaced.templatePath);
      const customerTemplateContent = await fs.readFile(customerTemplatePath, "utf8");
      customerContent.html = Handlebars.compile(customerTemplateContent)(emailDataFinal);
    } else {
      customerContent.text = `Your order #${order.order_number} has been placed. Thank you for shopping with us.`;
    }

    // Send email to customer
    await resend.emails.send({
      to: order.customer_email,
      subject: orderPlaced.subject || "Order Confirmation",
      from,
      ...customerContent,
    });
    console.log(`Sent order confirmation to ${order.customer_email}`);

    // Prepare admin email content
    let adminContent = {};
    if (orderPlacedAdmin.templatePath) {
      const adminTemplatePath = path.join(process.cwd(), orderPlacedAdmin.templatePath);
      const adminTemplateContent = await fs.readFile(adminTemplatePath, "utf8");
      adminContent.html = Handlebars.compile(adminTemplateContent)(emailDataFinal);
    } else if (orderPlaced.templatePath) {
      // fallback to the customer template
      adminContent = customerContent;
    } else {
      adminContent.text = `A new order #${order.order_number} has been placed.`;
    }

    // Send email to admin
    await resend.emails.send({
      to: adminEmail,
      subject: adminSubject,
      from,
      ...adminContent,
    });
    console.log(`Sent order confirmation to admin at ${adminEmail}`);
  } catch (e) {
    error(e);
    console.error("Error sending order confirmation email:", e);
  }
};
