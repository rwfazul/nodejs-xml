const Libxml = require('node-libxml');

console.log('using: node-libxml');

// le arquivo xml
var libxml = new Libxml(); 
if (libxml.loadXml('./services/files/nota4.xml'))
	console.log('xml is well formed');
else {
	console.log('xml is not well formed');
	process.exit(1);
}

// valida com dtd
libxml.loadDtds(['./services/files/notas.dtd']);
let xmlIsValidDtd = libxml.validateAgainstDtds();  // doc ta errada https://www.npmjs.com/package/node-libxml
if (xmlIsValidDtd && !libxml.validationDtdErrors)
	console.log('xml is valid (dtd)');
else
	console.log('xml is not valid (dtd):' + libxml.validationDtdErrors);
libxml.freeDtds();

// valida com schema
libxml.loadSchemas(['./services/files/notas.xsd']);
let xmlIsValidSchema = libxml.validateAgainstSchemas();
if (xmlIsValidSchema && !libxml.validationSchemaErrors)
	console.log('xml is valid (xsd)');
else
	console.log('xml is not valid (xsd):' + libxml.validationSchemaErrors);
libxml.freeSchemas();

// xpath/xquery
let result = libxml.xpathSelect("string(//*[local-name()='prod'])");
console.log(result);

libxml.freeXml(); 
// libxml.clearAll();

module.exports = libxml;