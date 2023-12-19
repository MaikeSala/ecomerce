import { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';

export const pong = (req: Request, res: Response) => {
    res.json({ping: true});
}

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({where: { email }});
        if(!hasUser) {
            let newUser = await User.create({ email, password });

            res.status(201);
            res.json({ id: newUser.id });
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    let { email, password, name, phone, adress, prefComunicacao, infoPagamento, datanascimento} = req.body;

    if(email && password && name && phone && adress) {

    }

    res.json({ status: false });
}

export const list = async(req:Request, res: Response) => {
    let users = await User.findAll();
    let produto = await Product.findAll();

console.log("Usuarios:",JSON.stringify(users));
console.log("Produto:",JSON.stringify(produto));
}
