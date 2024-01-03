import mongoose, {Document, Schema} from "mongoose";

export interface Category extends Document {
    name: string;
    slug: string;
    imagem: string
}

const categorySchema = new Schema<Category>({
    name: {type: String},
    slug: {type: String},
    imagem: {type: String},
});

export const CategoryModel = mongoose.model<Category>('Category',categorySchema);