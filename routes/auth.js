const { hash } = require('bcryptjs');
const User = require('../model/User');
//const Post = require('../model/');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation'); 
const verifyToken = require('../routes/verifyToken');

//Registration
router.post('/register', async (req, res) => {
    //validating data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check is user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already in use');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    //save user
    try {
        const savedUser = await user.save();
        res.send({ userID: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {

    //validating data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email not in use');
    //correct password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    const userr= user.name;
    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({id:user._id,email:user.email,token:token});
});
 
//post
router.post('/posts',verifyToken, async (req, res) => {
    res.status(200).send('posted......');

});



module.exports = router;
