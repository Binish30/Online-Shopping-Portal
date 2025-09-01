import React, { useContext } from 'react';
import "./Product.css";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';

const Product = () => {

  const { all_products, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id == productId);

  if(!product) {
    return<div>Product Not Found!!</div>
  }

  return (
    <div className="product-display">
      <Breadcrumb product={product}/>
      <div className="row">
        <div className="col-md-6 product-display-left">
          <img className="product-main-img" src={product.image} alt={product.name} />
        </div>
        <div className="col-md-4 product-display-right">
          <h1>{product.name}</h1>
          <div className="product-prices">
            <div className="product-price-old">${product.old_price.toFixed(2)}</div>
            <div className="product-price-new">${product.new_price.toFixed(2)}</div>
          </div>
          <div className="product-description">
                        A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment. We'll add a real product description here later.
          </div>

          <button className="btn btn-primary btn-lg mt-4" onClick={() => {addToCart(product.id)}}>Add to Cart</button>
          <p className="product-category mt-3">
            <span>Category: </span> {product.category.charAt(0).toUpperCase()+product.category.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;