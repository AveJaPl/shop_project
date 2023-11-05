import React from 'react'

function FullProductPage({...product}) {
    console.log(product)
  return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.countInStock}</p>
    </div>
  )
}

export default FullProductPage
