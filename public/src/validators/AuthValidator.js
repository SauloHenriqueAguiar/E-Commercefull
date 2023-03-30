const {checkSchema} = require('express-validator');


module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            notEmpty: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail:true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
             options:  { min: 2}  
            },
            errorMessage:'Senha precisa ter pelo menos dois caractere'
 
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado nao preenchido'
        }
    },
    
    )
}