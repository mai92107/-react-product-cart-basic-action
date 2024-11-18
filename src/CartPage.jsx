import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const CartPage = ({ cartItems, setCartItems, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState();

  console.log("function");

  useEffect(() => {
    console.log("useEffect");
  },[]);

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    alert(`消費合計 ${totalAmount} 元，購買成功！！`);
    setCartItems([]);
    console.log(cartItems);
  };

  const totalAmount = cartItems.reduce(
    (total, { price, count }) => total + price * count,
    0
  );

  const CartItem = ({ item, index }) => {
    const { name, price, count } = item;

    const handleItemClick = () => {
      setIsModalOpen(true);

      setModalProduct(cartItems[index]);
    };

    return (
      <div
        onClick={() => handleItemClick(index)}
        className="flex text-xl text-center pb-4 w-auto cursor-pointer hover:bg-gray-100"
      >
        <p className="w-[180px]">{name}</p>
        <p className="w-[180px]">NT＄ {price}</p>
        <p className="w-[180px]">{count}</p>
        <p className="w-[180px]">NT＄ {count * price}</p>
        <p
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveItem(index);
          }}
          className="mx-auto hover:bg-[#aaaaaa22] rounded-3xl cursor-pointer w-[40px]"
        >
          X
        </p>
      </div>
    );
  };

  return (
    <div className="bg-slate-300 w-full h-[100vh] flex-wrap p-20">
      <div className="w-[800px]">
        <div className="flex bg-gray-400 text-2xl  text-center justify-around">
          {["商品名稱", "商品價格", "商品數量", "合計"].map((value, index) => (
            <p key={index} className="text-center w-[150px]">
              {value}
            </p>
          ))}
        </div>
        <div className="bg-[#ffffff99] shadow-lg py-5">
          {cartItems.map((item, index) => (
            <CartItem key={index} index={index} item={item} />
          ))}
          <div className="flex justify-self-end mt-4">
            <div className="items-center flex text-lg">
              總共合計 NT$ {totalAmount}
            </div>
            <button
              onClick={handleCheckout}
              className="hover:bg-slate-300 px-5 py-2 bg-slate-200 rounded-xl mx-5"
            >
              結帳去
            </button>
          </div>
        </div>
      </div>
      {console.log("rendering")}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="text-center mt-4">
            <ProductCard
              setIsModalOpen={setIsModalOpen}
              isEditing={true}
              product={modalProduct}
              setCartItems={setCartItems}
              setProducts={setProducts}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
