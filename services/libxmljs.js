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

// le arquivo xsd
var getXSD = function (xsdFilename) {
	var xsd = libxml.parseXmlString(
		fs.readFileSync(xsdFilename, 'utf-8').toString(),
		{ baseUrl: './services/files/' }
	);
	return xsd;
}

module.exports = {

	// validar com dtd
	validateDTD: function (nota, callback) {
		var xmlFilename = `./services/files/${nota}.xml`;
		var xml = getXML(xmlFilename);
		var dtdValidate = libxml.Document.fromXml(xml, {
			dtdvalid: true,
			baseUrl: './services/files/',
		});
		if (!dtdValidate || dtdValidate.errors.length == 0) {
			console.log('xml is valid (dtd)');
			callback(true);
		}
		else {
			console.log('xml is not valid (dtd): ' + dtdValidate.errors.toString());
			callback(false, dtdValidate.errors.toString());
		}
	},

	// validar com xsd
	validateXSD: function (nota, callback) {
		var xmlFilename = `./services/files/${nota}.xml`;
		var xml = getXML(xmlFilename);
		var xsdFilename = './services/files/notas.xsd';
		var xsd = getXSD(xsdFilename);
		if (xml.validate(xsd)) {
			console.log('xml is valid (xsd)');
			callback(true);
		}
		else {
			console.log('xml is not valid (xsd): ' + xml.validationErrors.toString());
			callback(false, xml.validationErrors.toString());
		}
	}
	
		// assert.equal(xml.validate(xsd), true);
		// assert.equal(xml.validationErrors.length, 0);

		// xpath queries (sem xmlns nao funciona)
		//var gchild = xml.get('//xmlns:natOp', 'http://www.portalfiscal.inf.br/nfe');
		//console.log(gchild ? gchild.text() : gchild),
};