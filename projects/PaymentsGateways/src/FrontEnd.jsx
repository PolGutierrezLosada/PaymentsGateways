import React from 'react'

import CartButton from './CartButton.jsx'
import Product from './Product.jsx'

import { useState } from 'react'

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
    // variable that counts the number of products in the cart.
    const [cartCount, setCartCount] = useState(0);

    // array that contains all the products that have been added to the cart.
    const [cart, setCart] = useState([]);

    // function that handles the click on a product.
    function handleClick(product) {
        // I do copy the previous cart and add the new product to it.
        setCart([...cart, product]);
        // I increase the cart count by 1.
        setCartCount(cartCount + 1);
        console.log(cartCount);
    }

  return (
    <div>
        <CartButton cartCount={cartCount} />

        <div className="products-container">
            <Product product={firstProduct} onClick={handleClick} />
            <Product product={secondProduct} onClick={handleClick} />
            <Product product={thirdProduct} onClick={handleClick} />
        </div>
    </div>
  )
}