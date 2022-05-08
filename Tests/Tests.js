//UNIT TESTS

var chai= require("chai")
var chaiHttp = require('chai-http');
let should = chai.should();

//For at teste skal der køres "mocha test": 


//Test af login User funktion:

//Korrekt log ind 
chai.use(chaiHttp);
describe("Testing user login API endpoint", function(){
    it ("should return status 200 if user is logged on ", function (done) {
        chai.request('http://localhost:3000/users')
            .post('login')
            .send({email:"hejhej.com", password:"123"})
            .end((err, res) => {
                  res.should.have.status(200)
              done();
            });
    })
    
    //Forkert kode

    it ("should return status 401 on bad user login ", function (done) {
        chai.request('http://localhost:3000/users')
            .post('login')
            .send({email:"hejhej.com", password:"forkertkode"})
            .end((err, res) => {
                  res.should.have.status(401)
              done();
            });
    })
    
    //Token user log in
    it ("should return a token on good user login", function(done) {
        chai.request('http://localhost:3000/users')
        .post("login")
        .send({email:"hejhej.com", password:"123"})
        .end((err,res) => {
            res.should.have.status(200)
            res.body.should.be.instanceOf(Object)
            .and.to.have.property("token")
            done();
        })

    })

})

//Test af log ind Admin funktion

//Korrekt log ind 
describe("Testing admin login API endpoint", function(){
    it ("should return status 200 on good admin login", function (done) {
        chai.request('http://localhost:3000/admin')
            .post('loginadmin')
            .send({username:"admin.com", password:"123"})
            .end((err, res) => {
                  res.should.have.status(200)
              done();
            });
    })

    //Forkert kode
    it ("should return status 401 on bad admin login", function (done) {
        chai.request('http://localhost:3000/admin')
            .post('loginadmin')
            .send({username:"admin", password:"Forkertkode"})
            .end((err, res) => {
                  res.should.have.status(401)
              done();
            });
    })

//Token admin log in
    it ("should return a token on good admin login", function(done) {
        chai.request('http://localhost:3000/admin')
        .post("loginadmin")
        .send({username:"admin.com", password:"123"})
        .end((err,res) => {
            res.should.have.status(200)
            res.body.should.be.instanceOf(Object)
            .and.to.have.property("admintoken")
            done();
        })

    })
})
