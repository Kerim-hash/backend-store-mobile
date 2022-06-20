const express = require("express");
const cloudinary = require("../helpers/cloudinary");
const uploadPhoto = require("../helpers/upload-photo");
const router = express.Router();
const { CategoryModel } = require("../models/category.model");
const  ProductModel = require("../models/product.model");

router.get("/", async (req, res) => {
      let filter = {}
    if(req.query.categories){
        filter ={category: req.query.categories.split(",")}
    }
    const products = await ProductModel.find(filter).populate('category');

    if(!products) {
        res.status(404).json({
            data: 'products not found',
            status: false,
          });
    }

    res.status(200).json({
      data: products,
      status: true,
    });
 
});
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );
    res.status(200).json({
      data: product,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});

router.post("/",  uploadPhoto.single("photo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  // console.log(req.body)
  // console.log(req.file)
  try {
    const product = new ProductModel({
      name: req.body.name,
      image: result.url,
      description: req.body.description,
      richDescription: req.body.richDescription,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      counterInStock: req.body.counterInStock,
    });
    await product.save();
    res.status(201).send({
      data: product,
      status: true,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
      status: false,
    });
    console.log(err)
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        richDescription: req.body.richDescription,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        counterInStock: req.body.counterInStock,
      },
      { new: true }
    );
    product.save();
    res.status(200).send({
      data: product,
      status: true,
    });
  } catch (err) {
    res.status(204).send({
      message: err.message,
      status: false,
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    ProductModel.findByIdAndDelete(req.params.id);
    res.status(202).json({
      message: "product deleted successfully",
      status: true,
    });
  } catch (err) {
    res.status(204).send({
      message: err.message,
      status: false,
    });
  }
});

// router.get("/get/count", async (req, res) => {
//   try {
//     const count = await ProductModel.countDocuments();
//     res.status(200).json({
//       data: count,
//       status: true,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//       status: false,
//     });
//   }
// });

router.get("/get/featured/:count", async (req, res) => {
    const count = req.params.count ?  req.params.count : 0
    const products = await ProductModel.find({isFeatured: true}).limit(count)

    if(!products){
        res.status(400).send({
          message: 'products not found',
          status: false,
        });
    }

    res.status(200).send({
      data: products,
      status: true,
    });
});

module.exports = router;
