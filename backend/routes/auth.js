const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query,body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagood$boy';

//creating a user using POST "/api/auth/createuser". No login required.  doesn't require auth
router.post('/createuser',[
    body('name','Enter a valid email').isLength({min:3}),    // VALIDATING USING EXPRESS-VALIDATOR
    body('email', 'Enter a valid email').isEmail() ,
    body('password', 'Password must be atleast 5 characters long').isLength({min:5})
] ,async (req, res) =>{

    //if there are errors, return bad req and the errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //Check whether the user email already exists
    let user =await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    // ADDING SALT AND HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const secPass =  await bcrypt.hash(req.body.password,salt);
    //Create a User
    user = await User.create({
        name :req.body.name,
        email :req.body.email,
        password:secPass
    })
    const data ={
        user:{
            id:user.id
        }
    }
    //USING JWT TOKEN TO NOTE THE USER's AUTHENTICATION
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({authToken});
    // .then(user=>res.json(user))        //CONVERTING USER TO JSON AND ADDING IT ELSE SENDING ERROR
    // .catch(err => {console.log(err)
    // res.json(user);

    // const user = User(req.body);      ||  MANUAL METHOD NO VERIFICATION
    // user.save();    //saving user to mongodb
    // res.json(obj);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error occurred: " + error.message);

    }
})
module.exports = router;