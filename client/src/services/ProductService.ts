import axios from 'axios';
import { IAddedProduct, IModifiedProduct, Product } from '@/types/product';
import Category from '@/types/Category';

const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get('http://localhost:4000/products');
    return response.data as Product[]
}
const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(`http://localhost:4000/products/${id}`);
    return response.data as Product
}

const AddProduct = async (product: IAddedProduct): Promise<Product> => {
    const response = await axios.post('http://localhost:4000/products/', product);
    return response.data as Product
}

const DeleteProduct = async (id: number): Promise<Product> => {
    const response = await axios.delete(`http://localhost:4000/products/${id}`);
    return response.data as Product
}

const UpdateProduct = async (oldProductId: number, product: IModifiedProduct): Promise<Product> => {
    const response = await axios.put(`http://localhost:4000/products/${oldProductId}`, product);
    return response.data as Product
}

const GetAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get('http://localhost:4000/category');
    return response.data as Category[];
}

const GetCategoryById = async(categoryId: number): Promise<Category>=>{
    const response = await axios.get(`http://localhost:4000/category/${categoryId}`)
    return response.data as Category
}

const getNewArrivalProducts = async (): Promise<Product[]> => {
    console.log("jestem w getNewArrivalProducts client service")
    const response = await axios.get('http://localhost:4000/products/newarrival');
    return response.data as Product[]
}

const getBestSellerProducts = async (): Promise<Product[]> => {
    const response = await axios.get('http://localhost:4000/products/bestseller');
    return response.data as Product[]
}

const getRecommendedProducts = async (): Promise<Product[]> => {
    const response = await axios.get('http://localhost:4000/products/recommended');
    return response.data as Product[]
}

export {
    getAllProducts,
    getProductById,
    AddProduct,
    DeleteProduct,
    UpdateProduct,
    GetAllCategories,
    GetCategoryById,
    getNewArrivalProducts,
    getBestSellerProducts,
    getRecommendedProducts
}