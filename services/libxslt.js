const fs      = require('fs');
const libxslt = require('libxslt');

var xslFilename = `./services/files/notas.xsl`;

module.exports = {

	// processa xsl
	processWithXSL: function (nota, callback) {
		var xmlFilename = `./services/files/${nota}.xml`;
		var stylesheet = libxslt.parse(
			fs.readFileSync(xslFilename, 'utf-8').toString()
		);
		var result = stylesheet.apply(
			fs.readFileSync(xmlFilename, 'utf8').toString()
		);
		callback(result);
	}

};