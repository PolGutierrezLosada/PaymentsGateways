import './Product.css';

// this class is in charge of showing an individual product with all its properties.
export default function Product(props) {
  return (
    <div className="product-card" onClick={() => props.onClick(props.product)}>
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
