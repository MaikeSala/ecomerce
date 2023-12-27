import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { validationResult, matchedData } from 'express-validator';


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