/*

 describe('projects', function() {
     describe('GET', function(){
         it('Should return json as default data format', function(done){
             request.get('/api/projects')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });
         it('Should return json as data format when set Accept header to application/json', function(done){
             request.get('/api/projects')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });
     });
     describe('POST', function(){
         it('Should return 201 status code and location header', function(done){
            let project = {
                 name : "Nombre proyecto",
                 description: "Descripcion proyecto"
            }

             request.post('/api/project')
                 .send(product)
                 .expect(200)
                 .expect('Location', '/api/products/ab48cicj36734', done);
         });
     });
 });
*/

"use strict"

let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = require('chai').expect,
    Promise = require('promise');

chai.use(chaiHttp);

const config = require('../../config/config.js');
const server= 'http://localhost:' + config.SERVER_PORT;

let loginUser = {
    'email': config.USER_MAIL_TEST,
    'password': config.USER_PASSWORD_TEST
};

function login(){
    let promise = new Promise(function(resolve, reject){
        chai.request(server)
        .post('/auth/login')
        .send(loginUser)
        .end((err, res) => {
            console.log( res.body.token);
            expect(res).to.have.status(200);
            let token = res.body.token;
            resolve(token);
        });
    });
    return promise;
}

describe('projects', function() {
    describe('GET', function(){
        login().then(function(token){
            it('Should return json as default data format', function(done){
                chai.request(server)
                .get('/api/projects')
                .set('authorization', token)
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
            });
        });
    });
});