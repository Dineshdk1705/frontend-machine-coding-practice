import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPage, setCurrentPage }) => {
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 0));
  };
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPage - 1 ? prev + 1 : totalPage - 1));
  };

  return (
    <div>
      <button disabled={currentPage === 0} onClick={handlePrev}>
        ⬅️
      </button>
      <span>
        {[
          ...Array(totalPage)
            .keys()
            .map((i) => (
              <span
                key={i}
                style={i === currentPage ? { backgroundColor: "#DBDBDB" } : {}}
                className={styles.page}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </span>
            )),
        ]}
      </span>
      <button disabled={currentPage === totalPage - 1} onClick={handleNext}>
        ➡️
      </button>
    </div>
  );
};

export default Pagination;
