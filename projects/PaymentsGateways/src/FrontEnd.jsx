import React from 'react'

import CartButton from './CartButton.jsx'
import Product from './Product.jsx'

import './FrontEnd.css'

// constant that stores the products of the store.
const products = [
    {
        productName: "Zapatillas",
        productPrice: "39.99€",
        productUrl: "https://cdn-icons-png.flaticon.com/512/1785/1785348.png"
    },
    {
        productName: "Móvil",
        productPrice: "299.99€",
        productUrl: "https://cdn-icons-png.flaticon.com/512/2985/2985655.png"
    },
    {
        productName: "Alfombra Felpudo",
        productPrice: "69.99€",
        productUrl: "https://cdn-icons-png.flaticon.com/512/5562/5562182.png"
    }
]

// constant for selecting the first product.
const firstProduct = products[0];
// constant for selecting the second product.
const secondProduct = products[1];
// constant for selecting the third product.
const thirdProduct = products[2];

// in this class, there is going to be everything related with the view of the page.
export default function FrontEnd() {
  return (
    <div>
        <CartButton />

        <div className="products-container">
            <Product product={firstProduct} />
            <Product product={secondProduct} />
            <Product product={thirdProduct} />
        </div>
    </div>
  )
}