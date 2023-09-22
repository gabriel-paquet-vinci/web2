var express = require('express');
var router = express.Router();

let getMethod = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Request counter : ");
  if(req.method == 'GET')
    getMethod++;
  console.log("GET / : " + counterGet);
  res.render('index', { title: 'Express' });
});

module.exports = router;
