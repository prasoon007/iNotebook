const express = require('express'),
      router = express.Router(),
      User   = require('../models/User');

router.post('/', (req, res) => {
    const user = User(req.body);
    user.save();
    res.send("himli")
})
module.exports = router;