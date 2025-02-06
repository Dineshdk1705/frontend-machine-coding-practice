import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const cartList = useSelector((state) => state.cartItems.cartList);
  const wishlist = useSelector((state) => state.wishlistItems.wishlistList);

  return (
    <header className={styles.header_container}>
      <Link to="/" className={styles.menu}>
        Logo
      </Link>
      <nav className={styles.menu}>
        <Link className={styles.menu} to="/">
          Home
        </Link>
        <Link className={styles.menu} to="/products">
          Products
        </Link>
        <Link className={styles.menu}>Collections</Link>
        <Link className={styles.menu}>Contact Us</Link>
      </nav>

      <div className={styles.header_icons}>
        <div className={styles.cart_icon_box}>
          <FavoriteIcon />
          {wishlist?.length > 0 && (
            <span className={styles.indicator}>{wishlist?.length}</span>
          )}
        </div>
        <Link className={styles.menu} to="/cart">
          <div className={styles.cart_icon_box}>
            <ShoppingCartIcon />
            {cartList?.length > 0 && (
              <span className={styles.indicator}>{cartList?.length}</span>
            )}
          </div>
        </Link>
        <AccountCircleIcon />
      </div>
    </header>
  );
};

export default Header;
