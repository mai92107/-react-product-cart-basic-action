import React from "react";

export const NavBar = ({
  shiftPage,
  handleNavigateToProduct,
  handleNavigateToCart,
}) => {
  return (
    <div className="w-full h-[80px] bg-green-950 text-white text-3xl items-center flex px-10">
      <span
        onClick={() => {
          shiftPage == "cart"
            ? handleNavigateToProduct()
            : shiftPage == "product"
            ? handleNavigateToCart()
            : null;
        }}
        className="cursor-pointer px-5 hover:scale-125 transition-transform duration-200"
      >
        &lt;
      </span>
      <div>
        {shiftPage == "cart"
          ? "購物車"
          : shiftPage == "product"
          ? "商品列表"
          : ""}
      </div>
    </div>
  );
};
