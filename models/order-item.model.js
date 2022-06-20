const mongoose = require("mongoose");
const OrderItemSchema = new mongoose.Schema(
  {
    product:   {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity: {type: Number, required: true },
    
  },
);


// OrderItemSchema.virtual("id").get(function () {
//     return this._id.toHexString();
//   });
//   OrderItemSchema.set("toJSON", {
//     virtuals: true,
//   });
module.exports = mongoose.model("OrderItem", OrderItemSchema);
