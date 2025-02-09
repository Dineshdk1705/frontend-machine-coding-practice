import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  fetchProductsByCategory,
  setSelectedCategory,
} from "../../redux/slices/productSlice";
import styles from "./Categories.module.css";
import { Typography } from "@mui/material";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, selectedCategory, loading } = useSelector(
    (state) => state.productItems
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchProductsByCategory(category?.slug));
    navigate("/products");
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          fontSize: {
            xs: 30,
            sm: 40,
            md: 50,
          },
          fontWeight: 1000,
          textAlign: "center",
        }}
        variant="h6"
      >
        Categories
      </Typography>
      <ul className={styles.categoryList}>
        {categories?.map((category) => (
          <li
            key={category?.slug}
            onClick={() => handleCategorySelect(category)}
            className={`${styles.categoryItem} ${
              selectedCategory?.slug === category?.slug ? styles.active : ""
            }`}
          >
            {category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
