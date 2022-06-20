const mongoose = require("mongoose");


const Schema = mongoose.Schema
const ProductSchema =  new Schema({
    name: { required: true, type: String },
    image: { required: true, type: String, default: "" },
    counterInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 300,
    },
    description: { required: true, type: String },
    richDescription: { type: String, default: "" },
    images: [{ type: String }],
    brand: [{ type: String, default: "" }],
    price: { required: true, type: Number, default: 0 },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    rating: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  });

ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
})
ProductSchema.set('toJSON', {
  virtuals: true
})

exports.ProductModel = mongoose.model("Product", ProductSchema);
