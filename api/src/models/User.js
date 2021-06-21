const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    username:{
        type:'string',
        required: true,
    },

    password:{
        type:'string',
        required: true,
        select:false,
    }
})

module.exports = model('User',UserSchema);