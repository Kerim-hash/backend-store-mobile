const mongoose = require("mongoose");


const CategorySchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    icon: {type: String},
    color: {type: String},
    
  },
  {
    timestamps: true,
  }
);

exports.CategoryModel = mongoose.model("Category", CategorySchema);
