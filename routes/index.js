var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    // var plantRows = [];
    // var chunkSize = 3;
    // for (var i = 0; 1 < docs.length; i += chunkSize) {
    //   plantRows.push(docs.slice(i, i + chunkSize));
    // }
    res.render('shop/index', { title: 'Plants Webstore', products: docs });
  });
});

module.exports = router;
//
//
//
// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('shop/index', { title: 'My Webstore' });
// });
//
// module.exports = router;
