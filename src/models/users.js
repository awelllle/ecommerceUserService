
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UsersSchema = new Schema({
    
    firstName: { 
        type: String,
       
    },
    lastName: { 
        type: String,
       
    },
    email: { 
        type: String,
    },
    gender : String, 
    phone: String,
  
    password: {
        type: String,  
    }, 
    created: {type: Date}
});

module.exports = mongoose.model('User', UsersSchema);
