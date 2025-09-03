import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Item from '../../components/Item/Item';
import './Home.css';

const Home = () => {
    const { all_products } = useContext(ShopContext);

    const newArrivals = all_products.filter(item => item.category === 'clothes').slice(-4).reverse();

    const topBooks = all_products.filter(item => item.category === 'books').slice(0, 4);

    const featuredMen = all_products.filter(item => item.subcategory === 'men').slice(0, 4);


    return (
        <div className="home-page">
            <div className="p-5 mb-5 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Welcome to SHOPPER</h1>
                    <p className="col-md-8 fs-4">Your one-stop shop for the latest trends in fashion, tech, and more.</p>
                </div>
            </div>

            <div className="product-section mb-5">
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {newArrivals.map((item, i) => (
                        <Item key={`new-${i}`} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))}
                </div>
            </div>

            <div className="product-section mb-5">
                <h2 className="mb-4">Top Picks in Books</h2>
                <div className="row">
                    {topBooks.map((item, i) => (
                        <Item key={`book-${i}`} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))}
                </div>
            </div>

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