const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("order service", async () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("order");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (order)");
  });

  describe("#create", () => {
    const options = {"orderId":"new value","orderName":"new value","shippingAddress":"new value","totalAmount":23,"orderStatus":"new value"};

    beforeEach(async () => {
      orderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.orderId, options.orderId);
assert.strictEqual(orderCreated.orderName, options.orderName);
assert.strictEqual(orderCreated.shippingAddress, options.shippingAddress);
assert.strictEqual(orderCreated.totalAmount, options.totalAmount);
assert.strictEqual(orderCreated.orderStatus, options.orderStatus);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.Model.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderId":"updated value","orderName":"updated value","shippingAddress":"updated value","totalAmount":100,"orderStatus":"updated value"};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.Model.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.orderId, options.orderId);
assert.strictEqual(orderUpdated.orderName, options.orderName);
assert.strictEqual(orderUpdated.shippingAddress, options.shippingAddress);
assert.strictEqual(orderUpdated.totalAmount, options.totalAmount);
assert.strictEqual(orderUpdated.orderStatus, options.orderStatus);
    });
  });

  describe("#delete", async () => {
    it("should delete a order", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const orderDeleted = await thisService.Model.findByIdAndDelete(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});