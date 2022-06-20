const mongoose = require("mongoose");


const Schema = mongoose.Schema
const OrderItemSchema = new Schema(
  {
    product:   {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity: {type: Number, required: true },
    
  },
  {
    timestamps: true,
  }
);


// OrderItemSchema.virtual("id").get(function () {
//     return this._id.toHexString();
//   });
//   OrderItemSchema.set("toJSON", {
//     virtuals: true,
//   });
module.exports = mongoose.model("OrderItem", OrderItemSchema);
