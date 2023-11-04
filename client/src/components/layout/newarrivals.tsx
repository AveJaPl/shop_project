"use client"

import React, {useEffect, useState} from 'react'
import ProductCard from '../common/productCard'
import Product from '../../types/product'


function NewArrivals() {
    const [newArrivals, setNewArrivals] = useState<Product[]>([])
    useEffect(() => {
        const fetchNewArrivals = async () => {
            setNewArrivals([
                {
                    id: 1,
                    name: "Produkt 1",
                    price: 100,
                    
                },
                {
                    id: 2,
                    name: "Produkt 2",
                    price: 200,
                    
                },
                {
                    id: 3,
                    name: "Produkt 3",
                    price: 300,
                    
                },
                {
                    id: 4,
                    name: "Produkt 4",
                    price: 400,
                },
                {
                    id: 5,
                    name: "Produkt 5",
                    price: 500,
                },
                {
                    id: 6,
                    name: "Produkt 6",
                    price: 600,
                },
                {
                    id: 7,
                    name: "Produkt 7",
                    price: 700,
                },
                {
                    id: 8,
                    name: "Produkt 8",
                    price: 800,
                },
                {
                    id: 9,
                    name: "Produkt 9",
                    price: 900,
                }

            ])

        }
        fetchNewArrivals()
    }, [])

  return (
    <section>
        <h2 className='text-2xl font-bold my-6'>New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newArrivals.map(product => <ProductCard key={product.id} {...product}/>)}

        </div>
    </section>
  )
}

export default NewArrivals
