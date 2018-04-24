/**
 * @author GammaSolutions - Departamento i + d - 2018
 * @description test para la API de System
*/


const config = require('../../../config/config');

let chai = require('chai'),
	chaiHttp = require('chai-http');

const expect = require('chai').expect;

// Configuracion test
chai.use(chaiHttp);
const url = 'http://localhost:' + config.SERVER_PORT;


describe('/api/rtc: ',()=>{
	it('Obtener hora del sistema', (done) => {
		chai.request(url)
			.get('/api/rtc')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('/api/itsOk: ',()=>{
	it('Obtener hora del sistema', (done) => {
		chai.request(url)
			.get('/api/itsOk')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
