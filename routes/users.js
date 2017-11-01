const express= require('express');
const router= express.Router();
const passport= require('passport');
const jwt= require('jsonwebtoken');
const config=require('../config/database');

const User=require('../models/user');


//Register
router.post('/register',(req,res,next)=>{
    console.log('register');
    let newUser = new User ({
        name : req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user)=>{
        if (err){
            console.log(err);
            res.send({success:false, msg:'error'});
        }else{
            res.send({success:true,msg:'success'})
        }
    })

    
    
})


//AUthenticate
router.post('/authenticate',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByName(username, (err, user)=>{
        if (err) { throw err}

        if (!user){
            return res.json({success:false, msg:'user not found'});
        }

    User.comparePassword(password, user.password, (err, isMatch)=>{

        if (err){ throw err};

        if (isMatch){
            const token= jwt.sign(user, config.secret, {expiresIn: 60800});

            res.json({
            success:true,
            token: 'JWT '+token,
            user:{
                id:user._id,
                name:user.name,
                username:user.username,
                email:user.email
            }
        })
        }else{

             return res.json({success:false, msg:'Invalid password'});

        }

        

    })

    })
})


//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),(req,res,next)=>{

    res.json({user:req.user});
    
})

module.exports = router;
