var express = require('express');
var router = express.Router();

// var node_libxml = require('../services/node-libxml');
var libxmljs = require('../services/libxmljs');
var libxslt  = require('../services/libxslt');

router
  .get('/', function (req, res, next) {
    res.render('index', { title: 'XML com JavaScript' });
  })
  .get('/validateDTD/:nota', function (req, res) {
    libxmljs.validateDTD(req.params['nota'], function (valid, err) {
			if (!valid) res.status(500).json({ valid: valid, err: err });
			else res.status(200).json({ valid: valid });
		});
  })
  .get('/validateXSD/:nota', function (req, res) {
    libxmljs.validateXSD(req.params['nota'], function (valid, err) {
			if (!valid) res.status(500).json({ valid: valid, err: err });
      else res.status(200).json({ valid: valid });
		});
  })
  .get('/getPageHtml/:nota', function (req, res) {
    libxslt.processWithXSL(req.params['nota'], function (html) {
      return res.status(200).send(html);
		});
  });

module.exports = router;