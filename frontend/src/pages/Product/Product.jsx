import React, { useContext, useState } from "react";
import "./Product.css";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { Plus, Minus  } from "lucide-react";

const Product = () => {
  const { all_products, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id == productId);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product Not Found!!</div>;
  }

  const handleIncrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };


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
              ${parseFloat(product.new_price).toFixed(2)}
            </span>

            {product.old_price && (
              <span className="item-price-old">
                ${parseFloat(product.old_price).toFixed(2)}
              </span>
            )}
          </div>
          <div className="product-description">{product.description}</div>

          {/* --- 5. NEW QUANTITY SELECTOR UI --- */}
                    <div className="d-flex align-items-center my-4">
                        <div className="product-quantity-selector">
                            <button onClick={handleDecrement}><Minus size={20} /></button>
                            <div className="quantity-display">{quantity}</div>
                            <button onClick={handleIncrement}><Plus size={20} /></button>
                        </div>
                        
                        {/* 6. MODIFIED "Add to Cart" BUTTON */}
                        <button 
                            className="btn btn-primary btn-lg ms-3" 
                            onClick={() => {
                                addToCart(product.id, quantity);
                                alert(`${quantity} item(s) added to cart!`); // Optional: give user feedback
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>

                    <p className="product-category mt-3">
                        <span>Category: </span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Product;
