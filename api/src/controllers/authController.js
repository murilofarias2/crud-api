const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


const router = express.Router();


router.post('/registeruser', register);
router.post('/authuser', authenticate);

function generateToken(params = {}){
    return  jwt.sign(params, authConfig.secret, {
        expiresIn:86400, //1 dia
    });
}

async function register(req,res){
    const { username, password } = req.body;
    const userExists = await User.findOne({username});
    if(userExists){
        return res.status(400).json({
            success:false,
            error:'Usuário já cadastrado',
        })
    }
 
    const user = await User.create({
        username,
        password,
    })

    user.password = undefined;

    return res.status(200).json({
        success:true,
        user,
        token:generateToken({ username }),
    })
}

async function authenticate(req, res){
    const { username, password } = req.body;
    const user = await User.findOne({username}).select('+password');
    
    if(!user){
        return res.status(400).json({
            success:false,
            error:'Usuário não cadastrado',
        });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).json({
            success:false,
            error:'Senha incorreta',
        });
    }

    user.password = undefined;

    return res.status(200).json({
        success:true,
        user,
        token:generateToken({ username }),
    })


}   

module.exports = router;