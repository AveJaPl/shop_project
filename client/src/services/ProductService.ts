import axios from 'axios';
import Product from '@/types/product';
import Category from '@/types/Category';

const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get('/api/products');
    return response.data;
}

const AddProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post('http://localhost:4000/products/', product);
    return response.data;
}

const DeleteProduct = async (id: number): Promise<Product> => {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
}

const UpdateProduct = async (oldProductId: number, product: Product): Promise<Product> => {
    const response = await axios.put(`/api/products/${oldProductId}`, product);
    return response.data;
}

const getAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get('/api/products/categories');
    return response.data as Category[];
}

const AddCategory = async (category: {name: string}): Promise<{id: number}> => {
    const response = await axios.post('/api/products/categories', category);
    return response.data;
}

export {
    getAllProducts,
    AddProduct,
    DeleteProduct,
    UpdateProduct,
    getAllCategories,
    AddCategory
}