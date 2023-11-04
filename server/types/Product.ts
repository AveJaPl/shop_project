interface ResponseProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    countInStock: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IModifiedProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    additionalQuantity: number;
}

interface IAddedProduct{
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number
}


export {
    IModifiedProduct,
    IAddedProduct,
    ResponseProduct
};