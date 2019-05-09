var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    res.render('shop/index', { title: 'Plants Webstore', products: docs, successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ?  req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart', function(req, res, next) {
    // if no cart redirect
    if(!req.session.cart) {
      return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
  // if no cart redirect
  if(!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }
    var cart = new Cart(req.session.cart);
    var errorMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errorMsg: errorMsg, noErrors: !errorMsg});
});

router.post('/checkout', function(req, res, next) {
  // if no cart redirect
  if(!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);

  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY); // test private STRIPE Key

  stripe.charges.create({
    amount: cart.totalPrice*100,
    currency: "eur",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      req.flash('error', err.message);
      res.redirect('/checkout');
    }
    req.flash('success', 'purchase successful');
    req.session.cart = null;
    res.redirect('/');
  });

});

module.exports = router;
