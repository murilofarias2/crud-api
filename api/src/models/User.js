const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


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

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

module.exports = model('User',UserSchema);