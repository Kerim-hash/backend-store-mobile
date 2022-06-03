const express = require("express");
const { CategoryModel } = require("../models/category.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({
      data: categories,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.status(200).json({
      data: category,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = new CategoryModel({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    category.save()
    res.status(201).json({
      data: category,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if(category){
        res.status(202).json({
          message: "category deleted",
          status: true,
        });
    }else {
        res.status(404).send({
            message: "category not found",
            status: false,
          }); 
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const category = await CategoryModel.findByIdAndUpdate(req.params.id ,{
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      }, {new: true});
      category.save()
      res.status(200).json({
        message: 'category updated successfully',
        status: true,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
        status: false,
      });
    }
  });

module.exports = router;
