import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PaymentPage.module.css";
import {
  setCheckoutAllowed,
  setPaymentCompleted,
} from "../../../redux/slices/checkoutSlice";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const totalAmount = useSelector((state) => state.cartItems.cartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const upiName = "EBazaar Payment";
  const paymentLink = `upi://pay?pa=${process.env.REACT_APP_UPI_ID}&pn=${upiName}&am=${totalAmount}&cu=INR&tn=EBazaar%20Order`;

  useEffect(() => {
    dispatch(setCheckoutAllowed(true));

    return () => {
      dispatch(setCheckoutAllowed(false));
      dispatch(setPaymentCompleted(false));
    };
  }, [dispatch]);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(setPaymentCompleted(true));
      navigate("/thank-you");
    }, 3000);
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.heading}>
        <h2>Scan & Pay</h2>
        <p>
          Scan the QR code below or click the button to pay via PhonePe, GPay,
          etc.
        </p>
      </div>

      <div className={styles.pay_container}>
        <img
          src="/icons/phonepe.svg"
          alt="icon"
          height={"40px"}
          width={"150px"}
        />
        <img
          src="/icons/google-pay.svg"
          alt="icon"
          height={"40px"}
          width={"100px"}
        />
      </div>

      <div className={styles.qrContainer}>
        <QRCodeCanvas value={paymentLink} size={200} />
      </div>

      <div className={styles.amount_details}>
        <Typography sx={{ fontSize: 30, fontWeight: 900 }} variant="h6">
          ₹{totalAmount}
        </Typography>
      </div>

      <div>
        <Button
          className={styles.submitButton}
          variant="contained"
          color={loading ? "secondary" : "primary"}
          disabled={loading}
          sx={{
            backgroundColor: loading ? "#aaa" : "#4a99e8",
            "&:hover": { backgroundColor: loading ? "#aaa" : "#3a87d8" },
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "250px",
            padding: "10px",
          }}
          onClick={handlePayment}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Pay now"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
