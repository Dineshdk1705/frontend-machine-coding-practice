import React from "react";
import styles from "./Pagination.module.css";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

const Pagination = ({ currentPage, totalPage, setCurrentPage }) => {
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 0));
  };
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPage - 1 ? prev + 1 : totalPage - 1));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.pagination_btn}
        disabled={currentPage === 0}
        onClick={handlePrev}
      >
        <IoCaretBackSharp size={30} />
      </button>
      <span>
        <span className={styles.page}>
          {currentPage + 1} / {totalPage}
        </span>
        {/* {[
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
        ]} */}
      </span>
      <button
        className={styles.pagination_btn}
        disabled={currentPage === totalPage - 1}
        onClick={handleNext}
      >
        <IoCaretForwardSharp size={30} />
      </button>
    </div>
  );
};

export default Pagination;
