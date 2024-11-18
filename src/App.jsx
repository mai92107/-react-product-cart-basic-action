import React, { useEffect, useState } from "react";
import { NavBar } from "./navBar";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";

const App = () => {
  const productData = [
    {
      name: "沐浴乳",
      price: 500,
    },
    {
      name: "洗髮乳",
      price: 400,
    },
    {
      name: "護膚乳",
      price: 600,
    },
    {
      name: "護手霜",
      price: 400,
    },
    {
      name: "精華液",
      price: 1600,
    },
  ];
  const data = [
    {
      name: "沐浴乳",
      price: 500,
      count: 5,
    },
    {
      name: "洗髮乳",
      price: 400,
      count: 3,
    },
    {
      name: "護膚乳",
      price: 600,
      count: 2,
    },
  ];
  const [products, setProducts] = useState(productData);
  const [cartItems, setCartItems] = useState(data);
  const [shiftPage, setShiftPage] = useState("product");
  const handleNavigateToProduct = () => {
    setShiftPage("product");
  };
  const handleNavigateToCart = () => {
    setShiftPage("cart");
  };

  return (
    <div className="bg-gray-200 h-[100vh] text-black">
      <NavBar
        shiftPage={shiftPage}
        handleNavigateToProduct={handleNavigateToProduct}
        handleNavigateToCart={handleNavigateToCart}
      />
      {shiftPage == "product" && (
        <ProductPage
          setCartItems={setCartItems}
          products={products}
          setProducts={setProducts}
        />
      )}
      {shiftPage == "cart" && (
        <CartPage cartItems={cartItems} setCartItems={setCartItems} setProducts={setProducts} />
      )}
    </div>
  );
};

export default App;
