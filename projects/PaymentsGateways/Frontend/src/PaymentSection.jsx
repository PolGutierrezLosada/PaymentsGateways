import { useLocation } from "react-router-dom";
import './PaymentSection.css'
import { useEffect, useState } from "react";

// in this class, there is going to be a list with all the products that have been added to the cart.
// and a section to pay with stripe.
export default function PaymentSection(props) {
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
    );
}