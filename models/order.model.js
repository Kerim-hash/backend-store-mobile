const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    shippingAddress: { type: String },
    shippingAddress2: { type: String },
    city: { type: String },
    zip: { type: String },
    country: { type: String },
    phone: { type: Number },
    status: { type: String, default: "Pending" },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

OrderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
OrderSchema.set("toJSON", {
  virtuals: true,
});

exports.OrderModel = mongoose.model("Order", OrderSchema);
