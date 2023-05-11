var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/addProduct', function(req, res, next) {
  const employee = req.body
  const data = addEmployee(employee)
  res.send(JSON.stringify(data))
});

module.exports = router;
