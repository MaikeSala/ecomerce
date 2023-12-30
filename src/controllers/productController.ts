import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ProductModel, Product } from '../models/Product';


export const promocaoDestaque = async (req:Request, res: Response) => {
//listar produtos
    let products = await ProductModel.find({destaque: true});
    res.json({products});
}

export const addProduct = async (req:Request, res: Response) => {
    let token = req.body.token;
    let data: Product = req.body;

    // Cria novo produto
    const newProduct = new ProductModel ({
        name: data.name, 
        descricao: data.descricao, 
        preco: data.preco, 
        quantidade: data.quantidade, 
        categoria: data.categoria, 
        fabricante: data.fabricante, 
        data_criacao: data.data_criacao, 
        id_user: data.id_user, 
        imagem: data.imagem ,
        promocao: data.promocao, 
        destaque: data.destaque, 
        avalicao_media: data.avalicao_media, 
        views: data.views
    });
    await newProduct.save();

    res.json({});
}
export const getList = async (req:Request, res: Response) => {
    
}
export const getItem = async (req:Request, res: Response) => {
    
}
export const editAction = async (req:Request, res: Response) => {
    
}