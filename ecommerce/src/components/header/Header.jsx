import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const cartList = useSelector((state) => state.cartItems.cartList);

  return (
    <header>
      <div className={styles.header_container}>
        <Link to="/">Logo</Link>
        <nav className={styles.menu}>
          <Link className="menu-item" to="/">
            Home
          </Link>
          <Link className="menu-item" to="/products">
            Products
          </Link>
          <Link className="menu-item" to="/cart">
            cart
            <span>{cartList?.length > 0 ? cartList?.length : ""}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
