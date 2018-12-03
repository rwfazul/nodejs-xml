const fs     = require('fs');
const assert = require('assert');
const libxml = require('libxmljs');
const glob   = require('glob');

const namespaceUri = 'http://www.portalfiscal.inf.br/nfe';
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
		return false;
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
		if( !xml ) return callback(false, 'xml not find or it is not well formed');
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
		if( !xml ) return callback(false, 'xml not find or it is not well formed');
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
	},

	// aplica xpath
	getProducts: function (callback) {
		// carrega todas as notas
		var notas = glob('./services/files/*.xml', { sync:true }).map(xmlPath => { return getXML(xmlPath) });
		var products = [];
		notas.forEach(nota => {
			var gchild = nota.find('//xmlns:prod', namespaceUri);
			gchild.forEach(element => {
				var product = {
					cProd: element.get("./xmlns:cProd", namespaceUri).text(),
					xProd: element.get("./xmlns:xProd", namespaceUri).text(),
					qCom: Math.round(element.get("./xmlns:qCom", namespaceUri).text() * 100)/100,
					vUnTrib: (Math.round(element.get("./xmlns:vUnTrib", namespaceUri).text() * 100)/100).toFixed(2)
				};
				products.push(product);
			});
		});
		// ordena ascendente pelo valor unitario do produto
		products.sort(function (p1, p2){
			return (p1.vUnTrib - p2.vUnTrib);
		});
		callback(products);
	}

};