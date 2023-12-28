import { checkSchema } from 'express-validator';

export const editAction = checkSchema({
    token: {
        notEmpty: true,
    },
    name: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 2}
        },
        errorMessage: 'Nome precisa tem pelo menos 2 caracteres'
    },
    email: {
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-mail inválido'
    },
    password: {
        optional: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
    },
    telefone: {
        optional: true,
        isLength: {
            options: { min: 10 }
        },
        errorMessage: 'Telefone não preenchido'
    },
    prefComicacao: {
        optional: true,
    },
    dataNascimento: {
        optional: true,
    },
    endereco: {
        optional: true,
    }
    
});
