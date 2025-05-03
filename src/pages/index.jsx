const statusMessages = {
  200: "نجاح ✅",
  404: "الصفحة غير موجودة ❌",
  500: "خطأ في السيرفر 🔥",
};

function getStatusMessage(status) {
  return statusMessages[status] || "حالة غير معروفة 🤷‍♂️";
}

console.log(getStatusMessage(200)); // نجاح ✅
console.log(getStatusMessage(404)); // الصفحة غير موجودة ❌
console.log(getStatusMessage(500)); // خطأ في السيرفر 🔥
