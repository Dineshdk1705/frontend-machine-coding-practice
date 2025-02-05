import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const carts = useSelector((state) => state.cartItems.cartList);

  const cartDetailById = (id) => {
    return carts.find((c) => c.id === id);
  };

  const getProductDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log("error while fetching product detail:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div>
          <img src={product?.thumbnail} alt="poster" />
          <h2>{product?.title}</h2>
          <h1>${product?.price}</h1>
          <h3>{product?.description}</h3>
          <h2>{cartDetailById(product?.id)?.quantity}</h2>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
