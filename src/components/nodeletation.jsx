// الطريقة الأولى: Event على كل عنصر
import React from "react";

const WithoutDelegation = () => {
  const handleClick = (item) => {
    console.log("كلكيت على:", item);
  };

  const items = ["تفاحة", "موزة", "عنب"];

  return (
    <div>
      <h3>بدون Event Delegation</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WithoutDelegation;
