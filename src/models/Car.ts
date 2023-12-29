import mongoose, { Document, Schema} from "mongoose";

export interface Car extends Document {
    userId: string;
    itens: {
        productId: string;
        quantidade: number;
    }[];
}

const carSchema = new Schema<Car>({
    userId: {type: String, required: true},
    itens:[
        {
            productId: { type: String, required: true},
            quantidade: {type: Number, required: true},
        },
    ],
});

export const CarModel = mongoose.model<Car>('Car', carSchema);