"use strict"

 var assert = require('assert');
var request = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let expect = chai.expect;
      
 const config = require('../../../config/config.js')

 var request = request("http://localhost:" + config.PORT)

 describe('products', function() {
     describe('GET', function(){
         it('Should return json as default data format', function(done){
             request.get('/api/users')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });
         it('Should return json as data format when set Accept header to application/json', function(done){
             request.get('/api/products')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });
     });
     describe('POST', function(){
         it('Should return 201 status code and location header', function(done){

             let product = {sku: "ab48cicj36734",
                            asin: "B015E8UTIU",
                            upc: "888462500449",
                            title: "Apple iPhone 6s 64 GB US Warranty Unlocked Cellphone - Retail Packaging (Rose Gold)",
                            image: "http://ecx.images-amazon.com/images/I/91DpCeCgSBL._SL1500_.jpg"}

             request.post('/api/products')
                 .send(product)
                 .expect(201)
                 .expect('Location', '/api/products/ab48cicj36734',done);
         });
     });
 });
