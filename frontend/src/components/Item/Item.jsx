import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className="carf h-100 item-card">
            <Link to={`/product/${props.id}`}>
                <img src={props.image} className="card-img-top" alt={props.name} />
            </Link>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{props.name}</h5>
                <div className="item-prices mt-auto">
                    <span className="item-price-new">${props.new_price.toFixed(2)}</span>
                    <span className="item-price-old">${props.old_price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Item;