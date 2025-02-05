import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../../components/custom/CartCard/CartCard";

const Cart = () => {
  const checkInCart = (id) => {
    return carts.find((c) => c.id === id);
  };
  const carts = useSelector((state) => state.cartItems.cartList);
  return (
    <div>
      {carts?.map((c) => {
        return (
          <CartCard
            key={c.id}
            id={c.id}
            title={c.title}
            thumbnail={c.thumbnail}
            price={c.price}
            quantity={c.quantity}
            inCart={() => checkInCart(c.id)}
          />
        );
      })}
    </div>
  );
};

export default Cart;
