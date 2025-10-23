import React, { useContext } from 'react';
import "./Product.css";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

const Product = () => {
    const { all_products, cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    const { productId } = useParams();
    const navigate = useNavigate();
    const product = all_products.find((e) => e.id == productId);

    if (!product) {
        return <div className="text-center my-5"><h2>Loading product...</h2></div>;
    }


    const quantityInCart = cartItems[product.id] || 0;

    const handleAddToCart = () => {
      if(localStorage.getItem('auth-token')) {
        addToCart(product.id);
      } else {
        alert("Please log in to add items to your cart.");
        navigate('/login');
      }
    };

    return (
        <div className="product-display container my-4">
            <Breadcrumb product={product}/>
            <div className="row">
                <div className="col-md-6 product-display-left">
                    <img className="product-main-img" src={product.image} alt={product.name} />
                </div>
                <div className="col-md-6 product-display-right">
                    <h1>{product.name}</h1>
                    <div className="product-prices">
                        {product.old_price && (
                            <div className="product-price-old">₹{parseFloat(product.old_price).toFixed(2)}</div>
                        )}
                        <div className="product-price-new">₹{parseFloat(product.new_price).toFixed(2)}</div>
                    </div>
                    <div className="product-description">
                        {product.description}
                    </div>
                    <div className="d-flex align-items-center my-4">
                        {quantityInCart === 0 ? (
  
                            <button 
                                className="btn btn-primary btn-lg" 
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <div className="product-quantity-selector">
                                <button onClick={() => { removeFromCart(product.id) }}><Minus size={20} /></button>
                                <div className="quantity-display">{quantityInCart}</div>
                                <button onClick={() => { addToCart(product.id) }}><Plus size={20} /></button>
                            </div>
                        )}
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