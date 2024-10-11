import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import i18next from "i18next";

import { Button, Dropdown, DropdownDivider } from "react-bootstrap";
import UseLanguages from "../../hooks/use-langs";
import lamgImg from "../../assets/globe.png";
function LanguageSelection() {
  const { Languages } = UseLanguages();
  const currLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = Languages.find((l) => l.code === currLanguageCode);
  useEffect(() => {
    document.documentElement.dir = currentLanguage?.dir || "ltr";
  }, []);

  const changeLang = (code: string) => {
    i18next.changeLanguage(code);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          style={{ background: "transparent" }}
        >
          <img src={lamgImg} style={{ height: "25px", width: "25px" }} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Languages.map(({ country_code, code, name }) => (
            <div key={country_code}>
              <Dropdown.Item
                onClick={() => changeLang(code)}
                disabled={currLanguageCode === code}
              >
                <i className={`flag flag-${country_code} larger-icon mx-1`}></i>{" "}
                {name}
              </Dropdown.Item>
              <DropdownDivider />
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default LanguageSelection;
