// src/pages/Product/Product.jsx

import React, { useContext, useState } from 'react'; // 1. Ensure useState is imported
import "./Product.css";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react'; // Ensure icons are imported

const Product = () => {
    const { all_products, addToCart } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_products.find((e) => e.id == productId);

    // 2. THIS IS THE MISSING STATE for managing the quantity
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div className="text-center my-5"><h2>Loading product...</h2></div>;
    }

    // 3. THESE ARE THE MISSING FUNCTIONS
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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

                    {/* This UI is correct, but needs the functions above to work */}
                    <div className="d-flex align-items-center my-4">
                        <div className="product-quantity-selector">
                            <button onClick={handleDecrement}><Minus size={20} /></button>
                            <div className="quantity-display">{quantity}</div>
                            <button onClick={handleIncrement}><Plus size={20} /></button>
                        </div>
                        
                        <button 
                            className="btn btn-primary btn-lg ms-3" 
                            onClick={() => {
                                addToCart(product.id, quantity);
                                alert(`${quantity} item(s) added to cart!`);
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