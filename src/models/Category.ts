import mongoose, {Document, Schema} from "mongoose";

interface Category extends Document {
    name: string;
    slug: string
}

const categorySchema = new Schema<Category>({
    name: {type: String},
    slug: {type: String}
});

export const CategoryModel = mongoose.model<Category>('Category',categorySchema);