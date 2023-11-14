import React from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import { addToCart } from '@/services/cart';
import { getSocket } from '@/services/getSocket';

const FullProductPage: React.FC<{ product: Product }> = ({product }) => {
  const inStock = product.countInStock > 0;
  const stockIndicatorColor = inStock ? 'text-green-500' : 'text-red-500';
  const stockText = inStock ? 'In Stock' : 'Out of Stock';
  const isLongName = product.name.length > 20;
  const socket = getSocket()
  const handleAddToCart = async() =>{
    try{
      socket.emit('add-to-cart', product.id)
    }catch(error){
      console.log(error);
    }

  }

  return (
    <div className="sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-2/5 mx-auto p-4 flex flex-col justify-center items-center">
      <div className="w-full bg-white shadow-lg overflow-hidden md:flex">

        <div className="md:w-1/2 sm:flex sm:justify-center xs:flex xs:justify-center">
          <Image
            src='/placeholder.png'
            alt={product.name}
            width={400} // Adjust the size as needed
            height={400} // Adjust the size as needed
            objectFit='contain' // To make sure the image doesn't stretch
          />
        </div>

        <div className="md:w-1/2 px-10 py-6 flex flex-col justify-between">
          <div className={`flex flex-col ${isLongName ? 'items start' : 'items-end'}`}>
            <h1 className={`text-2xl font-bold ${isLongName && 'truncate'}`}>{product.name}</h1>
            <div className='flex flex-col items-end'>
              <p className="text-lg font-semibold my-2">{`$${product.price}`}</p>
              <div className='flex items-center'>
                <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <p className={`${stockIndicatorColor}`}>{stockText}</p>
              </div>
            </div>

          </div>
          <button
          onClick={handleAddToCart}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${!inStock && 'opacity-50 cursor-not-allowed'}`}
            disabled={!inStock}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className='mt-2 w-full bg-white shadow-lg overflow-hidden md:flex p-8 flex-col'>
        <h1 className='font-bold text-xl mb-8'>{product.name}</h1>
        <h1 className='font-bold text-xl'>Description</h1>
        <p className="text-md">{product.description}</p>
      </div>
    </div>
  );
};

export default FullProductPage;
