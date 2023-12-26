import { Request, Response, NextFunction } from "express"
import { UserModel } from '../models/User';

export const privates = async (req: Request, res: Response, next: NextFunction) => {

    // Condição para saber se o token foi enviado
    if(!req.query.token && !req.body.token) {
        res.json({notallowed: true, msg: 'Token vazio'});
        return;
    }

    let token: string ='';
    // Pegando token do corpo ou da query da requisição 
    if(req.query.token) {
        token = req.query.token as string;
    }

    if(req.body.token) {
        token = req.body.token as string;
    }
    // Condição para saber se o token é vazio    
    if(token == '') {
        res.json({notallowed: true, msg:'token vazio'});
    }

    // Procurar o usuário no BD e verifica se ele existe, se sim ele aciona o next()
    const user = await UserModel.findOne({token});
    if(!user){
        res.json({notallowed: true, msg: 'user não enctrado'});
        return;
    }

    next();
}