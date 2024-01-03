import { Request, Response } from 'express';
import { GeneralInfoModel } from '../models/GeneralInfo';

export const contatoInfo = async (req: Request, res: Response) => {
    // Pega as infos de contato
    try {
        const contatoInfoArray = await GeneralInfoModel.find();

        if (contatoInfoArray.length > 0) {
            const contatoInfo = contatoInfoArray[0];
            res.json({ email: contatoInfo.email, telefone: contatoInfo.telefone });
        } else {
            res.status(404).json({ error: 'Nenhuma informação de contato encontrada' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar informações de contato' });
    }
}

export const contatoPost = async (req:Request, res: Response) => {
    const { email, telefone } = req.body;
    const infosContato = await GeneralInfoModel.find();
    // Att infos de contato
    if(infosContato) {
        const primeiroContato = infosContato[0];
        primeiroContato.email = email;
        primeiroContato.telefone = telefone;
        await primeiroContato.save();
    }
    res.json({});
}

export const sobre = async (req:Request, res: Response) => {
    // Pega indos sobre a empresa
    try {
        const sobreInfoArray = await GeneralInfoModel.find();

        if (sobreInfoArray.length > 0) {
            const sobreInfo = sobreInfoArray[0];
            res.json({ missao: sobreInfo.missao, historia: sobreInfo.historia });
        } else {
            res.status(404).json({ error: 'Nenhuma informação de contato encontrada' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar informações de contato' });
    }
}
export const sobreAdd = async (req:Request, res: Response) => {
    const { missao, historia } = req.body;
    const infosSobre = await GeneralInfoModel.find();
    // Att infos sobre a empresa
    if(infosSobre) {
        const primeiroContato = infosSobre[0];
        primeiroContato.missao = missao;
        primeiroContato.historia = historia;
        await primeiroContato.save();
    }
    res.json({});
}

export const politicas = async (req:Request, res: Response) => {
    // Pega indos de politicas
    try {
        const politicasInfoArray = await GeneralInfoModel.find();

        if (politicasInfoArray.length > 0) {
            const politicasInfo = politicasInfoArray[0];
            res.json({ refundPolicy: politicasInfo.refundPolicy, privacyPolicy: politicasInfo.privacyPolicy });
        } else {
            res.status(404).json({ error: 'Nenhuma informação de contato encontrada' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar informações de contato' });
    }
}
export const politicasAdd = async (req:Request, res: Response) => {

    const { privacyPolicy, refundPolicy } = req.body;
    const infosPoliticas = await GeneralInfoModel.find();
    // Att infos de politicas da empresa
    if(infosPoliticas) {
        const primeiroContato = infosPoliticas[0];
        primeiroContato.privacyPolicy = privacyPolicy;
        primeiroContato.refundPolicy = refundPolicy;
        await primeiroContato.save();
    }
    res.json({});
}