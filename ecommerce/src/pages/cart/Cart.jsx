import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import CartCard from "../../components/custom/CartCard/CartCard";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setTotalAmount } from "../../redux/slices/cartSlice";
import { setCheckoutAllowed } from "../../redux/slices/checkoutSlice";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cartItems.cartList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal * (1 - discount);

  useEffect(() => {
    dispatch(setTotalAmount(total.toFixed(2)));
  }, [total, dispatch]);

  const handleApplyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(setCheckoutAllowed(true));
      navigate("/payment");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          fontSize: {
            xs: 30,
            sm: 40,
            md: 50,
          },
          fontWeight: 1000,
          textAlign: "center",
        }}
        variant="h6"
      >
        Cart {cart.length > 0 ? "" : "is Empty"}
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
              <img src="/images/empty-cart.webp" alt="empty-cart" />
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
              <div className={styles.applyButton}>
                <Button
                  className={styles.applyButton}
                  onClick={handleApplyPromoCode}
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "5px",
                    boxShadow: "none",
                    textTransform: "capitalize",
                    fontWeight: 400,
                    borderRadius: 0,
                  }}
                >
                  Apply
                </Button>
              </div>
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
              <div className={styles.checkoutButton}>
                <Button
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                  variant="contained"
                  color={loading ? "secondary" : "primary"}
                  disabled={loading}
                  sx={{
                    backgroundColor: loading ? "#aaa" : "#000",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "5px",
                    boxShadow: "none",
                    textTransform: "capitalize",
                    fontWeight: 400,
                    borderRadius: 0,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Continue to checkout"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
