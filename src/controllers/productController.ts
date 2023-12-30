import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ProductModel, Product } from '../models/Product';
import multer from 'multer';
import { validationResult, matchedData } from 'express-validator';

export const promocaoDestaque = async (req:Request, res: Response) => {
//listar produtos
    let destaque = await ProductModel.find({destaque: true});
    let promocao = await ProductModel.find({promocao: true});
    res.json({destaque, promocao});
}

export const addProduct = async (req:Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }
    const dat = matchedData(req);


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
        promocao: data.promocao, 
        destaque: data.destaque, 
        avalicao_media: data.avalicao_media, 
        views: data.views
    });
    await newProduct.save();

    res.json({});
}

export const upload = async (req:Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }
    const data = matchedData(req);
    
    const token = req.query.token;
    const fileName = req.file?.filename;

    // Pega infos do usuario baseado no token
    const user = await UserModel.findOne({token});

    // Pega as infos do produto
    const produtId = req.body.productId
    const product = await ProductModel.findById(produtId);

    // Verifica se id do user é mesmo id_user que esta no produto
    if(product?.id_user === user?.id) {
        // Adiciona o nome da imagem junto as infos do produto
        if(product) {
            product.imagem = fileName || '';
            console.log(product?.imagem);
            await product.save();
        } else {
            return res.json({error : 'Produto não encontrado'});
        }
    } else {
        res.json({error: 'O produto não pertence ao cliente'});
    }

    return res.json({});
}

export const getList = async (req:Request, res: Response) => {
    
}
export const getItem = async (req:Request, res: Response) => {
    
}
export const editAction = async (req:Request, res: Response) => {
    
}