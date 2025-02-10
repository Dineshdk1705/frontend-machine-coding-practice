import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCheckoutAllowed,
  setPaymentCompleted,
} from "../../../redux/slices/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { clearAllCart } from "../../../redux/slices/cartSlice";
import styles from "./ThankyouPage.module.css";
import { FaCheckCircle } from "react-icons/fa";

const ThankYouPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    dispatch(setCheckoutAllowed(false));
    dispatch(setPaymentCompleted(false));
    dispatch(clearAllCart());
  }, [dispatch]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      navigate("/products");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [navigate]);

  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.successIcon} />
      <h1 className={styles.heading}>Thank You!</h1>
      <p className={styles.message}>Your payment was successful.</p>
      <p className={styles.redirectMessage}>Redirecting to Products Page...</p>
    </div>
  );
};

export default ThankYouPage;
