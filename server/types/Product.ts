interface BaseProduct {
    name: string;
    description: string;
    price: number;
}

interface ResponseProduct extends BaseProduct {
    id: number;
    categoryId: number;
    countInStock: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IModifiedProduct extends BaseProduct{
    id: number;
    category: string;
    additionalQuantity: number;
}

interface IAddedProduct extends BaseProduct{
    category: string,
    quantity: number
}


export {
    IModifiedProduct,
    IAddedProduct,
    ResponseProduct
};
