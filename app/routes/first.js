var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  //show first.ejs page.
  res.status(200).render('pages/first.ejs');
});

module.exports = router;