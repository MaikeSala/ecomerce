import { Request, Response } from 'express';
import { UserModel, User } from '../models/User';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';


export const getInfo = async (req:Request, res: Response) => {
    
    let token = req.query.token;

    // Pesquisa de qual usuario é o token e quais produtos pertencem a esse user
    const user = await UserModel.findOne({token});
    const id = user?.id;
    const products = await ProductModel.find({id_user: id});


    res.json({
        name: user?.name,
        email: user?.email,
        telefone: user?.telefone,
        endereco: {
            cidade: user?.endereco.cidade,
            rua: user?.endereco.rua,
            numero: user?.endereco.numero,
        },
        prefComunicacao: user?.prefComunicacao,
        dataNascimento: user?.dataNascimento,
        products: products.map(product => ({
            name: product.name,
            descricao: product.descricao,
            preco: product.preco,
            quantidade: product.quantidade,
            categoria: product.categoria,
            fabricante: product.fabricante,
            data_criacao: product.data_criacao,
            imagem: product.imagem,
            promocao: product.imagem,
            destaque: product.destaque,
            avaliacao_media: product.avalicao_media,
        })),
    })
}

export const attInfo = async (req:Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }
    const data = matchedData(req);

    let updates: Partial<User> = {};

    if(data.name) {
        updates.name = data.name
    }

    if(data.email) {
        const emailCheck = await UserModel.findOne({email: data.email});
        if(emailCheck) {
            res.json({error: 'Email já existe'})
            return;
        }
        updates.email = data.email;
    }
    if(data.password) {
        const passwordUpdate = await bcrypt.hash(data.password, 10);
        updates.password = passwordUpdate;
    }

    if (data.endereco) {
        updates.endereco = {
            cidade: data.endereco.cidade,
            rua: data.endereco.rua,
            numero: data.endereco.numero,
        };
    }
    console.log(data.endereco, data.name);

    if(data.prefComunicacao) {
        updates.prefComunicacao = data.prefComunicacao
    }

    if(data.dataNascimento) {
        updates.dataNascimento = data.dataNascimento
    }


    await UserModel.findOneAndUpdate({token: data.token},{$set: updates});


    res.json({});
}

export const carrinhoList = async (req:Request, res: Response) => {
    
}

export const carrinhoAdd = async (req:Request, res: Response) => {
    
}

export const checkout = async (req:Request, res: Response) => {
    
}

export const checkoutPost = async (req:Request, res: Response) => {
    
}

export const pedidos = async (req:Request, res: Response) => {
    
}