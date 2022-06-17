const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// import
const productRouter = require("./routes/product");
const CategoryRouter = require("./routes/categories");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/orders");
const authJwt = require("./helpers/jwt");
const res = require("express/lib/response");
const { ProductModel } = require("./models/product.model");

mongoose
  .connect(
    `mongodb+srv://kerim:kera2003kera@cluster0.bvnpd.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log("connection error"));

// промежуточное программное обеспечение
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(authJwt());
// mongoose connect
// routes
app.use("/api/products", productRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/", (req, res) => {
  res.send("Running");
});



let port = process.env.PORT || 5000
app.listen(port, () => {
        console.log(port)
})
