import mongoose, {Document, Schema} from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    password: string;
    telefone: string;
    cidade: string;
    prefComunicacao: boolean;
    dataNascimento: string;
}

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    telefone: {type: String, required: true},
    cidade: {type: String, required: true},
    prefComunicacao: {type: Boolean},
    dataNascimento: {type: String}
});

export const UserModel = mongoose.model<User>('User', userSchema);