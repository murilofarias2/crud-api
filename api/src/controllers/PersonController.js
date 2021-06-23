const Person  = require('../models/Person');
const validate = require('../utils/validateInfo');
const ObjectID = require("mongodb").ObjectID


module.exports = {

    async indexPerson(req, res){
        const personArray = await Person.find()
        return res.json(personArray)
    },

    async storePerson(req, res){
        const { name, mail, phone, cpf, age } = req.body;
        const errors = validate(req.body)
        if(!errors.length){
            const personExists = await Person.findOne({cpf})

            if (personExists) {
                console.log(`Pessoa de CPF:${cpf} já está cadastrada`)
                return res.json({
                    success: false,
                    errors:{cpf:'Pessoa já cadastrada'},
                })
            }

            const person = await Person.create({
                name,
                mail,
                phone,
                cpf,
                age
            })

            return res.json({
                success:true,
                person,
            })
        }

        return res.json({
            success:false,
            errors,
        })
        
    },

    async getPerson(req, res){
        const { id } = req.params
        if(ObjectID.isValid(id)){
            const personExists = await Person.findOne({_id:id})
            if(personExists){
                return res.json({
                    success:true,
                    personExists,
                })
            }
        }       
        return res.status(400).json({
            success: false,
            error:'Pessoa não cadastrada'
        })
    },

    async deletePerson(req, res){
        const { id } = req.params
        if(ObjectID.isValid(id)){
        const personExists =  await Person.findOne({_id:id})
        if(personExists){
            const person = await Person.deleteOne({_id:id})
            console.log(`Pessoa de CPF:${personExists.cpf} deletada`)
            return res.status(200).json({
                success:true,
                personExists,
            })
        }
    }
        console.log(`Pessoa não cadastrada no sistema`)
        res.status(500).json({
            success:false,           
            error:'Pessoa não cadastrada',

        })
    },

    async changePerson(req, res){
        const { id } = req.params
        if(ObjectID.isValid(id)){
            const personExists =  await Person.findOne({_id:id})
            if(personExists){
                const updatedPerson = await Person.updateOne({_id:id}, req.body)
                console.log('Pessoa atualizada!')
                return res.status(200).json({
                    success:true,
                })
            }
    }
        console.log(`Pessoa não cadastrada no sistema`)
        res.status(500).json({
            success:false,
            error:'Pessoa não cadastrada no sistema'
        })
    }

}