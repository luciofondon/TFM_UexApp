/*"use strict"

var assert = require('assert');
var request = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let expect = chai.expect;
      
 const config = require('../../../config/config.js')

 var request = request("http://localhost:" + config.PORT)

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