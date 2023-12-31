import { checkSchema } from 'express-validator';

export const signup = checkSchema({
    name: {
        trim: true,
        notEmpty: true,
        isLength: {
            options: { min: 2}
        },
        errorMessage: 'Nome precisa tem pelo menos 2 caracteres'
    },
    email: {
        isEmail: true,
        notEmpty: true,
        normalizeEmail: true,
        errorMessage: 'E-mail inválido'
    },
    password: {
        notEmpty: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
    },
    telefone: {
        notEmpty: true,
        isLength: {
            options: { min: 10 }
        },
        errorMessage: 'Telefone não preenchido'
    },
    prefComicacao: {
        optional: true,
        notEmpty: true,
    },
    dataNascimento: {
        optional: true,
        notEmpty: true,
    }
    
});

export const signin = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-mail inválido'
    },
    password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
    },
});