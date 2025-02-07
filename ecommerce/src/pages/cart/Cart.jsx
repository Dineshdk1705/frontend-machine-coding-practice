import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";
import CartCard from "../../components/custom/CartCard/CartCard";
import { Typography } from "@mui/material";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const cart = useSelector((state) => state.cartItems.cartList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal * (1 - discount);

  return (
    <div className={styles.container}>
      <Typography
        sx={{ fontSize: 50, fontWeight: 1000, textAlign: "center" }}
        variant="h6"
      >
        Cart
      </Typography>
      <div className={styles.cartWrapper}>
        <div className={cart.length > 0 ? styles.cartItems : styles.emptyCart}>
          <Typography variant="body2">
            {cart.length > 0 && `Total ${cart.length} products`}
          </Typography>
          {cart.length > 0 ? (
            <ul className={styles.cartList}>
              {cart.map((c) => (
                <CartCard
                  key={c?.id}
                  id={c?.id}
                  thumbnail={c?.thumbnail}
                  title={c?.title}
                  price={c?.price}
                  quantity={c.quantity}
                  stock={c?.stock}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.emptyCartImage}>
              <img src="/empty-cart.png" alt="empty-cart" />
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Promo Code</h2>
            <div className={styles.promoCodeContainer}>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promoInput}
                placeholder="Type here..."
              />
              <button
                onClick={handleApplyPromoCode}
                className={styles.applyButton}
              >
                Apply
              </button>
            </div>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Discount</span>
                <span>-₹{(subtotal * discount).toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutButton}>
                Continue to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
