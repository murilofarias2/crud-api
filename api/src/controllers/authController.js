const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken(params = {}){
    return  jwt.sign(params, authConfig.secret, {
        expiresIn:86400, //1 dia
    });
}


module.exports = {    
    async register(req,res){
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
    },
    
    async authenticate(req, res){
        const { username, password } = req.body;
        const user = await User.findOne({username}).select('+password');
        
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.json({
                success:false,
                error:'Usuário ou senha incorretos',
            });
        }   
        
        user.password = undefined;
    
        return res.status(200).json({
            success:true,
            user,
            token:generateToken({ username }),
        })
    
    
    },
}