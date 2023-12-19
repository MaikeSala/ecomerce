import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    id: number;
    nome_completo: string;
    email: string;
    password: string;
    telefone: string;
    cidade: string;
    prefComunicacao: string;
    dataNascimento: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome_completo: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING
    },
    cidade: {
        type: DataTypes.STRING
    },
    prefComunicacao: {
        type: DataTypes.STRING
    },
    dataNascimento: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});