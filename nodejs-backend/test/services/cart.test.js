const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("cart service", async () => {
  let thisService;
  let cartCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("cart");

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
    assert.ok(thisService, "Registered the service (cart)");
  });

  describe("#create", () => {
    const options = {"cartId":"new value","customerId":"new value","productId":"new value","productName":"new value","quantity":23};

    beforeEach(async () => {
      cartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cart", () => {
      assert.strictEqual(cartCreated.cartId, options.cartId);
assert.strictEqual(cartCreated.customerId, options.customerId);
assert.strictEqual(cartCreated.productId, options.productId);
assert.strictEqual(cartCreated.productName, options.productName);
assert.strictEqual(cartCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a cart by ID", async () => {
      const retrieved = await thisService.Model.findById(cartCreated._id);
      assert.strictEqual(retrieved._id.toString(), cartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"cartId":"updated value","customerId":"updated value","productId":"updated value","productName":"updated value","quantity":100};

    it("should update an existing cart ", async () => {
      const cartUpdated = await thisService.Model.findByIdAndUpdate(
        cartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(cartUpdated.cartId, options.cartId);
assert.strictEqual(cartUpdated.customerId, options.customerId);
assert.strictEqual(cartUpdated.productId, options.productId);
assert.strictEqual(cartUpdated.productName, options.productName);
assert.strictEqual(cartUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a cart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const cartDeleted = await thisService.Model.findByIdAndDelete(cartCreated._id);
      assert.strictEqual(cartDeleted._id.toString(), cartCreated._id.toString());
    });
  });
});