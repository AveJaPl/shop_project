
interface BaseProduct {
  name: string;
  description: string;
  price: number;
}

interface IAddedProduct extends BaseProduct {
  category: string;
  quantity: number
}
interface IModifiedProduct extends BaseProduct{
  id: number;
  category: string;
  additionalQuantity: number
}

interface Product extends BaseProduct{
  id: number;
  categoryId: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

type CartProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  itemTotal?: number;
}


type ResponseCart = {
  cartDetails: CartProduct[]; // This should be an array of CartProduct
  totalValue: number;
};

export type {
  IModifiedProduct,
  IAddedProduct,
  Product,
  CartProduct,
  ResponseCart
}