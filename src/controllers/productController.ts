import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ProductModel } from '../models/Product';


export const promocaoDestaque = async (req:Request, res: Response) => {
//listar produtos
    let products = await ProductModel.find({destaque: true});
    res.json({products});
}

export const addProduct = async (req:Request, res: Response) => {
    
}
export const getList = async (req:Request, res: Response) => {
    
}
export const getItem = async (req:Request, res: Response) => {
    
}
export const editAction = async (req:Request, res: Response) => {
    
}