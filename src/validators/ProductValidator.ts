import { checkSchema } from 'express-validator';

export const product = checkSchema({
    token: {
        notEmpty: true,
    },
    name: {
        notEmpty: true,
        trim: true,
        isLength: {
            options: { min: 2}
        },
        errorMessage: 'Nome precisa tem pelo menos 2 caracteres'
    },
    descricao: {
        notEmpty: true,
        trim: true,
        isLength: {
            options: { min: 2}
        },
        errorMessage: 'Descricao precisa ter pelo menos 2 caracteres'
    },
    preco: {
        notEmpty: true,
        isLength: {
            options: { min: 1}
        },
        errorMessage: 'Preco precisa ter pelo menos 1 caractere'
    },
    quantidade: {
        notEmpty: true,
        isLength: {
            options: { min: 1}
        },
        errorMessage: 'Quantidade precisa tem pelo menos 2 caracteres'
    },
    categoria: {
        optional: true,
    },
    fabricante: {
        optional: true,
    },
    data_criacao: {
        optional: true,
    },
    ide_user: {
        optional: true,
    },
    imagem: {
        optional: true,
    },
    promocao: {
        optional: true,
    },
    destaque: {
        optional: true,
    },
    avaliacao_media: {
        optional: true,
    },
    views: {
        optional: true,
    }
});

export const upload = checkSchema({
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
    descricao: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 2}
        },
        errorMessage: 'Descricao precisa ter pelo menos 2 caracteres'
    },
    preco: {
        optional: true,
        isLength: {
            options: { min: 1}
        },
        errorMessage: 'Preco precisa ter pelo menos 1 caractere'
    },
    quantidade: {
        optional: true,
        isLength: {
            options: { min: 1}
        },
        errorMessage: 'Quantidade precisa tem pelo menos 2 caracteres'
    },
    categoria: {
        optional: true,
    },
    fabricante: {
        optional: true,
    },
    data_criacao: {
        optional: true,
    },
    ide_user: {
        optional: true,
    },
    imagem: {
        optional: true,
    },
    promocao: {
        optional: true,
    },
    destaque: {
        optional: true,
    },
    avaliacao_media: {
        optional: true,
    },
    views: {
        optional: true,
    }
});
