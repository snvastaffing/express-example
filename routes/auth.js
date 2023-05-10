const User = require("../model/user")
var express = require('express');
var router = express.Router();


//here we have tio do the following :- 
// 1. Get the user input 
// 2. Validate the input 
// 3. Validate if the user the same email already exists the input 
// 4. using Brcypt we will encrypt the password 
// 5. create a user in mongodb database 
// finally we need to create a signed JWT token that shall be expired after 24 hours 


/* GET home page. */
router.post('/register', function (req, res, next) {
    try {
        const { firstName,
        lastName,
        email,
        password,
        confirmPassword } = req.body;

        if(!(email && (password == confirmPassword) && email, firstName,lastName)){
            res.status(400).send("All Fields are required");
        }

        const existingUser=        User.findOne({email})
        if(existingUser){
            return res.status(409).send(`The user with email : ${email} already exists`)
        }

        // encrypt the password 
        

    } catch (error) {
        console.log(error)
    }
});

router.post('/login', function (req, res, next) {
    // implementation goes here 
});
