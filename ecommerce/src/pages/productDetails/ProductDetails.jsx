import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../productDetails/ProductDetails.module.css";
import Typography from "@mui/material/Typography";
import { CircularProgress, Divider, IconButton, Rating } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { BiHome } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setTotalAmount,
} from "../../redux/slices/cartSlice";
import { setCheckoutAllowed } from "../../redux/slices/checkoutSlice";
import ProductDetailsLoading from "../../components/custom/loadings/ProductDetailsLoading/ProductDetailsLoading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageNumber, setImageNumber] = useState(0);
  const [customQuantity, setCustomQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const carts = useSelector((state) => state.cartItems.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartIdInCart = useCallback(
    (id) => {
      return carts.some((c) => c.id === Number(id));
    },
    [carts]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
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
    getProductDetails();
  }, [id]);

  const findIndexOfProduct = useCallback(
    (id) => {
      return carts.findIndex((c) => c.id === id);
    },
    [carts]
  );

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

  const handleBuyNow = (productId, productPrice) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(setCheckoutAllowed(true));
      dispatch(setTotalAmount(productPrice * customQuantity));
      dispatch(removeFromCart(productId));
      navigate("/payment");
    }, 2000);
  };

  return (
    <div>
      {isLoading ? (
        <ProductDetailsLoading />
      ) : (
        <div className={styles.container}>
          <div className={styles.left_side}>
            <LazyLoadImage
              src={`${product?.images[imageNumber]}`}
              alt="poster"
              effect="black-and-white"
              loading="lazy"
              className={styles.img_main}
            />
            <div className={styles.img_more}>
              {product?.images?.length > 1 &&
                product?.images?.map((url, i) => (
                  <LazyLoadImage
                    key={i}
                    src={url}
                    alt="poster1"
                    effect="black-and-white"
                    loading="lazy"
                    className={styles.img_inner}
                    onClick={() => {
                      setImageNumber(i);
                    }}
                  />
                ))}
            </div>
          </div>
          <div className={styles.right_side}>
            <div className={styles.details}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    md: "20px",
                    lg: "35px",
                  },
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
                ₹{product?.price.toLocaleString("en-IN")}
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
                    sx={{ color: "#4a99e8", fontWeight: "bold" }}
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
                  <span style={{ color: "#4a99e8" }}>
                    {product?.stock - customQuantity < 0
                      ? "item"
                      : `${product?.stock - customQuantity} items `}
                  </span>{" "}
                  Left! Don't miss it
                </Typography>
              </div>
              <div className={styles.btn_box}>
                <button
                  className={styles.buy_button}
                  onClick={() => handleBuyNow(product?.id, product?.price)}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress
                      sx={{ padding: 0 }}
                      size={15}
                      color="inherit"
                    />
                  ) : (
                    "Buy Now"
                  )}
                </button>
                <button
                  className={styles.cart_button}
                  style={{
                    borderColor: !cartIdInCart(Number(id))
                      ? "#4a99e8"
                      : "#8d8d8d",
                    color: !cartIdInCart(Number(id)) ? "#4a99e8" : "#8d8d8d",
                  }}
                  onClick={() =>
                    !cartIdInCart(Number(id))
                      ? dispatch(
                          addToCart({
                            id: product?.id,
                            price: product?.price,
                            title: product?.title,
                            thumbnail: product?.thumbnail,
                            brand: product?.brand,
                            stock: product?.stock,
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
                    Enter your Postal Code for Delivery Availability
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
