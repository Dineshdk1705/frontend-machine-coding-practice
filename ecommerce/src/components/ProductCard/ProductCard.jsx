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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import styles from "../ProductCard/ProductCard.module.css";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { Icon } from "@mui/material";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, inCart, inWishlist, ratingValue }) => {
  const { id, price, title, thumbnail, brand } = product;
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        position: "relative",
        width: 230,
        height: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "none",
        border: "1px solid #bababa",
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
              color: "#4A99E8",
              fontWeight: 1000,
              fontSize: 18,
            }}
          >
            ${price}
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
          onClick={() =>
            dispatch(
              addToCart({ id, price, title, thumbnail, brand, quantity: 1 })
            )
          }
          disabled={inCart}
          endIcon={<AddShoppingCartIcon />}
        >
          Add to cart
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
