import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ShopCategory from "./pages/ShopCategory/ShopCategory";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import SearchResults from "./pages/SearchResults/SearchResults";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/electronics" element={<ShopCategory category="electronics" />} />
          <Route path="/books" element={<ShopCategory category="books"/>} />
          <Route path="/home" element={<ShopCategory category="home"/>} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignUp/>} />
           <Route path="/women" element={<ShopCategory subcategory="women" />} />
    <Route path="/men" element={<ShopCategory subcategory="men" />} />
    <Route path="/kids" element={<ShopCategory subcategory="kids" />} />
    <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
