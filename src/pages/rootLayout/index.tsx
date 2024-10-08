import React from "react";

import { Outlet } from "react-router-dom";

import Header from "../../components/header";
import Footer from "../../components/footer";

function RootLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      {<Outlet />}
      <Footer />
    </div>
  );
}

export default RootLayout;
