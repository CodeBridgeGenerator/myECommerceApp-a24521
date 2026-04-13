const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customer service", async () => {
  let thisService;
  let customerCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("customer");

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
    assert.ok(thisService, "Registered the service (customer)");
  });

  describe("#create", () => {
    const options = {"customerId":"new value","fullName":"new value","phoneNumber":23,"email":"new value","password":"new value"};

    beforeEach(async () => {
      customerCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customer", () => {
      assert.strictEqual(customerCreated.customerId, options.customerId);
assert.strictEqual(customerCreated.fullName, options.fullName);
assert.strictEqual(customerCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerCreated.email, options.email);
assert.strictEqual(customerCreated.password, options.password);
    });
  });

  describe("#get", () => {
    it("should retrieve a customer by ID", async () => {
      const retrieved = await thisService.Model.findById(customerCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerId":"updated value","fullName":"updated value","phoneNumber":100,"email":"updated value","password":"updated value"};

    it("should update an existing customer ", async () => {
      const customerUpdated = await thisService.Model.findByIdAndUpdate(
        customerCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerUpdated.customerId, options.customerId);
assert.strictEqual(customerUpdated.fullName, options.fullName);
assert.strictEqual(customerUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerUpdated.email, options.email);
assert.strictEqual(customerUpdated.password, options.password);
    });
  });

  describe("#delete", async () => {
    it("should delete a customer", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const customerDeleted = await thisService.Model.findByIdAndDelete(customerCreated._id);
      assert.strictEqual(customerDeleted._id.toString(), customerCreated._id.toString());
    });
  });
});