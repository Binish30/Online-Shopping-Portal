import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, LogOut } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { getTotalCartItems, logout, all_products } = useContext(ShopContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 1) {
      const filteredSuggestions = all_products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/product/${suggestion.id}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleLogout = () => {
    logout();
    window.location.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Shopper Logo" style={{ height: "40px", marginRight: "10px" }} />
          <span style={{ fontWeight: "bold" }}>SHOPPER</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">Shop</NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown title="Electronics" id="electronics-nav-dropdown">
                <NavDropdown.Item as={Link} to="/mobile">Mobile Phones</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/laptops">Laptops</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/washing_machine">Washing Machines</NavDropdown.Item>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/books">Books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/toys">Toys</NavLink>
            </li>
            <NavDropdown title="Clothes" id="clothes-nav-dropdown">
              <NavDropdown.Item as={Link} to="/women">Women</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men">Men</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/kids">Kids</NavDropdown.Item>
            </NavDropdown>
          </ul>

          <div className="search-wrapper mx-auto">
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
              <button className="btn btn-outline-success" type="submit">
                <Search size={20} />
              </button>
            </form>
            {suggestions.length > 0 && (
              <ul className="list-group search-suggestions">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="list-group-item list-group-item-action"
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="d-flex align-items-center ms-lg-3">
            {localStorage.getItem("auth-token") ? (
              <NavDropdown title={`Hello, ${localStorage.getItem("username")}`} id="user-nav-dropdown">
                <NavDropdown.Item as={Link} to="/my-orders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className="btn btn-outline-primary me-2">
                <User size={20} className="me-1" /> Login
              </Link>
            )}

            <Link to="/cart" className="btn btn-outline-dark position-relative ms-3">
              <ShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {localStorage.getItem("auth-token") ? getTotalCartItems() : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;