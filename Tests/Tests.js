//UNIT TESTS

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

//Teste http-request
chai.use(chaiHttp);



                                                    //Test af login User funktion:


describe("login", () => {
  describe("POST/Login", () => {
    //Brugeren indtaster det rigtige login og dataen bliver returneret og behandlet som json
    it("Checks if the data is handled as an json object and given status 200 on succeesful login", function (done) {
        //Bruger chai
        chai
        //Vi tester en request på login url'en
        .request("http://localhost:3000/users")
        //Det er en POST-request
        .post("/login")
        //Bruger oplysninger fra vores database
        .send({ username: "test", password: "test_user" })
        //Vi tester for paramterne af response og error
        .end((err, res) => {
          //Der skal ikke ske nogen fejl
          should.not.exist(err);
          //Status code 200 "success"
          res.should.have.status(200);
          //At response bliver returneret og behandlet som json
          res.type.should.equal("application/json");
          done();
        });
    });
    it("Wrong user login but with our error of still getting a status code 200", function (done) {
      chai
        .request("http://localhost:3000/users")
        .post("/login")
        //Brugeroplysningerne findes ikke i databasen
        .send({ username: "forkertLogin", password: "forkertPassword" })
        .end((err, res) => {
          //Der vil ikke ske nogen fejl selvom det er forkert loginoplysninger
          should.not.exist(err);
          //Modtager status kode 200
          res.should.have.status(200);
                    //Koden der gør vores bruger ikke kan logge ind selvom man får status kode 200
          /* user_login.js
          .then(data => {
            if (data.length === 0) {
            window.alert("Either username or password is incorrect. Please try again."
          }
          */
          //Response ville være et objekt
          res.body.should.be.instanceOf(Object);
          //Fordi brugeren indtastede de forkerte oplysninger vil vores response være tomt
          //hertil bliver de ikke omdiregeret men forbliver på siden med en window.alert
          res.body.should.deep.equal([]);
          done();
        });
    });
    it("Correct user login with status code 200", function (done) {
      chai
        .request("http://localhost:3000/users")
        .post("/login")
        //Brugeroplysninger fra vores database
        .send({ username: "test", password: "test_user" })
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          //Response vil igen være et objekt
          res.body.should.be.instanceOf(Object);
          //Denne gang vil objektet indeholde brugerens id (som vi gemmer i local storage)
          //Og brugeren bliver derefter omdiregeret
          res.body.should.deep.equal([{ id: 77 }]);
          done();
        });
    });
  });
});
