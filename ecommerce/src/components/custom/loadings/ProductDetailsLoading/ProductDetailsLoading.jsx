import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductDetailsLoading.module.css";

const ProductDetailsLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Skeleton className={styles.main_img} />
        <div className={styles.thumbnailContainer}>
          <Skeleton className={styles.thumbnail} />
          <Skeleton className={styles.thumbnail} />
          <Skeleton className={styles.thumbnail} />
          <Skeleton className={styles.thumbnail} />
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.price} />
        <Skeleton className={styles.stock} />
        <Skeleton className={styles.warranty} />
        <Skeleton className={styles.quantity} />
        <div className={styles.buttonContainer}>
          <Skeleton className={styles.button} />
          <Skeleton className={styles.button} />
        </div>
        <Skeleton className={styles.delivery} />
      </div>
    </div>
  );
};

export default ProductDetailsLoading;
