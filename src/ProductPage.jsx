import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const ProductPage = ({ setCartItems, products, setProducts }) => {
  const [count, setCount] = useState(0);



  return (
    <div className="bg-slate-300 w-full h-full  flex-col justify-items-center">
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} setCartItems={setCartItems} />
          </div>
        ))}
        <ProductCard
          isEditing={false}
          product={null}
          setProducts={setProducts}
        />
      </div>

    </div>
  );
};
