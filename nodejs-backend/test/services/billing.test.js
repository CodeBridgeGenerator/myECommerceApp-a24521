const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("billing service", async () => {
  let thisService;
  let billingCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("billing");

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
    assert.ok(thisService, "Registered the service (billing)");
  });

  describe("#create", () => {
    const options = {"billingId":23,"billingName":"new value","customerId":"new value","billingAddress":"new value","paymentMethod":"new value","transactionId":"new value","transactionDate":"2026-04-13T10:21:25.331Z"};

    beforeEach(async () => {
      billingCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new billing", () => {
      assert.strictEqual(billingCreated.billingId, options.billingId);
assert.strictEqual(billingCreated.billingName, options.billingName);
assert.strictEqual(billingCreated.customerId, options.customerId);
assert.strictEqual(billingCreated.billingAddress, options.billingAddress);
assert.strictEqual(billingCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(billingCreated.transactionId, options.transactionId);
assert.strictEqual(billingCreated.transactionDate.toISOString(), options.transactionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a billing by ID", async () => {
      const retrieved = await thisService.Model.findById(billingCreated._id);
      assert.strictEqual(retrieved._id.toString(), billingCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"billingId":100,"billingName":"updated value","customerId":"updated value","billingAddress":"updated value","paymentMethod":"updated value","transactionId":"updated value","transactionDate":"2026-04-13T10:21:25.331Z"};

    it("should update an existing billing ", async () => {
      const billingUpdated = await thisService.Model.findByIdAndUpdate(
        billingCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(billingUpdated.billingId, options.billingId);
assert.strictEqual(billingUpdated.billingName, options.billingName);
assert.strictEqual(billingUpdated.customerId, options.customerId);
assert.strictEqual(billingUpdated.billingAddress, options.billingAddress);
assert.strictEqual(billingUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(billingUpdated.transactionId, options.transactionId);
assert.strictEqual(billingUpdated.transactionDate.toISOString(), options.transactionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a billing", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const billingDeleted = await thisService.Model.findByIdAndDelete(billingCreated._id);
      assert.strictEqual(billingDeleted._id.toString(), billingCreated._id.toString());
    });
  });
});