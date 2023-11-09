import axios from 'axios';
import { IAddedProduct, IModifiedProduct, Product } from '@/types/product';
import { IResponseCategory, ICategoriesWithSubcategories } from '@/types/Category';

const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get('http://localhost:4000/products');
    return response.data as Product[]
}
const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(`http://localhost:4000/products/${id}`);
    return response.data as Product
}

const AddProduct = async (product: IAddedProduct): Promise<Product> => {
    const response = await axios.post('http://localhost:4000/products/', product, { withCredentials: true });
    return response.data as Product
}

const DeleteProduct = async (id: number): Promise<Product> => {
    const response = await axios.delete(`http://localhost:4000/products/${id}`, { withCredentials: true });
    return response.data as Product
}

const UpdateProduct = async (oldProductId: number, product: IModifiedProduct): Promise<Product> => {
    const response = await axios.put(`http://localhost:4000/products/${oldProductId}`, product, { withCredentials: true });
    return response.data as Product
}

const GetAllCategories = async (): Promise<IResponseCategory[]> => {
    const response = await axios.get('http://localhost:4000/category');
    return response.data as IResponseCategory[];
}

const GetCategoryById = async (categoryId: number): Promise<IResponseCategory> => {
    const response = await axios.get(`http://localhost:4000/category/${categoryId}`)
    return response.data as IResponseCategory
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


const getCategoriesWithSubcategories = async (): Promise<ICategoriesWithSubcategories[]> => {
    const response = await axios.get('http://localhost:4000/category/categorieswithsubcategories');
    return response.data as ICategoriesWithSubcategories[];
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
    getRecommendedProducts,
    getCategoriesWithSubcategories
}