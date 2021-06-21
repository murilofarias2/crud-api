const express = require('express')

const User = require('../models/User')

module.exports = {

    async register(req,res){
        const { username, password } = req.body
        const userExists = await User.findOne(username)

        if(userExists){
            res.status(400).json({
                success:false,
                error:'Usuário já cadastrado',
            })
        }
        
    }

    
}