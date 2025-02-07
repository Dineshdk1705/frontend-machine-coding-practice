import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import styles from "../ProductCard/ProductCard.module.css";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { Icon } from "@mui/material";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const ProductCard = ({ product, inCart, inWishlist, ratingValue }) => {
  const { id, price, title, thumbnail, stock, brand } = product;
  const dispatch = useDispatch();
  return (
    <Card
      className={styles.container}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "none",
        border: "1px solid rgb(218, 218, 218)",
        borderRadius: 4,
      }}
    >
      <CardActionArea component={Link} to={`/products/${id}`}>
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          height="100"
          image={thumbnail}
          alt="product card"
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 18 }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#4a99e8",
              fontWeight: 1000,
              fontSize: 18,
            }}
          >
            ₹ {price}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" className={styles.rating}>
          <FaStar size={17} />
          <Typography
            className={styles.rating_text}
            sx={{ marginLeft: 0.5, fontSize: 14, fontWeight: 500 }}
          >
            {ratingValue.toFixed(1)}
          </Typography>
        </Typography>

        <Button
          variant="contained"
          color="info"
          size="small"
          sx={{
            borderRadius: 3,
            boxShadow: "none",
            backgroundColor: "#4a99e8",
          }}
          onClick={() => {
            dispatch(
              addToCart({
                id,
                price,
                title,
                thumbnail,
                brand,
                stock,
                quantity: 1,
              })
            );
            toast.success("Added to the Bag 🥳");
          }}
          disabled={inCart}
          endIcon={
            inCart ? <AddShoppingCartIcon /> : <ShoppingCartOutlinedIcon />
          }
        >
          {inCart ? "In Cart" : "Add to cart"}
        </Button>
      </CardActions>
      <div
        className={styles.favorite_icon_box}
        onClick={() =>
          inWishlist
            ? dispatch(removeFromWishlist(id))
            : dispatch(
                addToWishlist({
                  id,
                  price,
                  title,
                  thumbnail,
                  brand,
                  stock,
                  quantity: 1,
                })
              )
        }
      >
        {inWishlist ? (
          <Icon sx={{ color: "red" }}>
            <FavoriteIcon fontSize={"5px"} />
          </Icon>
        ) : (
          <FavoriteBorderOutlinedIcon fontSize={"5px"} />
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
