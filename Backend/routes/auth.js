const express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    { body, validationResult } = require('express-validator'), //used de-structuring to include 
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    fetchUser = require('../middleware/fetchuser');
require('dotenv').config(); // used dotenv module to setup up environment variable 

// Route1:- api/auth/createuser 
router.post('/createuser', [
    body('name', 'name shoud of min 3 characters').isLength({ min: 3 }), //check using express=validator
    body('email', 'enter a valid email').isEmail(), //check using express=validator
    body('password', 'Minimum 5 characters required').isLength({ min: 5 })], //check using express=validator
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() }); //return error + json
        }
        try {
            let salt = await bcrypt.genSalt(10); //generates salt 
            const secPass = await bcrypt.hash(req.body.password, salt); //generates hashed password
            //user is added to databse using .create()
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            //setting up authToken
            const data = {
                user: {
                    id: user.id
                }
            }
            //auth token is generated using data and secret string
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({success ,authToken});//here using es6 authtoken is being send
        }
        catch (error) {
            res.status(500).send('some error occured,' + error.message);
        }
    })

// Route2:- api/auth/login
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password is empty').not().isEmpty()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body; //destructuring email and pass from req.body
    try {
        // finding user from req.body.email from database
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send({success, error: 'Invalid Credentials'});
        //after finding user, we are verifying req.body.password(hash) from password hash from database
        let passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) return res.status(400).json({success, error: 'Invalid Credentials'});
        //setting up jwt using user id 
        const data = {
            user: {
                id: user.id
            }
        }
        let authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})
 
// Route3:- /api/auth/getuser
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        // getting req.user extracted from authToken (fetchUser middleware has login of extraction)
        let user_id = req.user.id;
        //Fetching user from datbase using authToken extracted information
        const user = await User.findById(user_id).select('-password');
        res.send(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;