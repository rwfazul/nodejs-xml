const fs = require('fs');
const assert = require('assert');
const libxml = require('libxmljs');

console.log('using: libxmljs');

// le arquivo xml
var getXML = function (xmlFilename) {
	var xml;
	try {
		xml = libxml.parseXmlString(
			fs.readFileSync(xmlFilename, 'utf-8').toString()
		);
		console.log('xml is well formed');
	} catch (err) {
		console.log('xml is not well formed');
		process.exit(1);
	}
	return xml;
}

var getXSD = function (xsdFilename) {
	var xsd = libxml.parseXmlString(
		fs.readFileSync(xsdFilename, 'utf-8').toString(),
		{ baseUrl: './services/files/' }
	);
	return xsd;
}

module.exports = {

	// validar dtd
	validateDTD: function (nota, callback) {
		var xmlFilename = `./services/files/${nota}.xml`;
		console.log(xmlFilename);

		var xml = getXML(xmlFilename);
		var dtdValidate = libxml.Document.fromXml(xml, {
			dtdvalid: true,
			baseUrl: './services/files/',
		});
		if (!dtdValidate || dtdValidate.errors.length == 0) {
			console.log('xml is valid (dtd)');
			callback(xmlFilename);
		}
		else {
			console.log('Error getting documents', dtdValidate.errors);
			callback(xmlFilename, dtdValidate.errors);
		}
	},

	//validar XSD
	validateXSD: function (nota, callback) {
		var xmlFilename = `./services/files/${nota}.xml`;
		var xml = getXML(xmlFilename);
		var xsdFilename = './services/files/notas.xsd';
		var xsd = getXSD(xsdFilename);

		if (xml.validate(xsd)) {
			callback(xmlFilename);
			console.log('xml is valid (xsd)');
		}
		else {
			console.log('xml is not valid (xsd): ' + xml.validationErrors)
			callback(xmlFileName, xml.validationErrors);
		}
		// assert.equal(xml.validate(xsd), true);
		// assert.equal(xml.validationErrors.length, 0);

		// xpath queries (sem xmlns nao funciona)
		//var gchild = xml.get('//xmlns:natOp', 'http://www.portalfiscal.inf.br/nfe');
		//console.log(gchild ? gchild.text() : gchild),
	}
	
};
