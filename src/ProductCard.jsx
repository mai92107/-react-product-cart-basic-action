import React, { useEffect, useState } from "react";

export const ProductCard = ({
  isEditing,
  product,
  setProducts,
  setCartItems,
  setIsModalOpen,
}) => {
  const [oldProduct, setOldProduct] = useState({
    name: product?.name,
    price: product?.price,
    count: product?.count,
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });
  const [cartItem, setCartItem] = useState({
    name: product?.name,
    price: product?.price,
    count: 0,
  });

  const images = [
    "https://www.trustphoto.com.tw/wp-content/uploads/2018/07/0Y3A9266.jpg",
    "https://j68studio.com/wp-content/uploads/2022/02/210309_SHEN6929-683x1024.jpg",
    "https://www.taichungdesign.com/wp-content/uploads/2021/07/DSC_1582-1.jpg",
    "https://www.bv-video.com.tw/_i/assets/upload/album/dc1177c4f300402909c28b15d540b427.jpg",
    "https://www.lok.tw/wp-content/uploads/2020/02/6%E6%83%85%E5%A2%83.jpg",
  ];

  const [selectedImage] = useState(
    images[Math.floor(Math.random() * images.length)]
  );

  const handleInputChange = (e) => {
    const numValue = parseInt(e.target.value);
    if (!isNaN(numValue) && numValue >= 0) {
      isEditing
        ? setOldProduct((prev) => ({
            ...prev,
            count: numValue > 50 ? 50 : numValue, // 限制數量為 0 ~ 50
          }))
        : setCartItem((prev) => ({
            ...prev,
            count: numValue > 50 ? 50 : numValue, // 限制數量為 0 ~ 50
          }));
    }
  };

  const handleAddToProduct = () => {
    if (newProduct.name === "" || newProduct.price === "") {
      alert("商品新增欄位不得為空");
      return;
    }
    setProducts((prev) => [...prev, newProduct]);
    alert("成功加入商品");
    setNewProduct({
      name: "",
      price: "",
    });
  };

  const handleAddToCart = () => {
    if (!cartItem.name || !cartItem.count || !cartItem.price) {
      alert("商品數量不得為 0");
      return;
    }
    setCartItems((prev) => [...prev, cartItem]);
    alert("成功加入購物車");
    setCartItem({ name: product?.name, price: product?.price, count: 0 });
  };

  const handleUpdateProduct = () => {
    if (oldProduct.name === "" || oldProduct.price === "") {
      alert("商品修改欄位不得為空");
      return;
    }
    setCartItems((prev) => {
      return prev.map((prod) =>
        prod.name === oldProduct.name ? oldProduct : prod
      );
    });
    setProducts((prev) => {
      return prev.map((prod) =>
        prod.name === oldProduct.name ? oldProduct : prod
      );
    });
    alert("成功修改商品");
    setIsModalOpen(false);
  };


  return (
    <div className="w-[200px] h-[300px] rounded-2xl bg-white m-5 shadow-lg pb-3">
      <img
        className="object-cover w-full h-[150px] rounded-t-2xl"
        src={
          product
            ? selectedImage
            : "https://www.pcschool.tv/upload/teacher_photo/E034.jpg"
        }
        alt="商品圖片"
      />
      <div className="px-5 pt-1">
        {product ? (
          <h1 className="text-center font-bold text-gray-800 p-0">
            {product.name}
          </h1>
        ) : (
          <div>
            <input
              type="text"
              className="bg-white text-center font-bold text-gray-800 w-full p-0 border-black"
              value={newProduct.name}
              placeholder="請輸入商品名稱"
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
        )}

        {!isEditing && product ? (
          <h1 className="text-center font-bold text-gray-800 p-0">
            NT＄ {product.price}
          </h1>
        ) : (
          <div className="font-bold text-gray-800 flex justify-center mt-1">
            <span>NT$</span>
            <input
              type="number"
              className="bg-white border-black border-[1px] text-center p-0 w-[80px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="商品價格"
              value={isEditing ? oldProduct.price : newProduct.price}
              onChange={(e) =>
                isEditing
                  ? setOldProduct((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  : setNewProduct((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
              }
            />
          </div>
        )}
        {product && (
          <div className="flex h-18 mt-2 text-black">
            <input
              type="number"
              className=" bg-white border-black border-[2px] mx-1 w-[80px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={isEditing ? oldProduct.count : cartItem.count}
              onChange={handleInputChange}
              min="0"
            />
            <button
              onClick={() =>
                isEditing
                  ? setOldProduct((prev) => ({
                      ...prev,
                      count: prev.count < 50 ? prev.count + 1 : 50,
                    }))
                  : setCartItem((prev) => ({
                      ...prev,
                      count: prev.count < 50 ? prev.count + 1 : 50,
                    }))
              }
              className="border-black border-[1px] w-10 mx-1 rounded-lg hover:bg-gray-100"
            >
              +
            </button>
            <button
              onClick={() =>
                isEditing
                  ? setOldProduct((prev) => ({
                      ...prev,
                      count: prev.count > 0 ? prev.count - 1 : 0,
                    }))
                  : setCartItem((prev) => ({
                      ...prev,
                      count: prev.count > 0 ? prev.count - 1 : 0,
                    }))
              }
              className="border-black border-[1px] w-10 mx-1 rounded-lg hover:bg-gray-100"
            >
              -
            </button>
          </div>
        )}

        <div className="w-full mt-2">
          {isEditing ? (
            <button
              className="w-full bg-green-800 rounded-md text-white py-2 mt-2"
              onClick={handleUpdateProduct}
            >
              儲存商品
            </button>
          ) : product ? (
            <button
              className="w-full bg-green-800 rounded-md text-white py-2"
              onClick={handleAddToCart}
            >
              加入購物車
            </button>
          ) : (
            <button
              className="w-full bg-green-800 rounded-md text-white py-2 mt-8"
              onClick={handleAddToProduct}
            >
              新增商品
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
