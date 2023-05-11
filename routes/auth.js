const User = require("../model/user")
var express = require('express');
const brcypt = require("bcryptjs")
var router = express.Router();
const jwt = require("jsonwebtoken")

//here we have tio do the following :- 
// 1. Get the user input 
// 2. Validate the input 
// 3. Validate if the user the same email already exists the input 
// 4. using Brcypt we will encrypt the password 
// 5. create a user in mongodb database 
// finally we need to create a signed JWT token that shall be expired after 24 hours 


/* GET home page. */
router.post('/register', async (req, res, next) => {
    try {
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword } = req.body;



        if (!(email && password && confirmPassword && email, firstName, lastName)) {
            res.status(400).send({ error: "All Fields are required" });
        }

        if (password !== confirmPassword) {
            res.status(400).send({ error: `The password ${password} and confirm password ${confirmPassword} does not macth !` });
        }

        const existingUser = await User.findOne({ email })

        console.log("EXIST   " + existingUser)
        if (existingUser) {
            return res.status(400).send({ error: `The user with email : ${email} already exists` });
        }

        // encrypt the password 

        const enrcyptedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: enrcyptedPassword
        });

        // creating a token with some expiry time 

        const token = jwt.sign({
            id: user._id, email
        }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        user.token = token

        res.status(201).json(user)

    } catch (error) {
        console.log(error)
    }
});

router.post('/login', function (req, res, next) {
    // implementation goes here 
});
module.exports = router;