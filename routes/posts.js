const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/',verify, (req, res) => {
    res.send("okay");
});

module.exports = router;
