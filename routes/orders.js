const express = require("express");
const { OrderItemModel } = require("../models/order-item.model");
const { OrderModel } = require("../models/order.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const orderList = await OrderModel.find().populate('user', 'name')

  if (!orderList) {
    res.status(500).json({ message: "orders not found" });
  }
  res.status(200).send({ data: orderList });
});

router.get("/:id", async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  .populate('user', 'name')
  .populate({path: 'orderItems', populate: {path: 'product', populate: 'category'} });

  if (!order) {
    res.status(500).json({ message: "order not found" });
  }
  res.send({ data: order  });
});


  

 router.post("/", async (req, res) => {
  // try {
  const orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItemModel({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemIdsResolved = await orderItemIds;
  let totalPrices  = await Promise.all(orderItemIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItemModel.findById(orderItemId).populate('product')
      const totalPrice = orderItem.product.price * orderItem.quantity 
      return totalPrice
  })) 
  const totalPrice = totalPrices.reduce((a,b) => a + b, 0) 
  const order = new OrderModel({
    orderItems: orderItemIdsResolved ,
    shippingAddress: req.body.shippingAddress,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  
  
  if (!order) {
     res.status(400).json({
      data: "order not created",
      status: false,
    });
  }
  await order.save();
  res.status(201).json({
    data: order,
    status: true,
  });
});

router.put("/:id", async (req, res) => {
  // try {
   
  const order = await OrderModel.findByIdAndUpdate(req.params.id, {
    status: req.body.status,

  }, {new: true});
  
  
  if (!order) {
    res.status(400).json({
      data: "order not found",
      status: false,
    });
  }
  res.status(200).json({
    data: order,
    status: true,
  });
 
});

router.delete("/:id", async (req, res) => {
  const order = await OrderModel.findByIdAndRemove(req.params.id).
  then(async order => {
    if (order) {
      await order.orderItems.map(async orderItem => {
        await OrderItemModel.findByIdAndRemove(orderItem)
      })
      return res.status(202).send({ message: 'order deleted'});
    }else {
     return  res.status(404).send({ message: 'order not found' });
    }
  })
  .catch(err => {
   return  res.status(500).send({ message: err.message})
  }) 
});

router.get('/get/totalsales', async (req, res) => {
  const totalSales = await OrderModel.aggregate([
    {$group: {_id: null,totalSales: {$sum: '$totalPrice'}}}
  ])

  if(!totalSales) {
    return res.status(400).send({message: 'The order sales cannot be generated' })
  }

  res.send({totalSales: totalSales.pop().totalSales})
})

router.get('/get/count', async (req, res) => {
  const orderCount = await OrderModel.countDocuments()

  if(!orderCount){
    res.status(500).send({message: 'order not found'})
  }

  res.send({
    orderCount: orderCount
  })
})

router.get('/get/userorders/:userid', async (req, res) => {
    const userOrderList = await OrderModel.find({user: req.params.userid})
  .populate({path: 'orderItems', populate: {path: 'product', populate: 'category'} }).sort({'createdAt': -1})

  if(!userOrderList) {
    res.status(500).json({success: false})
  }

  res.send(userOrderList)
})

module.exports = router;
