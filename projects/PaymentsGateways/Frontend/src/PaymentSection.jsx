import { useLocation } from "react-router-dom";
import './PaymentSection.css'
import { useEffect, useState, useCallback } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


// this part initializes stripe: it contains the public key and it says if it is okay to continue with the payment.
const stripePromise = loadStripe('pk_test_51S2DDw95S5T5YpVtdJhlhFrmoqxUx1FfhC78sbSX4OdwYr8bbxZoluBXQE60fVUL1grjbzk33WENhi8m9IoApplE00L3vf1TTz');

// in this class, there is going to be a list with all the products that have been added to the cart.
// and a section to pay with stripe.
export default function PaymentSection(props) {
    // this function only executes on time, once the page is loaded or the parameters change, but this never happens:
    // the callback propertie rembers the function between renders.
    const fetchClientSecret = useCallback(() => {
        // I create the checkout session on the backend with the method POST: 
        return fetch("http://localhost:8080/create-checkout-session", { // the entire url because I'm not in the same server.
            method: "POST",
        })
        .then((response) => response.json()) // I parse the response as json (clientSecret is in the body)
        .then((data) => data.clientSecret); // I return the clientSecret
    }, []);

    // now I create the object that does all this process:
    const options = {fetchClientSecret};

    // Recupero lo que mandé con navigate:
    const location = useLocation();
    // en caso de que no haya nada en el state, pongo productsList como un array vacío:
    const productsList = location.state?.productsList || [];

    // Conteos
    let zapatillasCount = 0;
    let movilesCount = 0;
    let alfombrasCount = 0;

    // variables para las modificaciones de cantidad:
    const [zapatillasQuantity, setZapatillasQuantity] = useState(0);
    const [movilesQuantity, setMovilesQuantity] = useState(0);
    const [alfombrasQuantity, setAlfombrasQuantity] = useState(0);  

    // Productos únicos en el orden en que aparecen
    const orderedProducts = [];

    const [cartItems, setCartItems] = useState([]);

    productsList.forEach((product) => {
        if (product.productName === "Zapatillas") {
            zapatillasCount++;
            if (!orderedProducts.includes(product)) {
                orderedProducts.push(product);
            }
        } else {
            if (product.productName === "Móvil") {
                movilesCount++;
                if (!orderedProducts.includes(product)) {
                    orderedProducts.push(product);
                }
            } else {
                if (product.productName === "Alfombra Felpudo") {
                    alfombrasCount++;
                    if (!orderedProducts.includes(product)) {
                        orderedProducts.push(product);
                    }
                }
            }
        }    
    });

    useEffect(() => {
        setZapatillasQuantity(zapatillasCount);
        setMovilesQuantity(movilesCount);
        setAlfombrasQuantity(alfombrasCount);

        setCartItems(orderedProducts);
    }, []); // Empty dependency array to run only once on mount

    // Funciones para los botones + y -
    function handleIncreaseClick(product) {
        if (product.productName === "Zapatillas") {
            setZapatillasQuantity(prev => prev + 1);
        }
        if (product.productName === "Móvil") {
            setMovilesQuantity(prev => prev + 1);
        }
        if (product.productName === "Alfombra Felpudo") {
            setAlfombrasQuantity(prev => prev + 1);
        }
    }
    function handleReduceClick(product) {
        if (product.productName === "Zapatillas") {
            if (zapatillasQuantity > 0) {
                setZapatillasQuantity(prev => prev - 1);
            }
        }
        if (product.productName === "Móvil") {
            if (movilesQuantity > 0) {
                setMovilesQuantity(prev => prev - 1);
            }
        }
        if (product.productName === "Alfombra Felpudo") {
            if (alfombrasQuantity > 0) {
                setAlfombrasQuantity(prev => prev - 1);
            }
        }
    }

    // función para eliminar el producto del carrito:
    function handleDelete(product) {
        const newCart = [...cartItems];
        newCart.splice(newCart.indexOf(product), 1);
        setCartItems(newCart);
    }

    return (
        <div className="page-wrapper">

            <div className="cart-wrapper">
                <h1 className="cart-title">Shopping Cart</h1>
                <div className="cart-container-list">
                    {cartItems.map((product, i) => (
                        <div className="cart-item" key={i}> 
                            <img src={product.productUrl} alt={product.productName} />
                            <div className="cart-item-info">
                                <h2>{product.productName}</h2>
                                <p className="cart-item-price">{product.productPrice}</p>
                            </div>
                            <button className="cart-item-remove" onClick={() => handleDelete(product)}>×</button>
                            <p className="cart-item-quantity">
                                <button onClick={() => handleReduceClick(product)}>-</button>
                                {product.productName == "Zapatillas" && zapatillasQuantity}
                                {product.productName == "Móvil" && movilesQuantity}
                                {product.productName == "Alfombra Felpudo" && alfombrasQuantity}
                                <button onClick={() => handleIncreaseClick(product)}>+</button>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="checkout">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        </div>
        
    );
}