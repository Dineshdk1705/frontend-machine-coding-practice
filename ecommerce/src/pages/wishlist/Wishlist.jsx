import { Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styles from "../wishlist/Wishlist.module.css";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlistItems.wishlistList);
  return (
    <div className={styles.main_container}>
      <Typography
        sx={{ fontSize: 50, fontWeight: 1000, textAlign: "center" }}
        variant="h6"
      >
        Wishlist
      </Typography>

      <ul className={styles.card_container}>
        {wishlist?.length > 0
          ? wishlist.map((w) => (
              <li className={styles.card}>
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

                  <Link to={`/products/${w.id}`}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        maxWidth: "6rem",
                        color: "#A6A6A6",
                        border: "1px solid #A6A6A6",
                      }}
                      // onClick={() => navigate(`/products/${w.id}`)}
                    >
                      See more
                    </Button>
                  </Link>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Wishlist;
