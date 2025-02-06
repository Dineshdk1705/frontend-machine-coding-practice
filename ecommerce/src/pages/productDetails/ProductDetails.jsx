import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../productDetails/ProductDetails.module.css";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, Rating } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { BiHome } from "react-icons/bi";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customQuantity, setCustomQuantity] = useState(1);
  const carts = useSelector((state) => state.cartItems.cartList);
  const dispatch = useDispatch();

  const cartIdInCart = useCallback(
    (id) => {
      return carts.some((c) => c.id === Number(id));
    },
    [carts]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const findIndexOfProduct = (id) => {
    return carts.findIndex((c) => c.id === id);
  };

  const incQuantity = (id) => {
    const productIndex = findIndexOfProduct(id);
    if (productIndex !== -1) {
      setCustomQuantity(carts[productIndex].quantity + 1);
      dispatch(increaseQuantity(id));
    }
  };

  const decQuantity = (id) => {
    const productIndex = findIndexOfProduct(id);
    if (productIndex !== -1) {
      setCustomQuantity(carts[productIndex].quantity - 1);
      dispatch(decreaseQuantity(id));
    }
  };

  useEffect(() => {
    const productIndex = findIndexOfProduct(Number(id));
    if (productIndex !== -1) {
      setCustomQuantity(carts[productIndex].quantity);
    }
  }, [carts, id, findIndexOfProduct]);

  return (
    <div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left_side}>
            <img
              src={product?.images[0]}
              alt="poster"
              className={styles.img_main}
            />
            <div className={styles.img_more}>
              {product?.images?.length > 1 &&
                product?.images?.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="poster1"
                    className={styles.img_inner}
                  />
                ))}
            </div>
          </div>
          <div className={styles.right_side}>
            <div className={styles.details}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "35px",
                  fontWeight: "bold",
                }}
              >
                {product?.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#8d8d8d",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "10px",
                }}
              >
                {product?.description}
              </Typography>
              <div className={styles.rating_box}>
                <Rating
                  name="half-rating-read"
                  defaultValue={product?.rating}
                  precision={0.5}
                  readOnly
                />
                <p className={styles.review}>({product?.reviews.length})</p>
              </div>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                $ {product?.price}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#8d8d8d", fontSize: "14px", fontWeight: 500 }}
              >
                {product?.warrantyInformation}
              </Typography>
            </div>
            <Divider variant="fullWidth" sx={{ margin: "20px 0" }} />
            <div>
              <Typography
                variant="h6"
                sx={{ fontSize: "16px", fontWeight: 500, marginBottom: "13px" }}
              >
                Quantity
              </Typography>
              <div className={styles.quantity_box}>
                <div className={styles.quantity}>
                  <IconButton
                    onClick={() =>
                      cartIdInCart(id) && customQuantity > 1
                        ? decQuantity(Number(id))
                        : setCustomQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography
                    variant="h6"
                    sx={{ color: "#4A99E8", fontWeight: "bold" }}
                  >
                    {product?.quantity || customQuantity}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      cartIdInCart(id) && product?.stock - customQuantity > 0
                        ? incQuantity(Number(id))
                        : product?.stock - customQuantity > 0 &&
                          setCustomQuantity((prev) => prev + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </div>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#8d8d8d" }}
                >
                  Only{" "}
                  <span style={{ color: "#4A99E8" }}>
                    {product?.stock - customQuantity} items
                  </span>{" "}
                  Left! Don't miss it
                </Typography>
              </div>
              <div className={styles.btn_box}>
                <button className={styles.buy_button}>Buy Now</button>
                <button
                  className={styles.cart_button}
                  style={{
                    borderColor: !cartIdInCart(Number(id))
                      ? "#4a99e8"
                      : "#FF4D58",
                    color: !cartIdInCart(Number(id)) ? "#4a99e8" : "#FF4D58",
                  }}
                  onClick={() =>
                    !cartIdInCart(Number(id))
                      ? dispatch(
                          addToCart({
                            id: product.id,
                            price: product.price,
                            title: product.title,
                            thumbnail: product.thumbnail,
                            brand: product.brand,
                            quantity: customQuantity,
                          })
                        )
                      : dispatch(removeFromCart(Number(id)))
                  }
                >
                  {!cartIdInCart(Number(id)) ? "Add To Cart" : "Remove Cart"}
                </button>
              </div>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#8d8d8d", marginBottom: "15px" }}
              >
                {product?.returnPolicy}
              </Typography>

              <div className={styles.delivery_box}>
                <BiHome size={25} color="#4a99e8" />
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Free delivery
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8d8d8d",
                      fontSize: "13px",
                      textDecoration: "underline",
                    }}
                  >
                    Enter your Postal Code fro Delivery Availability
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
