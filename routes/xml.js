var express = require('express');
var router = express.Router();

var node_libxml = require('../services/node-libxml');
var libxmljs = require('../services/libxmljs');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
})
  .get('/validateDTD/:nota', function (req, res) {
    libxmljs.validateDTD(req.params['nota'], function (docs, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docs);
		});
  })
  .get('/validateXSD/:nota', function (req, res) {
    libxmljs.validateXSD(req.params['nota'], function (docs, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docs);
		});
  });

module.exports = router;
