import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import styles from "./Header.module.css";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { logout } from "../../redux/slices/authSlice";
import HomeIcon from "@mui/icons-material/Home";
import { setSelectedCategory } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";

const Header = () => {
  const cartList = useSelector((state) => state.cartItems.cartList);
  const wishlist = useSelector((state) => state.wishlistItems.wishlistList);
  const [loginVisible, setLoginVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target))
        setLoginVisible(false);
    };
    if (loginVisible)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginVisible]);

  return (
    <header className={styles.header_container}>
      <div className={styles.logo_box}>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlinedIcon /> : <ListOutlinedIcon />}
        </button>

        <Link to="/" className={styles.logo}>
          <img src="/logo.jpg" alt="eBazaar" className={styles.logo_img} />
        </Link>
      </div>

      <nav
        ref={navRef}
        className={`${styles.nav} ${menuOpen ? styles.open : ""}`}
      >
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
          to="/categories"
          onClick={() => setMenuOpen(false)}
        >
          Categories
        </Link>
        <Link
          className={styles.menuItem}
          to="/contact-us"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
      </nav>

      <div className={styles.header_icons}>
        <Link className={styles.home_link} to="/products">
          <div className={styles.icon_box}>
            <HomeIcon />
          </div>
        </Link>
        <Link to="/wishlist">
          <div className={styles.icon_box}>
            <FavoriteIcon />
            {wishlist?.length > 0 && (
              <span className={styles.indicator}>{wishlist?.length}</span>
            )}
          </div>
        </Link>
        <Link to="/cart">
          <div className={styles.icon_box}>
            <ShoppingCartIcon />
            {cartList?.length > 0 && (
              <span className={styles.indicator}>{cartList?.length}</span>
            )}
          </div>
        </Link>
        <Link className={styles.account_link}>
          {user ? (
            <IconButton
              ref={userRef}
              onMouseOver={() => setLoginVisible(true)}
              sx={{
                padding: 0,
                cursor: "default",
              }}
            >
              <Avatar
                sx={{ width: 28, height: 28, border: "1px solid white" }}
                alt="User Avatar"
                src={user?.photoURL || "/images/user.png"}
              />
              <Button
                sx={{
                  position: "absolute",
                  display: loginVisible ? "block" : "none",
                  bottom: -30,
                  color: "#fff",
                  backgroundColor: "#000",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 8px",
                  textTransform: "capitalize",
                  fontWeight: 400,
                  borderRadius: 0,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#222",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => {
                  dispatch(setSelectedCategory(""));
                  dispatch(logout());
                  setLoginVisible(false);
                  toast.success("Logout Successfully ✅");
                }}
              >
                Logout
              </Button>
            </IconButton>
          ) : (
            <IconButton onClick={() => navigate("/onboarding")}>
              <AccountCircleIcon />
              <Typography variant="body2">Login</Typography>
            </IconButton>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
