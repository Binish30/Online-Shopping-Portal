// src/pages/ShopCategory/ShopCategory.jsx

import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Item from '../../components/Item/Item';
import './ShopCategory.css';

const ShopCategory = (props) => {
    const { all_products } = useContext(ShopContext);

    // This logic creates a new array containing only the products that should be displayed.
    const displayedProducts = all_products.filter(item => {
        if (props.subcategory) {
            // Filter by subcategory if the subcategory prop is present
            return item.subcategory === props.subcategory;
        } else if (props.category) {
            // Otherwise, filter by the main category
            return item.category === props.category;
        }
        return false; // Don't show anything if neither prop is provided
    });

    return (
        <div className="shop-category">
            {/* The Sorting Dropdown UI */}
            <div className="shopcategory-indexSort d-flex justify-content-between align-items-center mb-4">
                <p>
                    {/* Make the "Showing" count dynamic based on the filtered list */}
                    <span>Showing 1-{displayedProducts.length}</span> out of {all_products.length} total products
                </p>
                <div className="shopcategory-sort dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort by
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Latest</a></li>
                        <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
                        <li><a className="dropdown-item" href="#">Price: High to Low</a></li>
                    </ul>
                </div>
            </div>

            {/* The Grid of Products */}
            <div className="row">
                {displayedProducts.map((item, i) => {
                    return (
                        <Item 
                            key={i} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShopCategory;