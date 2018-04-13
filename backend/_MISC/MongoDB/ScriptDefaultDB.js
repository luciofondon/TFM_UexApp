
conn = new Mongo("localhost");
db = conn.getDB("tfm");

var users = [
	{
		name: "Administrador",
		lastName: "Administrador",
		email: "admin@mail.com",
		lastName: "Administrador",
		userName: "admin",
		created: new Date(),
		password: "1234",
		phoneNumber : 666666666
	}
];

var roles = [
	{
		description: "Administrador",
		name: "Administrador",
		level: 1
	},
	{
		description: "Consultor",
		name: "consultor",
		level: 1
	}
];

db.getCollections('users').insert(users);
db.getCollections('rols').insert(roles);


