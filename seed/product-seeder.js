var Product = require('../models/product');
var mongoose = require('mongoose');
var dotenv = require('dotenv').config()
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true});

var products = [
  new Product({
  imagePath: 'https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/297350-Leafy-Plant-Pot.jpg',
  title: 'Nice Plant',
  description: 'Nice plant for inside',
  price: 14
}),
  new Product({
  imagePath: 'http://img.thrfun.com/img/021/276/filler_potted_plants_l2.jpg',
  title: 'Small Plant',
  description: 'Smaller plant for inside',
  price: 15
  }),
  new Product({
  imagePath: 'http://www.ikea.com/gb/en/images/products/aloe-vera-potted-plant-aloe__0173210_pe327299_s5.jpg',
  title: 'Ikea Plant',
  description: 'Ikeas favorite plant for inside. Foldable',
  price: 12
  }),
  new Product({
  imagePath: 'http://www.ikea.com/au/en/images/products/fejka-artificial-potted-plant__0136211_PE293491_S4.JPG',
  title: 'Cheap Plant',
  description: 'cheapest option for starters.',
  price: 5
  }),
];

products.map((p, index) => {
   p.save((err, result) => {
     if(index === products.length - 1) {
       console.log('DONE!');
       mongoose.disconnect();
     }
   });
  });﻿
