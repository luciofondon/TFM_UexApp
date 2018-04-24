
conn = new Mongo("localhost");
db = conn.getDB("tfm-uex");

var users = [
	{
		"name" : "Administrador",
		"lastName" : "Administrador",
		"rol" : ObjectId("5ad10ee96bc202b82683bd54"),
		"userName" : "admin",
		"email" : "admin@mail.com",
		"created" : new Date(),
		"salt" : "I2O47xf+KFkZOa+eP4fRRw==",
		"hashedPassword" : "ziFIvpsjpkh05TO7JjTNwssyGpBJg4KnekBUJPJzIe6bnKmckcuywPFibQBhbPTPFvdrIksjUM+LaG0OcGpjIg==",
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
		name: "Consultor",
		level: 2
	}
];
print("Lanzando script...")
db.getCollection('users').insert(users);
db.getCollection('rols').insert(roles);
print("Script terminado")

//ssh -f root@139.99.98.115 -L 27037:localhost:27017 -N

