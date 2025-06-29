import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "./redux";
// import { getTotalQuantities } from "@state/slices/cart";

const UseDebounce = (timer: number) => {
  // const qunatityNumbers = useSelector(getTotalQuantities);
  const { totalPoints } = useAppSelector((state) => state.auth);
  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    if (!totalPoints) {
      return;
    }
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, timer);

    return () => {
      clearTimeout(debounce);
      console.log("return from effect");
    };
  }, [totalPoints]);
  return [isAnimate, setIsAnimate];
};
export default UseDebounce;
