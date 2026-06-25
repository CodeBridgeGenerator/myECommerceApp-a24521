
    module.exports = function (app) {
        const modelName = "customer";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerId: { type:  String , comment: "customerId, p, false, true, true, true, true, true, true, , , , ," },
fullName: { type:  String , comment: "full name, p, false, true, true, true, true, true, true, , , , ," },
phoneNumber: { type: Number, max: 10000000, comment: "phone Number, p_number, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "email, p, false, true, true, true, true, true, true, , , , ," },
password: { type:  String , maxLength: 150, index: true, trim: true, comment: "password, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };