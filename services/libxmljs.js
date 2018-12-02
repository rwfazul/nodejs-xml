const fs     = require('fs');
const assert = require('assert');
const libxml = require('libxmljs');

console.log('using: libxmljs');

// le arquivo xml
var xmlFilename = './services/files/nota4.xml';
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

// validar dtd
var dtdValidate = libxml.Document.fromXml(xml, {
  dtdvalid: true,
  baseUrl: './services/files/',
});
if (!dtdValidate || dtdValidate.errors.length == 0) 
	console.log('xml is valid (dtd)');
else
	console.log(dtdValidate.errors);

// validar xsd
var xsdFilename = './services/files/notas.xsd'; 
var xsd = libxml.parseXmlString(
	fs.readFileSync(xsdFilename, 'utf-8').toString(), 
	{ baseUrl: './services/files/' }
);

if (xml.validate(xsd))
	console.log('xml is valid (xsd)');
else 
	console.log('xml is not valid (xsd): ' + xml.validationErrors)
// assert.equal(xml.validate(xsd), true);
// assert.equal(xml.validationErrors.length, 0);

// xpath queries (sem xmlns nao funciona)
//var gchild = xml.get('//xmlns:natOp', 'http://www.portalfiscal.inf.br/nfe');
//console.log(gchild ? gchild.text() : gchild),

module.exports = {};