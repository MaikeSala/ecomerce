import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ProductModel, Product } from '../models/Product';
import { validationResult, matchedData } from 'express-validator';
import { CategoryModel, Category } from '../models/Category'
import { product } from '../validators/ProductValidator';

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

export const getList = async (req: Request, res: Response) => {
    const { sort = 'asc', offset = 0, limit = 20, q, cat, views} = req.query;
    let filters: any = {status: true};
    let total: number = 0;

    // Usa os infos da query para aplicar os filtros
    if(q) {
        filters.name = {$regex: q, $options: 'i'};
    }

    if(cat) {
        const c = await CategoryModel.findOne({slug: cat}).exec();
        if(c) {
            filters.categoria = c.id.toString();
        } 
    }

    if(views) {
        const v = await ProductModel.findOne({views}).exec();
        if(v) {
            filters.views = v.id.toString();
        }
    }

    //Busca utilizando os filtros
    const productsTotal = await ProductModel.find(filters).exec();
    total = productsTotal.length;

    const productData = await ProductModel.find(filters)
        .sort({data_criacao: (sort == 'desc' ?-1:1)})
        .skip(+offset)
        .limit(+limit)
        .exec();

    const getCategoryName =async (categoryId: string) => {
        const category = await CategoryModel.findById(categoryId).exec();
        return category?.name || 'Categoria não encontrada';
    }

    const products: Partial<Product>[] = await Promise.all( 
        productData.map(async (product) => ({
            id: product._id,
            name: product.name,
            descricao: product.descricao,
            preco: product.preco,
            quantidade: product.quantidade,
            categoria: await getCategoryName(product.categoria.toString()),
            fabricante: product.fabricante,
            data_criacao: product.data_criacao,
            promocao: product.promocao,
            destaque: product.destaque,
            avaliacao_media: product.avalicao_media,
            views: product.views,
            status: product.status,
            imagem: product.imagem,
        }))
    )

    res.json({results: products, total});
}

export const getItem = async (req:Request, res: Response) => {
    const { name, other = null} = req.query;

    // Verifica se name foi enviado e consulta dados baseado no name
    if(!name) {
        res.json({error: 'Sem produto'});
        return;
    }

    const product = await ProductModel.findOne({ name });
    if(!product) {
        res.json({erro: 'Produto inexistente'});
        return;
    }
    
    // Adiciona uma view no produto
    product.views++;
    await product.save();

    // Busca categoria do produto com base o id categoria
    const category = await CategoryModel.findById(product.categoria);

    res.json({
        id: product._id,
        name: product.name,
        descricao: product.descricao,
        preco: product.preco,
        quantidade: product.quantidade,
        categoria: category?.name,
        fabricante: product.fabricante,
        data_criacao: product.data_criacao,
        promocao: product.promocao,
        destaque: product.destaque,
        avaliacao_media: product.avalicao_media,
        views: product.views,
        status: product.status,
        imagem: product.imagem,
    })
}

export const editAction = async (req:Request, res: Response) => {
    const { id } = req.params;
    let { token, ...updateFields } = req.body;

    if(id.length < 12) {
        res.json({error: 'Id inválido'});
        return;
    }
    const product = await ProductModel.findById(id).exec();
    if(!product) {
        res.json({erro: 'Produto não encontrado'});
        return;
    }

    const user = await UserModel.findOne({ token }).exec();
    if(user?.id !== product.id_user) {
        res.json({error: 'Este anuncio não pode ser editado'});
        return;
    }

    Object.keys(updateFields).forEach((key) => {
        const value = updateFields[key];
        if (value !== undefined) {
            (product as any)[key] = value;
        }
    });
    await product.save();

    res.json({success: 'produto att com sucesso', updateFields: product})
}

export const getCategory = async (req:Request, res: Response) => {

    const cats = await CategoryModel.find();
    const categories: Partial< Product >[] = [];

    for( const cat of cats) {
        categories.push({
            ...cat.toObject(),
            imagem: `${process.env.BASE}/uploads${cat.slug}.jpg`,
        });
    }
    res.json({results: categories});

}

export const addCatefory = async (req:Request, res: Response) => {

    let token = req.body.token;
    let data: Category = req.body;

    const newCategory = new CategoryModel ({
        name: data.name,
        slug: data.slug
    })
    await newCategory.save();

    res.json({});
}

export const uploadCategory = async (req:Request, res: Response) => {
    const token = req.query.token;
    const fileName = req.file?.filename;

    // Pega infos das caregorias
    const categorySlug = req.body.slug
    const categorys = await CategoryModel.findOne({slug: categorySlug});

    // Insere a imagem na categoria correspondente
    if(categorys) {
        categorys.imagem = fileName || '';
        await categorys.save();
    } else {
        return res.json({error : 'Categoria não encontrada'});
    }
    
    res.json({});
}