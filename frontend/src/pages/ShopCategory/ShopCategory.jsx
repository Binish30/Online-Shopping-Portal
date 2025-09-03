import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Item from "../../components/Item/Item";
import "./ShopCategory.css";

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('latest');

  const sortedAndFilteredProducts = all_products
    .filter((item) => {
      if (props.subcategory) {
        return item.subcategory === props.subcategory;
      } else if (props.category) {
        return item.category === props.category;
      }
      return false;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'price_asc':
          return parseFloat(a.new_price) - parseFloat(b.new_price);
        case 'price_desc':
          return parseFloat(b.new_price) - parseFloat(a.new_price);
        case 'latest':
        default:
          return b.id - a.id;
      }
    });

  return (
    <div className="shop-category container my-4">
      <div className="shopcategory-indexSort d-flex justify-content-between align-items-center mb-4">
        <p>
          <span>Showing 1-{sortedAndFilteredProducts.length}</span> out of{" "}
          {sortedAndFilteredProducts.length} total products in this category
        </p>
        <div className="shopcategory-sort dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort by
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={() => setSortOrder('latest')}>
                Latest
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setSortOrder('price_asc')}>
                Price: Low to High
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setSortOrder('price_desc')}>
                Price: High to Low
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        {sortedAndFilteredProducts.map((item, i) => (
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
};

export default ShopCategory;