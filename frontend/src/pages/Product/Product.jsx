import React, { useContext } from "react";
import "./Product.css";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";

const Product = () => {
  const { all_products, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id == productId);

  if (!product) {
    return <div>Product Not Found!!</div>;
  }

  return (
    <div className="product-display">
      <Breadcrumb product={product} />
      <div className="row">
        <div className="col-md-6 product-display-left">
          <img
            className="product-main-img"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="col-md-4 product-display-right">
          <h1>{product.name}</h1>
          <div className="product-prices">
            <span className="item-price-new">
              ₹{parseFloat(product.new_price).toFixed(2)}
            </span>

            {product.old_price && (
              <span className="item-price-old">
                ₹{parseFloat(product.old_price).toFixed(2)}
              </span>
            )}
          </div>
          <div className="product-description">{product.description}</div>

          <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => {
              if (localStorage.getItem("auth-token")) {
                addToCart(product.id);
              } else {
                alert("Please log in to add items to your cart.");
                navigate("/login"); // You would need to import and initialize useNavigate here
              }
            }}
          >
            Add to Cart
          </button>
          <p className="product-category mt-3">
            <span>Category: </span>{" "}
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
