
    module.exports = function (app) {
        const modelName = "cart";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            cartId: { type:  String , comment: "cart_Id, p, false, true, true, true, true, true, true, , , , ," },
customerId: { type:  String , comment: "customerId, p, false, true, true, true, true, true, true, , , , ," },
productId: { type:  String , comment: "productId, p, false, true, true, true, true, true, true, , , , ," },
productName: { type:  String , comment: "productName, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, max: 1000000, comment: "quantity, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };