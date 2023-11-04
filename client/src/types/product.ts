interface IAddedProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number
}
interface IModifiedProduct{
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  additionalQuantity: number
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}
export type {
  IModifiedProduct,
  IAddedProduct,
  Product
}