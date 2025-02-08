import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { IoSearch } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginationSize, setPaginationSize] = useState("medium");
  const itemsPerPage = 12;
  const debounceSearch = useDebounce(searchText, 600);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productItems.productList);
  const carts = useSelector((state) => state.cartItems.cartList);
  const wishlists = useSelector((state) => state.wishlistItems.wishlistList);
  const isLoading = useSelector((state) => state.productItems.loading);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");
  useEffect(() => {
    if (isSmallScreen) {
      setPaginationSize("small");
    } else if (isMediumScreen) {
      setPaginationSize("medium");
    } else {
      setPaginationSize("large");
    }
  }, [isSmallScreen, isMediumScreen]);

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
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [debounceSearch, products]);

  const handleChange = (e, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.heading_container}>
        <Typography
          sx={{
            fontSize: {
              xs: 30,
              sm: 40,
              md: 50,
            },
            fontWeight: 1000,
            textAlign: "left",
          }}
          variant="h6"
        >
          Products
        </Typography>
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
      {isLoading ? (
        <div>Loading.....</div>
      ) : filteredProducts?.length ? (
        <div>
          <ul className={styles.products_container}>
            {filteredProducts?.slice(startIndex, endIndex)?.map((product) => {
              return (
                <ProductCard
                  key={product?.id}
                  product={product}
                  inCart={checkInCart(product?.id)}
                  inWishlist={checkInWishlist(product?.id)}
                  ratingValue={product?.rating}
                  discountPercentage={product?.discountPercentage}
                />
              );
            })}
          </ul>
          <div className={styles.pagination_container}>
            <Pagination
              count={Math.ceil(filteredProducts?.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChange}
              color="primary"
              size={paginationSize}
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#ff6338",
                  color: "#fff",
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div>No products Available!</div>
      )}
    </>
  );
};

export default Products;
