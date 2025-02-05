import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../redux/slices/cartSlice";

const CartCard = ({ id, thumbnail, title, price, quantity, inCart }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ border: "1px solid black" }}>
      <h3>{title}</h3>
      <h3>${price * quantity}</h3>

      <button onClick={() => dispatch(decreaseQuantity(id))}>➖</button>
      <h4>{quantity}</h4>
      <button onClick={() => dispatch(increaseQuantity(id))}>➕</button>
      <h4>
        <button onClick={() => dispatch(removeFromCart(id))}>
          Remove Cart
        </button>
      </h4>
    </div>
  );
};

export default CartCard;
