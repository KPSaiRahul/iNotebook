const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query,body, validationResult } = require('express-validator');

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
    //Check whether the user email already exists
    try{
    let user =await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    //Create a User
    user = await User.create({
        name :req.body.name,
        email :req.body.email,
        password:req.body.password
    })
    // .then(user=>res.json(user))
    // .catch(err => {console.log(err)
    res.json(user);

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