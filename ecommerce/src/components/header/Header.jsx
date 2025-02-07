import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import styles from "./Header.module.css";

const Header = () => {
  const cartList = useSelector((state) => state.cartItems.cartList);
  const wishlist = useSelector((state) => state.wishlistItems.wishlistList);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header_container}>
      {/* Menu Button for Mobile */}
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <CloseOutlinedIcon /> : <ListOutlinedIcon />}
      </button>

      <Link to="/" className={styles.logo}>
        Logo
      </Link>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <Link
          className={styles.menuItem}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          className={styles.menuItem}
          to="/products"
          onClick={() => setMenuOpen(false)}
        >
          Products
        </Link>
        <Link
          className={styles.menuItem}
          to="/collections"
          onClick={() => setMenuOpen(false)}
        >
          Collections
        </Link>
        <Link
          className={styles.menuItem}
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
      </nav>

      {/* Header Icons */}
      <div className={styles.header_icons}>
        <Link className={styles.wishlist_link} to="/wishlist">
          <div className={styles.cart_icon_box}>
            <FavoriteIcon />
            {wishlist?.length > 0 && (
              <span className={styles.indicator}>{wishlist?.length}</span>
            )}
          </div>
        </Link>
        <Link className={styles.cart_link} to="/cart">
          <div className={styles.cart_icon_box}>
            <ShoppingCartIcon />
            {cartList?.length > 0 && (
              <span className={styles.indicator}>{cartList?.length}</span>
            )}
          </div>
        </Link>
        <Link className={styles.account_link}>
          <AccountCircleIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;
