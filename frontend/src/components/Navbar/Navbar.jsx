// import React, { useContext, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import { ShopContext } from "../../context/ShopContext";
// import { ShoppingCart, User, Search, LogOut } from "lucide-react";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import logo from "../../assets/logo.png";

// const Navbar = () => {
//   const { getTotalCartItems, logout } = useContext(ShopContext);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search?q=${searchTerm}`);
//       setSearchTerm("");
//     }
//   };

//   const handleLogout = () => {
//         logout(); // Call the logout function from context
//         navigate('/login'); // Redirect to login page
//     }

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//          <img src={logo} alt="" />
//           SHOPPER
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//             <NavLink className="nav-link" to="/shop">Shop</NavLink>
//         </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/electronics">
//                 Electronics
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/books">
//                 Books
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/home">
//                 Home & Kitchen
//               </NavLink>
//             </li>

//             <NavDropdown title="Clothes" id="basic-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/women">
//                 Women
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/men">
//                 Men
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/kids">
//                 Kids
//               </NavDropdown.Item>
//             </NavDropdown>
//           </ul>

//           <form
//             className="d-flex mx-auto"
//             role="search"
//             onSubmit={handleSearch}
//           >
//             <input
//               className="form-control me-2"
//               type="search"
//               placeholder="Search Products...."
//               aria-label="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="btn btn-outline-success" type="submit">
//               <Search size={20} />
//             </button>
//           </form>

//           <div className="d-flex align-items-center">
//             <Link to="/login" className="btn btn-outline-primary me-2">
//               Login
//             </Link>
//             <div className="d-flex align-items-center ms-lg-3">
//                     {/* 3. THIS IS THE CORE LOGIC: CONDITIONAL RENDERING */}
//                     {localStorage.getItem('auth-token')
//                         ? (
//                             // IF a token exists, show Logout and Profile buttons
//                             <>
//                                 <button onClick={handleLogout} className="btn btn-outline-danger me-2">
//                                     <LogOut size={20} className="me-1" /> Logout
//                                 </button>
//                                 {/* We can add a profile link here later */}
//                                 {/* <Link to="/profile" className="btn btn-outline-secondary">
//                                     <User size={20} />
//                                 </Link> */}
//                             </>
//                         )
//                         : (
//                             // ELSE (no token), show the Login button
//                             <Link to="/login" className="btn btn-outline-primary me-2">
//                                 <User size={20} className="me-1" /> Login
//                             </Link>
//                         )
//                     }

//             <Link to="/cart" className="btn btn-outline-dark position-relative">
//               Cart
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                 {getTotalCartItems()}
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// src/components/Navbar/Navbar.jsx

import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, LogOut } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png"; // Assuming you have a logo.png in src/assets
import "./Navbar.css";

const Navbar = () => {
  const { getTotalCartItems, logout } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    logout(); // This removes the token from localStorage
    window.location.replace("/login"); // Force a reload to update the navbar
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Shopper Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span style={{ fontWeight: "bold" }}>SHOPPER</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/electronics">
                Electronics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home & Kitchen
              </NavLink>
            </li>
            <NavDropdown title="Clothes" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/women">
                Women
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men">
                Men
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/kids">
                Kids
              </NavDropdown.Item>
            </NavDropdown>
          </ul>

          <form
            className="d-flex mx-auto"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              <Search size={20} />
            </button>
          </form>

          <div className="d-flex align-items-center ms-lg-3">
            {/* SINGLE CONDITIONAL LOGIN/LOGOUT BUTTON */}
            {localStorage.getItem("auth-token") ? (
              // If logged in, show a welcome message and a compact logout button
              <div className="d-flex align-items-center">
                <span className="navbar-text me-3">
                  Hello, {localStorage.getItem("username")}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              // If logged out, show the login button
              <Link to="/login" className="btn btn-outline-primary me-2">
                <User size={20} className="me-1" /> Login
              </Link>
            )}

            <Link to="/cart" className="btn btn-outline-dark position-relative">
              <ShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartItems()}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
