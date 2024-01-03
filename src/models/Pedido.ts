import mongoose, { Document, Schema} from "mongoose";
import { ProductModel } from "./Product";

export interface Order extends Document {
    userId: string;
    products: {
        productId: string;
        quantidade: number;
    }
    totalAmout: number;
    shippingAddress: string;
    status: string;
}

const orderSchema = new Schema<Order>({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantidade: { type: Number, required: true },
        },
    ],
    totalAmout: { type: Number, required: true},
    shippingAddress: { type: String, required: true },
    status: { type: String, default: 'Pending' },
});

export const OrderModel = mongoose.model<Order>('Order', orderSchema);