
    module.exports = function (app) {
        const modelName = "billing";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            billingId: { type: Number, max: 10000000, comment: "billingId, p_number, false, true, true, true, true, true, true, , , , ," },
billingName: { type:  String , comment: "billingName, p, false, true, true, true, true, true, true, , , , ," },
customerId: { type:  String , comment: "customer Id, p, false, true, true, true, true, true, true, , , , ," },
billingAddress: { type:  String , comment: "billingAddress, p, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , maxLength: 150, index: true, trim: true, comment: "paymentMethod, p, false, true, true, true, true, true, true, , , , ," },
transactionId: { type:  String , comment: "transactionId, p, false, true, true, true, true, true, true, , , , ," },
transactionDate: { type: Date, comment: "transactionDate, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };