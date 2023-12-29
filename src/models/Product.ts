import mongoose, {Document, Schema} from "mongoose";

export interface Product extends Document {
    name: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria: string;
    fabricante: string;
    data_criacao: string;
    id_user: string;
    imagem: string;
    promocao: boolean;
    destaque: boolean;
    avalicao_media: number;
    views: number;
}

const productSchema = new Schema<Product>({
    name: {type: String, required: true},
    descricao: {type: String},
    preco: {type: Number, required: true},
    quantidade: {type: Number, required: true},
    categoria: {type: String},
    fabricante: {type: String},
    data_criacao: {type: String},
    id_user: {type: String},
    imagem: {type: String},
    promocao: {type: Boolean},
    destaque: {type: Boolean},
    avalicao_media: {type: Number},
    views: {type: Number},
});

export const ProductModel = mongoose.model<Product>('Product',productSchema);