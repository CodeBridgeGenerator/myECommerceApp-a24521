
    module.exports = function (app) {
        const modelName = "product";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productId: { type:  String , comment: "productId, p, false, true, true, true, true, true, true, , , , ," },
title: { type:  String , comment: "title, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , comment: "description, p, false, true, true, true, true, true, true, , , , ," },
price: { type:  String , comment: "price, p, false, true, true, true, true, true, true, , , , ," },
productImage: { type:  String , comment: "productImage, p, false, true, true, true, true, true, true, , , , ," },
stockQuantity: { type: Number, max: 10000000, comment: "stockQuantity, p_number, false, true, true, true, true, true, true, , , , ," },
color: { type:  String , comment: "color, p, false, true, true, true, true, true, true, , , , ," },
size: { type:  String , comment: "size, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };