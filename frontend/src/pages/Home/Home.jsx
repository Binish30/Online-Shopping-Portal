// src/pages/Home/Home.jsx

import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Item from '../../components/Item/Item';
import './Home.css'; // Make sure you renamed the CSS file too

const Home = () => {
    const { all_products } = useContext(ShopContext);

    // Create a section for "New Arrivals" - let's pretend the last 8 added are new
    //const newArrivals = all_products.slice(-8).reverse();

    // Create a section for "Popular in Electronics"
    //const popularElectronics = all_products.filter(item => item.category === 'electronics').slice(0, 4);
    // --- You can define any sections you want here! ---

    // Section 1: New Arrivals (showing the last 4 clothing items added)
    const newArrivals = all_products.filter(item => item.category === 'clothes').slice(-4).reverse();

    // Section 2: Top Picks in Books (showing the first 4 books)
    const topBooks = all_products.filter(item => item.category === 'books').slice(0, 4);

    // Section 3: Featured Men's Collection (showing the first 4 men's items)
    const featuredMen = all_products.filter(item => item.subcategory === 'men').slice(0, 4);


    return (
        <div className="home-page">
            {/* Hero Banner */}
            <div className="p-5 mb-5 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Welcome to SHOPPER</h1>
                    <p className="col-md-8 fs-4">Your one-stop shop for the latest trends in fashion, tech, and more.</p>
                </div>
            </div>

            {/* --- Render your new sections --- */}

            {/* New Arrivals Section */}
            <div className="product-section mb-5">
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {newArrivals.map((item, i) => (
                        <Item key={`new-${i}`} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))}
                </div>
            </div>

            {/* Top Picks in Books Section */}
            <div className="product-section mb-5">
                <h2 className="mb-4">Top Picks in Books</h2>
                <div className="row">
                    {topBooks.map((item, i) => (
                        <Item key={`book-${i}`} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))}
                </div>
            </div>
            
            {/* Featured Men's Collection Section */}
            <div className="product-section">
                <h2 className="mb-4">Featured Men's Collection</h2>
                <div className="row">
                    {featuredMen.map((item, i) => (
                        <Item key={`men-${i}`} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;