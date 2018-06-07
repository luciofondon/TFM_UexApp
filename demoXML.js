var convert = require('xml-js');


var modelo = {
	root: {
		topic: [
			{
				name: "Nombre topic 1", questions: [
					{
						description: "¿Pregunta1 Topic 1?",
						answers:[
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"}
						]
					},
					{
						description: "¿Pregunta1 Topic 1?",
						answers:[
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"}
						]
					}
				]


			},
			{
				name: "Nombre topic 1", questions: [
					{
						description: "¿Pregunta1 Topic 1?",
						answers:[
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"}
						]
					},
					{
						description: "¿Pregunta1 Topic 1?",
						answers:[
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"},
							{description: "Respuesta",requirement: "Requisito"}
						]
					}
				]


			}
		]
	}
};

var result1 = convert.json2xml(modelo,  {compact: true, spaces: 4});
console.log(result1)
console.log("***************")
var result2 = convert.xml2json(result1, {compact: true, spaces: 4});
console.log(result2)
console.log("***************")

var result3 = convert.json2xml(result2, {compact: true, spaces: 4});

console.log(result3)
