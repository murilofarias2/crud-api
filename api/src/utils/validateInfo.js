function validateInfo(values){
    let errors = {}

    const numberLenght = (string) => {
        let number = 0;
        for (let index = 0; index < string.length; index++) {
            if(!isNaN(string[index])){
            number++;
            }
        }
        return number
    }


    if(!values.name.trim()){
        errors.name = 'Insira seu nome completo'
    }

    if(!values.age || values.age < 1){
        errors.age = 'Insira uma idade válida'
    }

    if(!values.cpf || numberLenght(values.cpf) !== 11){
        errors.cpf = 'Insira um CPF válido'
    }

    if(!/\S+@\S+\.\S+/.test(values.mail)){
        errors.mail = 'Insira um email válido'
    }

    if(!values.phone || numberLenght(values.phone) !== 13){
        errors.phone = 'Insira um telefone válido'
    }

    if(Object.keys(errors).length >= 1){
        errors.slider = 'Preencha os campos com informações válidas antes de salvar' 
    }

    return errors
}

module.exports = validateInfo