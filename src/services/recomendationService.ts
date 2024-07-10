import { ProductModel } from '../models/Product';

export const generateRecommendations = async () => {
    const popularProducts = await ProductModel.find()
        .sort({ views: -1 }) // Ordenar por visualizações de forma decrescente
        .limit(10); // Limitar aos 10 produtos mais populares

    return popularProducts;
};
