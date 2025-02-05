import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ height: "95vh", textAlign: "center" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
