interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
    description?: string;
    category?: string;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
}

export default Product;
