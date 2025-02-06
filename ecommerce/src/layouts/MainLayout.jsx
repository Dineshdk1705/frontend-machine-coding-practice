import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "../layouts/MainLayout.module.css";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main
        style={{ minHeight: "95vh", textAlign: "center" }}
        className={styles.main_layout}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
