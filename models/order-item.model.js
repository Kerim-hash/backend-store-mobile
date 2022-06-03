const mongoose = require("mongoose");


const OrderItemSchema = mongoose.Schema(
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
exports.OrderItemModel = mongoose.model("OrderItem", OrderItemSchema);
