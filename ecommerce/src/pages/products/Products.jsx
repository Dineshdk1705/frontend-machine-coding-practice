import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/custom/Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { IoSearch } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
// import { Pagination } from "@mui/material";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const itemsPerPage = 10;
  const totalPage = Math.ceil(filteredProducts?.length / itemsPerPage);
  const debounceSearch = useDebounce(searchText, 600);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productItems.productList);
  const carts = useSelector((state) => state.cartItems.cartList);
  const wishlists = useSelector((state) => state.wishlistItems.wishlistList);
  const isLoading = useSelector((state) => state.productItems.loading);

  const checkInCart = (id) => {
    return carts.find((c) => c.id === id);
  };

  const checkInWishlist = (id) => {
    return wishlists.find((w) => w.id === id);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filteredData = products?.filter((p) =>
      p?.title?.toLowerCase().includes(debounceSearch.trim().toLowerCase())
    );
    setFilteredProducts(filteredData);
    setCurrentPage(0);
  }, [debounceSearch, products]);

  return (
    <>
      <div className={styles.input_container}>
        <span className={styles.input_box}>
          <IoSearch style={{ marginRight: 5 }} color="#7d7d7def" />
          <input
            className={styles.input}
            value={searchText}
            placeholder="search product..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText.trim() && (
            <span className={styles.close} onClick={() => setSearchText("")}>
              <CloseIcon fontSize="20px" />
            </span>
          )}
        </span>
      </div>
      <Typography
        sx={{ fontSize: 50, fontWeight: 1000, textAlign: "left" }}
        variant="h6"
      >
        Our Products
      </Typography>
      {isLoading ? (
        <div>Loading.....</div>
      ) : filteredProducts?.length ? (
        <div>
          <ul className={styles.products_container}>
            {filteredProducts
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((product) => {
                return (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    inCart={checkInCart(product?.id)}
                    inWishlist={checkInWishlist(product?.id)}
                    ratingValue={product?.rating}
                  />
                );
              })}
          </ul>

          {/* <Pagination count={10} color="primary" /> */}

          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div>No products Available!</div>
      )}
    </>
  );
};

export default Products;
