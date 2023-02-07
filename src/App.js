import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import {ProductContext}  from "./contexts/ProductContext";
import {CartContext}  from "./contexts/CartContext";
// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(initialStateRead("cart"));

  function cartLocalStorageWrite(okuyomYaBen) {
    localStorage.setItem("cart", JSON.stringify(okuyomYaBen));
  };

  function cartLocalStorageRead(key) {
    return JSON.parse(localStorage.getItem(key));
  };

  function initialStateRead(key) {
    const initialCart = cartLocalStorageRead(key);
    if(initialCart) {
      return initialCart;
    }else {
      return [];
    }
  }


  const addItem = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    cartLocalStorageWrite(newCart);
  };

  const removeItem = (id) => {
    const newCart = [...cart.filter((r) => r.id !== id )];
    setCart(newCart);
    cartLocalStorageWrite(newCart);
  }

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart,removeItem }} >
          <Navigation /*cart={cart} */ />
          <main className="content">
            <Route exact path="/">
              <Products /> 
            </Route>

            <Route path="/cart">
              <ShoppingCart /*cart={cart}*/ />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
