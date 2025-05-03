// الطريقة التانية: باستخدام Event Delegation
import React from "react";

const WithDelegation = () => {
  const handleParentClick = (e) => {
    if (e.target.tagName === "LI") {
      console.log("كلكيت على:", e.target.textContent);
    }
  };

  return (
    <div>
      <h3>بـ Event Delegation</h3>
      <ul onClick={handleParentClick}>
        <li>تفاحة</li>
        <li>موزة</li>
        <li>عنب</li>
      </ul>
    </div>
  );
};

export default WithDelegation;
