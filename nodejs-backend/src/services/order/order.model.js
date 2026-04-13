
    module.exports = function (app) {
        const modelName = "order";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderId: { type:  String , comment: "orderId, p, false, true, true, true, true, true, true, , , , ," },
orderName: { type:  String , comment: "orderName, p, false, true, true, true, true, true, true, , , , ," },
shippingAddress: { type:  String , comment: "shippingAddress, p, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type: Number, max: 10000000, comment: "totalAmount, p_number, false, true, true, true, true, true, true, , , , ," },
orderStatus: { type:  String , comment: "orderStatus, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };