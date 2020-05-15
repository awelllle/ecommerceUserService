

const chai = require("chai");
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


 //assuming you're using port 3010 according to the env file. Please change to whichever port you're using
 //Also, please make sure your server is running on another terminal
 let url = "http://localhost:3010";

describe('/Login a user', () => {
  it('it should be successful', (done) => {
    
    let email = "wale@gmail.com";
     let password = "password";

    chai.request(url)
        .post('/auth')
        .send({ email: email, password: password })
        .end((err, res) => {

           expect(err).to.be.null;
           expect(res).to.be.json;
           expect(res).to.have.status(200);
             
          done();
        });
  }).timeout(11000);
});



describe('/Decode a token', () => {
  it('it should be successful', (done) => {
    
    //Generate another token from postman incase this one expires
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbGVAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoid2FsZSIsImxhc3ROYW1lIjoiQWRlbnVnYSIsImlhdCI6MTU4OTQyNzYyNywiZXhwIjoxNTg5NjAwNDI3fQ.IGGUj3v4e_aPq8NZ3NlEW1S-5PdX_nMWoo6nj26rsLg";
     

    chai.request(url)
        .post('/decodeToken')
        .send({ token: token })
        .end((err, res) => {

           expect(err).to.be.null;
           expect(res).to.be.json;
           expect(res).to.have.status(200);
             
          done();
        });
  }).timeout(9000);
});

