var jsonxml = require('jsontoxml'),
    format = require('xml-formatter');
    
var modelo = {};

var xml = jsonxml(templateJson);

var formattedXml = format(xml);
console.log(formattedXml)

