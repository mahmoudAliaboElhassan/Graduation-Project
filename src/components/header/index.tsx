// import React from "react";

// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

// import "./header.css";

// function Header() {
//   const { t } = useTranslation();
//   return (
//     <div>
//       <div>Header</div>
//       <div>{t("home")}</div>
//       <button onClick={() => i18next.changeLanguage("ar")}>
//         change lang ar
//       </button>
//       <button onClick={() => i18next.changeLanguage("en")}>
//         change lang en
//       </button>
//       <div style={{ height: "60px" }}></div>
//     </div>
//   );
// }

// export default Header;

import { useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { t } from "i18next";

import "./header.css";
import { Link } from "react-router-dom";
import UseHeaderElements from "../../hooks/use-header-elements";
// import userImage from "../../assets/user.png";
// import userImage from "../../assets/profile-user.png";
import userImage from "../../assets/user (1).png";
import UseMediaQuery from "../../hooks/use-media-query";

function Header() {
  const [expanded, setExpanded] = useState<boolean>(false); // State to manage Navbar toggle

  const handleLinkClick = () => {
    setExpanded(false);
    console.log("clicked");
  };
  const { notUserAuth, userAuth } = UseHeaderElements();
  const token = false;
  const authElements = token ? userAuth : notUserAuth;

  const isMd = UseMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary header-wrapper"
        expanded={expanded} // Control expansion
        onToggle={() => setExpanded(!expanded)} // Toggle function
      >
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                fontFamily: '"Montez","cursive"',
                fontSize: isMd ? "1.8rem" : "1.5rem",
              }}
              onClick={handleLinkClick} // Toggle function
            >
              {t("education-platform")}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  to="/"
                  onClick={handleLinkClick} // Toggle function
                >
                  {t("home")}{" "}
                </Link>
              </Nav.Link>
              <NavDropdown
                title={
                  <img
                    src={userImage}
                    style={{ height: "30px", width: "30px" }}
                  />
                }
                id="basic-nav-dropdown"
                align="end"
              >
                {authElements.map(({ href, label }, idx: number) => (
                  <>
                    <NavDropdown.Item onClick={handleLinkClick} key={label}>
                      <Link to={href || "/"}> {label}</Link>
                    </NavDropdown.Item>
                    {idx !== authElements.length - 1 && <NavDropdown.Divider />}
                  </>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          height: "90px",
        }}
      ></div>
    </>
  );
}

export default Header;
