import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

const ProductCard = ({ product, inCart }) => {
  const { id, price, title, thumbnail, brand } = product;
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <Link to={`/products/${id}`} className={styles.product}>
        <img className={styles.img} src={thumbnail} alt="poster" />
        <h3>${price}</h3>
        <h4>{title}</h4>
      </Link>
      {inCart ? (
        <button
          className={styles.cart_btn}
          onClick={() => dispatch(removeFromCart(id))}
        >
          Remove Cart
        </button>
      ) : (
        <button
          className={styles.cart_btn}
          onClick={() =>
            dispatch(
              addToCart({ id, price, title, thumbnail, brand, quantity: 1 })
            )
          }
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
