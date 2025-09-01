import React from 'react';
import { Link } from "react-router-dom";
import {ChevronRight} from "lucide-react";
import "./Breadcrumb.css";

const Breadcrumb = (props) => {
  const { product } = props;

  if (!product) {
    return null;
  }
  return (
    <nav aria-label="breadcrumb" className="breadcrum-nav">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to ="/">Home</Link></li>
        <ChevronRight size={16} />
        <li className="breadcrumb-item"><Link to ="/">Shop</Link></li>
        <ChevronRight size={16} />
        <li className="breadcrumb-item"><Link to ={`/${product.category}`}>{product.category.charAt(0).toUpperCase()}+product.category.slice(1)</Link></li>
        <ChevronRight size={16} />
        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;