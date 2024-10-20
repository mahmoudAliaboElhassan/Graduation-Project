import React, { useEffect, useState } from "react";

function HomePage() {
  const hints = ["One", "Two", "Three"];
  const [number, setNumber] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1000);
  }, [number]);
  return (
    <div>
      <div> Home Page</div>
      {number}
      {hints.map((hint, idx) => (
        <div>{idx * 30 <= number ? hint : "hint myfriend"}</div>
      ))}
    </div>
  );
}

export default HomePage;
