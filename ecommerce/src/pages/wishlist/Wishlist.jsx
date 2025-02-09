import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../wishlist/Wishlist.module.css";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlistItems.wishlistList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.main_container}>
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
        Wishlist {wishlist?.length > 0 ? "" : "is Empty"}
      </Typography>
      {wishlist?.length > 0 ? (
        <ul className={styles.card_container}>
          {wishlist.map((w) => (
            <li className={styles.card}>
              <IconButton
                sx={{}}
                className={styles.remove_btn_container}
                onClick={() => dispatch(removeFromWishlist(w?.id))}
              >
                <HighlightOffIcon
                  sx={{
                    fontSize: "2rem",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <img
                src={w.thumbnail}
                alt="poster2"
                className={styles.thumbnail}
              />
              <div className={styles.details_box}>
                <div>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: "14px", // Extra small screens
                        sm: "16px", // Small screens
                        md: "18px", // Medium screens
                        lg: "20px", // Large screens
                        xl: "22px", // Extra large screens
                      },
                      fontWeight: 400,
                    }}
                  >
                    {w.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "18px", fontWeight: "bolder" }}
                  >
                    ₹{w.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#4a99e8", fontWeight: 500 }}
                  >
                    {w.stock} in stock
                  </Typography>
                </div>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    maxWidth: "6rem",
                    color: "#A6A6A6",
                    border: "1px solid #A6A6A6",
                  }}
                  onClick={() => navigate(`/products/${w.id}`)}
                >
                  See more
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyWishlistImage}>
          <img src="/images/empty-wishlist.webp" alt="empty-wishlist" />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
