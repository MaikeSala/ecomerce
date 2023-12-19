import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface ProdutctInstance extends Model {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria: string;
    fabricante: string;
    data_criacao: string;
    imagem: string,
    promocao: boolean,
    destaque: boolean,
    avalicao_media: number
}

export const Product = sequelize.define<ProdutctInstance>('Product', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    preco: {
        type: DataTypes.NUMBER
    },
    quantidade: {
        type: DataTypes.NUMBER
    },
    categoria: {
        type: DataTypes.STRING
    },
    fabricante: {
        type: DataTypes.STRING
    },
    data_criacao: {
        type: DataTypes.STRING
    },
    imagem: {
        type: DataTypes.STRING
    },
    promocao: {
        type: DataTypes.BOOLEAN
    },
    destaque: {
        type: DataTypes.BOOLEAN
    },
    avaliacao_media: {
        type: DataTypes.NUMBER
    }
}, {
    tableName: 'produto',
    timestamps: false
});