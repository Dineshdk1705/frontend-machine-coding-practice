import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../redux/slices/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

const CartCard = ({ id, thumbnail, title, price, quantity, stock }) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        p: 2,
        mb: 2,
      }}
    >
      <CardMedia
        component="img"
        image={thumbnail}
        alt={title}
        sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }}
      />

      <CardContent sx={{ flex: "1" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{price}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            quantity > 1
              ? dispatch(decreaseQuantity(id))
              : dispatch(removeFromCart(id))
          }
        >
          <RemoveIcon />
        </Button>
        <Typography sx={{ mx: 2 }}>{quantity}</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => stock > quantity && dispatch(increaseQuantity(id))}
        >
          <AddIcon />
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h6">₹{(price * quantity).toFixed(2)}</Typography>
        <IconButton
          color="error"
          onClick={() => {
            dispatch(removeFromCart(id));
            toast.success("Removed from Bag 😔");
          }}
        >
          <MdDeleteOutline size={24} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CartCard;
