import './Product.css';

// esta clase se encarga de mostrar un producto individual con todas sus propiedades.
export default function Product(props) {
  return (
    <div className="product-card">
      <img
        src={props.product.productUrl}
        alt={props.product.productName}
        className="product-image"
      />
      <h2 className="product-title">
        {props.product.productName} - {props.product.productPrice}
      </h2>
    </div>
  );
}

/*
- imagen
- precio
- nombre
*/
