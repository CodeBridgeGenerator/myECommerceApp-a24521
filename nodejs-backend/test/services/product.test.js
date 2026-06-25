const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("product service", async () => {
  let thisService;
  let productCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("product");

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
    assert.ok(thisService, "Registered the service (product)");
  });

  describe("#create", () => {
    const options = {"productId":"new value","title":"new value","description":"new value","price":"new value","productImage":"new value","stockQuantity":23,"color":"new value","size":"new value"};

    beforeEach(async () => {
      productCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new product", () => {
      assert.strictEqual(productCreated.productId, options.productId);
assert.strictEqual(productCreated.title, options.title);
assert.strictEqual(productCreated.description, options.description);
assert.strictEqual(productCreated.price, options.price);
assert.strictEqual(productCreated.productImage, options.productImage);
assert.strictEqual(productCreated.stockQuantity, options.stockQuantity);
assert.strictEqual(productCreated.color, options.color);
assert.strictEqual(productCreated.size, options.size);
    });
  });

  describe("#get", () => {
    it("should retrieve a product by ID", async () => {
      const retrieved = await thisService.Model.findById(productCreated._id);
      assert.strictEqual(retrieved._id.toString(), productCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"productId":"updated value","title":"updated value","description":"updated value","price":"updated value","productImage":"updated value","stockQuantity":100,"color":"updated value","size":"updated value"};

    it("should update an existing product ", async () => {
      const productUpdated = await thisService.Model.findByIdAndUpdate(
        productCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productUpdated.productId, options.productId);
assert.strictEqual(productUpdated.title, options.title);
assert.strictEqual(productUpdated.description, options.description);
assert.strictEqual(productUpdated.price, options.price);
assert.strictEqual(productUpdated.productImage, options.productImage);
assert.strictEqual(productUpdated.stockQuantity, options.stockQuantity);
assert.strictEqual(productUpdated.color, options.color);
assert.strictEqual(productUpdated.size, options.size);
    });
  });

  describe("#delete", async () => {
    it("should delete a product", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const productDeleted = await thisService.Model.findByIdAndDelete(productCreated._id);
      assert.strictEqual(productDeleted._id.toString(), productCreated._id.toString());
    });
  });
});