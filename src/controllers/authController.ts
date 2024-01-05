import { validationResult, matchedData } from 'express-validator';
import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';
import { CarModel } from '../models/Car';


export const signin = async (req:Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }
    const data = matchedData(req);

    // Validando o email
    const user = await UserModel.findOne({email: data.email});
    if(!user) {
        res.json({error:'Email e/ou senha errados!'});
        return;
    }

    // Validando a senha
    const match = await bcrypt.compare(data.password, user?.password)
    if(!match) {
        res.json({error:'Email e/ou senha errados!'});
        return;        
    }

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();

    res.json({token, email: data.email});
}


export const signup = async (req:Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    // Verefica se email ja existe
    const user = await UserModel.findOne({
        email: data.email
    });

    if(user){
        res.json({
            error:{email:{msg: 'Email já existe'}}
        });
        return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newuser = new UserModel({
        name: data.name,
        email: data.email,
        password: passwordHash,
        token,
        telefone: data.telefone
    });
    await newuser.save();

    const idU = await UserModel.findOne({token});
    // Inicializando carrinho
    const newCar = new CarModel({
        userId: idU?.id,
    })
    await newCar.save();

    res.json({token});

}