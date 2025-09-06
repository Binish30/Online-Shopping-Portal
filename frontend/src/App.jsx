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
import Checkout from "./pages/Checkout/Checkout";
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mobile" element={<ShopCategory subcategory="mobile" />} />
          <Route path="/laptops" element={<ShopCategory subcategory="laptops" />} />
          <Route path="/washing_machine" element={<ShopCategory subcategory="washing_machine" />} />
          <Route path="/refrigerator" element={<ShopCategory subcategory="refrigerator" />} />
          <Route path="/books" element={<ShopCategory category="books" />} />
          <Route path="/toys" element={<ShopCategory category="toys" />} />
          <Route path="/home" element={<ShopCategory category="home" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/women" element={<ShopCategory subcategory="women" />} />
          <Route path="/men" element={<ShopCategory subcategory="men" />} />
          <Route path="/kids" element={<ShopCategory subcategory="kids" />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
