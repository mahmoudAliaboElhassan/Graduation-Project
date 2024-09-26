import React from "react";

import { Outlet } from "react-router-dom";

import Header from "../../components/header";
import Footer from "../../components/footer";

function RootLayout() {
  return (
    <div>
      <Header />
      <div>{<Outlet />}</div>
      <Footer />
    </div>
  );
}

export default RootLayout;
