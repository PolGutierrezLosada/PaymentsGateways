import './ShoppingCart.css'

// calse that contains everything related with the cart button.
export default function CartButton() {
  return (
    <div className="cart-container">
        <button className="cart-button cart-icon-button">
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/shopping-cart-white-icon.png" alt="Carrito" className='cart-icon' />
        </button>
    </div>
  )
}