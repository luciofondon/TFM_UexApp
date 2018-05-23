/// https://www.paradigmadigital.com/dev/testeo-api-rest-mocha-chai-http/

let chai = require('chai'),
	chaiHttp = require('chai-http'),
	expect = require('chai').expect,
    Promise = require('promise');

chai.use(chaiHttp);

const config = require('../../config/config.js');
const server= 'http://localhost:' + config.SERVER_PORT;

let loginUser = {
	'email': config.USER_MAIL_TEST_ADMIN,
	'password': config.USER_PASSWORD_TEST_ADMIN
};

let aplicationCreate;

function login(){
	let promise = new Promise(function(resolve, reject){
		chai.request(server)
		.post('/auth/login')
		.send(loginUser)
		.end((err, res) => {
			expect(res).to.have.status(200);
			let token = res.body.token;
			resolve(token);
		});
	});
	return promise;
}

describe('APLICATION: ',()=>{
	it('read aplications', (done) => {
		login().then(function(token){
			chai.request(server)
			.get('/api/aplications')
			.set('authorization', "Bearer " + token)
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
		});
	});

	it('create aplication', (done) => {
		login().then(function(token){
			chai.request(server)
			.post('/api/aplications')
			.set('authorization', "Bearer " + token)
			.send(
				{
					project: "5b05c2e59c0721f88f2ddb1e",
					name: 'Nombre proyecto',
					description: "Descripcion aplicacion"
				}
			)
			.end( function(err,res){
				aplicationCreate = res.body;
				expect(res).to.have.status(200);
				done();
			});
		});
	});

	it('update aplication', (done) => {
		login().then(function(token){
			chai.request(server)
			.put('/api/aplication/' + aplicationCreate._id )
			.send(
				{
					project: "5b05c2e59c0721f88f2ddb1e",
					name: 'Nombre proyecto2',
					description: "Descripcion aplicacion2"
				}
			)
			.set('authorization', "Bearer " + token)
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
		});
	});

	it('delete aplication', (done) => {
		login().then(function(token){
			chai.request(server)
			.delete('/api/aplication/' + aplicationCreate._id )
			.set('authorization', "Bearer " + token)
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
		});
	});
});




/*
describe('Insert a aplication with error: ',()=>{
	it('should receive an error', (done) => {
		chai.request(url)
			.post('/aplications')
			.send({des: "Descripcion"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(500);
				done();
			});
	});

});

describe('get all aplications: ',()=>{

	it('should get all aplications', (done) => {
		chai.request(url)
			.get('/aplications')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});

describe('get the country with id 1: ',()=>{

	it('should get the country with id 1', (done) => {
		chai.request(url)
			.get('/country/1')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.have.property('id').to.be.equal(1);
				expect(res).to.have.status(200);
				done();
			});
	});

});

describe('update the days of country with id 1: ',()=>{

	it('should update the number of days', (done) => {
		chai.request(url)
			.put('/country/1/days/20')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.have.property('days').to.be.equal(20);
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('delete the country with id 1: ',()=>{

	it('should delete the country with id 1', (done) => {
		chai.request(url)
			.get('/countries')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.have.lengthOf(2);
				expect(res).to.have.status(200);
				chai.request(url)
					.del('/country/1')
					.end( function(err,res){
						console.log(res.body)
						expect(res).to.have.status(200);
						chai.request(url)
							.get('/countries')
							.end( function(err,res){
								console.log(res.body)
								expect(res.body).to.have.lengthOf(1);
								expect(res.body[0]).to.have.property('id').to.be.equal(0);
								expect(res).to.have.status(200);
								done();
						});
					});
			});
	});

});
*/
