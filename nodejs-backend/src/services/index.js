const customer = require("./customer/customer.service.js");
const billing = require("./billing/billing.service.js");
const cart = require("./cart/cart.service.js");
const product = require("./product/product.service.js");
const order = require("./order/order.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customer);
  app.configure(billing);
  app.configure(cart);
  app.configure(product);
  app.configure(order);
    // ~cb-add-configure-service-name~
};
