const express = require('express');
const ProductModel = require('../models/product.model');

class ProductsController {
    async index(req, res) {
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
     
    }
   
}


module.exports = new ProductsController()