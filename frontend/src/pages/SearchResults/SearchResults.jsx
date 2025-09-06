import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import Item from "../../components/Item/Item";

const SearchResult = () => {
  const { all_products } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const filteredProducts = all_products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="search-results container">
      <h1 className="my-4">
        Search Result for: <span className="text-primary">"{query}"</span>
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="row">
          <p>{filteredProducts.length} item found.</p>
          {filteredProducts.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center my-5">
          <h2>No products found.</h2>
          <p>Please try different keyword.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
