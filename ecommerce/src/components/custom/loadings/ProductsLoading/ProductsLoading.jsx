import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductsLoading.module.css";

const ProductsLoading = () => {
  return (
    <div className={styles.productsGrid}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <Skeleton
            height={180}
            width="100%"
            className={styles.imageSkeleton}
          />
          <Skeleton height={20} width="90%" className={styles.titleSkeleton} />
          <Skeleton height={20} width="90%" className={styles.priceSkeleton} />
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;
