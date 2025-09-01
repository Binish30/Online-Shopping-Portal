// src/pages/Shop/Shop.jsx

import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Item from '../../components/Item/Item';

const Shop = () => {
    const { all_products } = useContext(ShopContext);

    return (
        <div className="shop-page container">
            <h1 className="my-4">All Products</h1>
            <div className="row">
                {all_products.map((item, i) => (
                    <Item 
                        key={i} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Shop;