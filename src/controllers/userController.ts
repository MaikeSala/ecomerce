import { Request, Response } from 'express';
import { UserModel, User } from '../models/User';
import { ProductModel, Product } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { CarModel } from '../models/Car';
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
    // Preenche updades com os dados modificados
    if(data.name) {
        updates.name = data.name
    }
    // Pesuisa para ver se email já existe no BD
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

    if(data.prefComunicacao) {
        updates.prefComunicacao = data.prefComunicacao
    }

    if(data.dataNascimento) {
        updates.dataNascimento = data.dataNascimento
    }
    //Att os dados do BD
    await UserModel.findOneAndUpdate({token: data.token},{$set: updates});


    res.json({});
}

export const carrinhoList = async (req:Request, res: Response) => {
    
    let token = req.query.token;
    
    //Busca id do usuario através do token de login
    const user = await UserModel.findOne({token});
    if(!user) {
        res.json({error: 'Usuário não encontrado'});
        return;
    }

    // Busca o carrinho associado ao id do usuário
    const car = await CarModel.findOne({userId: user?.id});

    const items: { productId: string; quantidade: number }[] = car?.itens || [];

    const products: { product: Product; quantidade: number }[] = [];

    // Procura com base no productId os produtos e os insere no array products
    for (const item of items) {
        const product = await ProductModel.findById(item.productId).lean();
        if (product) {
            products.push({
            product: product as Product,
            quantidade: item.quantidade 
            });
        } else {
            res.json({ error: 'Produto não encontrado' });
            return;
        }
    }
    
    res.json({
        products
    });
}

export const carrinhoAdd = async (req:Request, res: Response) => {
    
    let token = req.body.token;
    let productId = req.body.produto

    // Verifica se o produto existe no BD
    const product = await ProductModel.find({id: productId});
    if(!product){ 
        res.json({error: 'Produto não encontrado'})
        return;
    }

    // Busca as infos do usuario utilizando o token
    const user = await UserModel.findOne({token});

    // Busca o carrinho do usuario
    const car = await CarModel.findOne({userId: user?.id});
    if(!car) {
        res.json({error: 'Carrinho não encontrado'});
        return;
    }

    // Verifica se o produto ja esta no carrinho
    const items: { productId: string; quantidade: number }[] = car?.itens || [];
    const item = car.itens.find(item => item.productId === productId);

    // Adiciona os produtos no carrinho
    if(item) {
        item.quantidade += 1;
        await car.save();
    } else {
        const newItem = {productId, quantidade: 1};
        car.itens.push(newItem);
        await car.save();
    }

    res.json({});

}

export const carrinhoDelete = async(req:Request, res: Response) => {
    
    let token = req.body.token;
    let productId = req.body.produto;

    // Verifica se o produto existe no BD
    const product = await ProductModel.find({id: productId});
    if(!product){ 
        res.json({error: 'Produto não encontrado'})
        return;
    }

    // Busca as infos do usuario utilizando o token
    const user = await UserModel.findOne({token});
    
    // Busca o carrinho do usuario
    const car = await CarModel.findOne({userId: user?.id});
    if(!car) {
        res.json({error: 'Carrinho não encontrado'});
        return;
    }

    // Verifica se o produto ja esta no carrinho
    const items: { productId: string; quantidade: number }[] = car?.itens || [];
    const item = car.itens.find(item => item.productId === productId);

    /* Verifica se existe apenas um produto no carrinho, se sim, ele deleta,
    se tiver mais de 1, apenas diminui quantidade */
    if(item){
        if(item?.quantidade === 1) {
            car.itens = car.itens.filter(item => item.productId !== productId);
        } else {
            if(item.quantidade !== undefined) {
                item.quantidade -= 1;
            } else {
                console.log('Quantidade do item é undefined');
            }
        }
        await car.save()

    } else {
        res.json({error: 'Produto não encontrado no carrinho'});
        return;
    }

    res.json({});

}

export const pedidos = async (req:Request, res: Response) => {
    
}

export const checkout = async (req:Request, res: Response) => {
    
}

export const checkoutPost = async (req:Request, res: Response) => {
    
}