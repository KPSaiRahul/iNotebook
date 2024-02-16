const express = require('express');
const router = express.Router();
const User = require('../models/User');

//creating a user using POST "/api/auth/". doesn't require auth
router.post('/', (req, res) =>{
    {
        name:"yesy"
    }
    console.log(req.body);
    res.send("hello");
    const user = User(req.body);  
    user.save();    //saving user to mongodb
    res.json(obj);
})
module.exports = router;