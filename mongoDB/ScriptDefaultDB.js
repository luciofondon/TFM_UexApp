
conn = new Mongo("localhost");
db = conn.getDB("tfm");

var topicos = [
	{
		name: "Iniciales"
	},
	{ 
		name: "Gestión de usuarios - Mode de datos"
	},
	{
		name: "Autenticación"
	},
	{
		name: "Control de acceso"
	},
	{
		name: "Administración de sesiones"
	},
	{
		name: "Validación de entradas"
	},
	{
		name: "Manipulación de errores"
	}
];

var fields = [

]

var questions = [
	{
		question: "¿Qué tipo de aplicativo es?",
		field:
		topic: topicos[0]._id
	},
	{
		question: "¿Qué tipo de datos almacena?"
		field:
		topic: topicos[0]._id
	},
	{
		question: "¿Qué uso se hace del modelo de datos almacenados?",
		field:
		topic: topicos[0]._id
	},
	{
		question: "¿El uso de la aplicación se acoge a algún marco regulatorio?",
		field:
		topic: topicos[0]._id
	},
		{
		question: "¿Qué tipo de datos se guardan del usuario?",
		field:
		topic: topicos[1]._id
	},
	{
		question: "¿Cómo se gestiona el ciclo de vida de la información del modelo datos?"
		field:
		topic: topicos[1]._id
	},
	{
		question: "¿Existe una política de tratamiento de los datos de usuario?",
		field:
		topic: topicos[1]._id
	},
	{
		question: "¿El uso de la aplicación se acoge a algún marco regulatorio?",
		field:
		topic: topicos[1]._id
	}

];




db.getCollections('topics').insert(topicos);


