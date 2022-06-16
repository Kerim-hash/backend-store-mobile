const express = require("express");
const { UserModel } = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      data: users,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});
router.get("/get/count", async (req, res) => {
  try {
    const count = await UserModel.countDocuments();
    res.status(200).json({
      data: count,
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
    const users = await UserModel.findById(req.params.id);
    res.status(200).json({
      data: users,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: false,
    });
  }
});

router.post('/', async (req, res) => {
    try {
        const product = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          phone: req.body.phone,
          street: req.body.street,
          apartment: req.body.apartment,
          city: req.body.city,
          zip: req.body.zip,
          country: req.body.country,
          isAdmin: req.body.isAdmin,
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
      }
})

router.post("/login", async (req, res) => {
  const user = await UserModel.findOne({email: req.body.email})
  const secret = process.env.secret;
  if(!user) {
      return res.status(400).send('The user not found');
  }

  if(user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
          {
              userId: user.id,
              isAdmin: user.isAdmin
          },
          secret,
          {expiresIn : '1d'}
      )
     
      res.status(200).send({user: user.email , token: token}) 
  } else {
     res.status(400).send('password is wrong!');
  }
});


router.delete("/:id", (req, res) => {
  try {
    UserModel.findByIdAndDelete(req.params.id);
    res.status(202).json({
      message: "user deleted successfully",
      status: true,
    });
  } catch (err) {
    res.status(204).send({
      message: err.message,
      status: false,
    });
  }
});

module.exports = router;