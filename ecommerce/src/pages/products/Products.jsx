import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
  setSelectedCategory,
} from "../../redux/slices/productSlice";
import { IoSearch } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [paginationSize, setPaginationSize] = useState("medium");
  const itemsPerPage = 12;
  const debounceSearch = useDebounce(searchText, 600);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dispatch = useDispatch();
  const { productList, selectedCategory, loading } = useSelector(
    (state) => state.productItems
  );
  const carts = useSelector((state) => state.cartItems.cartList);
  const wishlists = useSelector((state) => state.wishlistItems.wishlistList);

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
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory?.slug));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    if (debounceSearch) dispatch(fetchProducts(debounceSearch));
    if (!debounceSearch && !selectedCategory) dispatch(fetchProducts());
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [debounceSearch, dispatch, selectedCategory]);

  const handleChange = (e, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.heading_container}>
        <div>
          <Typography
            sx={{
              fontSize: {
                xs: 30,
                sm: 40,
                md: selectedCategory ? 40 : 50,
              },
              margin: {
                xs: "0.3rem 0",
                // sm: 40,
                md: 0,
              },
              fontWeight: 1000,
              textAlign: "left",
            }}
            variant="h6"
          >
            {selectedCategory ? `"${selectedCategory?.name}"` : "All Products"}
          </Typography>
          {selectedCategory && (
            <Button
              className={styles.showAll_btn}
              variant="contained"
              color="success"
              size="small"
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                fontSize: "11px",
                textTransform: "capitalize",
                backgroundColor: "#363636",
                marginBottom: {
                  xs: 1,
                  sm: 1,
                  // md: 0,
                },
              }}
              onClick={() => {
                dispatch(setSelectedCategory(""));
                dispatch(fetchProducts());
              }}
            >
              Show All products
            </Button>
          )}
        </div>
        <span className={styles.input_box}>
          <IoSearch style={{ marginRight: 5 }} color="#7d7d7def" />
          <input
            className={styles.input}
            value={searchText}
            placeholder="search product..."
            onChange={(e) => {
              setSearchText(e.target.value);
              dispatch(setSelectedCategory(""));
            }}
          />
          {searchText.trim() && (
            <span
              className={styles.close}
              onClick={() => {
                setSearchText("");
                dispatch(fetchProducts());
              }}
            >
              <CloseIcon fontSize="20px" />
            </span>
          )}
        </span>
      </div>
      {loading ? (
        <div>Loading.....</div>
      ) : productList?.length ? (
        <div>
          <ul className={styles.products_container}>
            {productList?.slice(startIndex, endIndex)?.map((product) => {
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
              count={Math.ceil(productList?.length / itemsPerPage)}
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
