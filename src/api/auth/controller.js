
const {validParam, sendPostRequest, authenticate, generateToken, generateCode, sendErrorResponse, sendSuccessResponse, trimCollection} = require('../../helpers/utility');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    let required = [
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'password', type: 'string'},
      
    ];

    req.body = trimCollection(req.body);
    const body = req.body;
    //console.log(req.body);


    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

     
        User.findOne({email: body.email}, function (err, result) {
            if (err) {
                return sendErrorResponse(res, err, 'Something went wrong');
            }
            if (result) {
                return sendErrorResponse(res, {}, 'Someone else has registered with that email');
            
            }else{

                    let token = generateToken({ email: body.email,firstName: body.firstName, lastName: body.lastName});

                    let nUser            = new User();
                    let hash             = bcrypt.hashSync(body.password, 10);
                    nUser.firstName    = body.firstName;
                    nUser.lastName     = body.lastName;
                    nUser.email        = body.email;
                    nUser.gender       = body.gender;
                    nUser.phone        = body.phone; 
                    nUser.password     = hash;
                
                    nUser.save((err) => {
                        console.log(err);
                        if (err) {
                            return sendErrorResponse(res, err, 'Something went wrong');
                        }
                        return sendSuccessResponse(res, {token: token, nUser}, 'User registered');
                     });
              }                
        });
    }else{
        
        return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
    } 
}

exports.auth = (req, res, next) => {

    let required = [
        {name: 'email', type: 'string'},
        {name: 'password', type: 'string'},
       
    ];
    
    req.body = trimCollection(req.body);
    const body = req.body;
    console.log(req.body);

    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        User.findOne( {email: body.email }, (err, result) => 
            {
                if (err)
                {
                    console.log(err);
                    return sendErrorResponse(res, {}, 'Something went wrong, please try again');
                }
                if (result) {
                    
                    if(bcrypt.compareSync(body.password, result.password )) {


                        let token = generateToken({ email: body.email,firstName: result.firstName, result: body.lastName});


                        return sendSuccessResponse(res, {token: token, user: result}, 'Login successful');
                        
                    } else {
                        return sendErrorResponse(res, {}, 'Incorrect password, please try again');
                        }
                }else{
                    return sendErrorResponse(res, {}, 'Sorry we can\'t find anyone with those details');
                }
            });
    }else{
        return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
    }
};

exports.decodeToken = (req, res, next) => {
    let required = [
        {name: 'token', type: 'string'},
    ];

    req.body = trimCollection(req.body);
    const body = req.body;
    console.log(req.body);

    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        authenticate(body.token, (err, data) => {
            if(err) {    
                return sendErrorResponse(res, {}, err);
            }
            console.log(data, "Token decoded");
            return sendSuccessResponse(res, {data}, "Token Valid");

        });

}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
 }
}
