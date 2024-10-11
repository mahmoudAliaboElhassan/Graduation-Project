import { lang } from "../utils/types";

function UseLanguages() {
  const Languages: lang[] = [
    {
      code: "en",
      name: "English",
      country_code: "us",
    },
    {
      code: "ar",
      name: "عربي",
      country_code: "eg",
      dir: "rtl",
    },
  ];

  return { Languages };
}

export default UseLanguages;
