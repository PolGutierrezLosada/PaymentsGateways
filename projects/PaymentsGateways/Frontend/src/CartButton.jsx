import './ShoppingCart.css'

// I do import the library that allows me to change url:
import { useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

// class that contains everything related with the cart button.
export default function CartButton(props) {
    const navigate = useNavigate();
    const [buttonClicked, setButtonClicked] = useState(false);

    // function that handles the click on the cart button.
    function handleClick() {
        // I change the state of the button to clicked.
        setButtonClicked(true);
    }

    // use effect that navigates to the cart page when the button is clicked.
    useEffect(() => {
        if (buttonClicked) {
            navigate('/cart', { state: { productsList: props.cart } });
            // I reset the button clicked state to false.
            setButtonClicked(false);
        }
    }, [buttonClicked, navigate, props.cart]);

  return (
    <div className="cart-container">
        <button className="cart-button cart-icon-button" onClick={handleClick}>
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/shopping-cart-white-icon.png" alt="Carrito" className='cart-icon' /> 
            <span className="cart-count">{props.cartCount}</span>
        </button>
    </div>
  )
}