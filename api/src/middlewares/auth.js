const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            success:false,
            error:'Sem token de autenticação'
        });
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).json({
            success:false,
            error:'Erro no token de autenticação'
        });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).json({
            success:false,
            error:'Token mal formatado'
        });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).json({
                success:false,
                error:'Token invalido'
            });
        }

        req.username = decoded.username
        return next();
    })
}