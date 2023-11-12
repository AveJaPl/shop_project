import { CartProduct } from '@/types/product';
import axios from 'axios';
import { ResponseCart } from '../types/product';

const getCart = async (): Promise<ResponseCart> => {
    const response = await axios.get('http://localhost:4000/cart', {withCredentials: true});
    return response.data as ResponseCart;
}

const addToCart = async (productId: number): Promise<CartProduct> => {
    const response = await axios.post('http://localhost:4000/cart', {productId}, {withCredentials: true});
    return response.data as CartProduct;
}

const removeFromCart = async (productId: number): Promise<string> => {
    const response = await axios.delete(`http://localhost:4000/cart/${productId}`, {withCredentials: true});
    return response.data as string;
}

const updateCart = async (productId: number, quantity: number): Promise<CartProduct[]> => {
    const response = await axios.put(`http://localhost:4000/cart/${productId}`, {quantity});
    return response.data as CartProduct[];
}

const clearCart = async (): Promise<CartProduct[]> => {
    const response = await axios.delete('http://localhost:4000/cart');
    return response.data as CartProduct[];
}

export {
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart
}