import mongoose, {Document, Schema} from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    token: string;
    telefone: string;
    endereco: {
        cidade: string,
        rua: string,
        numero: string
    };
    prefComunicacao: boolean;
    dataNascimento: string;
}

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String, require: true},
    telefone: {type: String, required: true},
    endereco: {
        cidade: {type: String},
        rua: {type: String},
        numero: {type: String},
    },
    prefComunicacao: {type: Boolean},
    dataNascimento: {type: String}
});

export const UserModel = mongoose.model<User>('User', userSchema);