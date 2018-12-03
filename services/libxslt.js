const fs = require('fs');
const libxslt = require('libxslt');
const libxmljs = require('libxmljs');


module.exports = {

	processWithXSL: function (nota, callback) {

		var xmlFilename = `./services/files/${nota}.xml`;
		var xslFilename = `./services/files/notas-xsl.xsl`;

		var xmlString = fs.readFileSync(xmlFilename, 'utf8').toString();
		var xslString = fs.readFileSync(xslFilename, 'utf-8').toString();

		//var xslObj = libxmljs.parseXml(xslString, { nocdata: true });
		var xsl = libxslt.parse(xslString);
		console.log(xsl);

		var result = xsl.apply(xmlString);
		if (result) {
			callback(result);
		}
		else {
			callback({});
		}

	}
};