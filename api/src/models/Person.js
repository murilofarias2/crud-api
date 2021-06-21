const { Schema, model } = require('mongoose')

const PersonSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    cpf:{
        type: 'string',
        required: true
    },
    mail:{
        type: 'string',
        required: true
    },
    phone:{
        type: 'string',
        required: true
    },
    age:{
        type: Number,
        required: true
    },
}, {
    timestamps:true,
})

module.exports = model('Person', PersonSchema)