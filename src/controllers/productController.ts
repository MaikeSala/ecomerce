import { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';

// Essa funcão pega todos os produtos em promocção e em destaque
export const promocaoDestaque = async (req:Request, res: Response) => {
    let produtosDestaque = await Product.findAll({
        where: {
            destaque: true,
        }
    });
    let produtosPromocao = await Product.findAll({
        where: {
            promocao: true,
        }
    });
    console.log('Produtos em destauqe:', JSON.stringify(produtosDestaque));
    console.log('Produtos em promocao:', JSON.stringify(produtosPromocao));
}

export const addProduct = async (req:Request, res: Response) => {
    
}
export const getList = async (req:Request, res: Response) => {
    
}
export const getItem = async (req:Request, res: Response) => {
    
}
export const editAction = async (req:Request, res: Response) => {
    
}