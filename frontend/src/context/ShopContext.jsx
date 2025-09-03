import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

// This function creates a default empty cart.
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) { // A safe high number for product IDs
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    // State for all products, fetched from the API. Starts empty.
    const [all_products, setAllProducts] = useState([]);
    
    // State for cart items, loaded from localStorage or default.
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : getDefaultCart();
    });

    // EFFECT 1: Fetch all products from the backend when the app loads.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products/');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setAllProducts(data); // Populate state with live data
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []); // Empty array means this effect runs only once on mount.

    // EFFECT 2: Save the cart to localStorage whenever it changes.
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    // --- Cart Management Functions ---

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 0) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            }
            return prev;
        });
    };

    const deleteFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    // --- Calculation Functions ---

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Find the product info from the 'all_products' state
                let itemInfo = all_products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += parseFloat(itemInfo.new_price) * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // --- Auth Functions ---

    const logout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('username');
        // We no longer clear the cart on logout, per your request
    };

    // --- Context Value ---

    const contextValue = {
        all_products,
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        logout,
        getTotalCartItems,
        getTotalCartAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;