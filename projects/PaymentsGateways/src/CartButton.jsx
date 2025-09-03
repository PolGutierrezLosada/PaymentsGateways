import './ShoppingCart.css'

// class that contains everything related with the cart button.
export default function CartButton(props) {
  return (
    <div className="cart-container">
        <button className="cart-button cart-icon-button">
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/shopping-cart-white-icon.png" alt="Carrito" className='cart-icon' /> 
            <span className="cart-count">{props.cartCount}</span>
        </button>
    </div>
  )
}