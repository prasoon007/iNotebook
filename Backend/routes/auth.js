const express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    { body, validationResult } = require('express-validator'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');


const JWT_SECRET = 'ifoiefi93dae323d[]];-290843209?;[;lsw3sa';
//api/auth/createuser
router.post('/createuser', [
    body('name', 'name shoud of min 3 characters').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Minimum 5 characters required').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json(authToken);
        }
        catch (error) {
            res.status(500).send('some error occured,' + error.message);
        }
    })

module.exports = router;