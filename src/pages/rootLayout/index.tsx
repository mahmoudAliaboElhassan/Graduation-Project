import React from "react";

import { Outlet } from "react-router-dom";

import Header from "../../components/header";
import { useAppSelector } from "../../hooks/redux";

function RootLayout() {
  const { mymode } = useAppSelector((state) => state.mode);
  return (
    <div
      style={{
        color: mymode === "dark" ? "white" : "black",
        backgroundColor: mymode === "dark" ? "black" : "white",
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout;
