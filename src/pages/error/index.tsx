import React from "react";
import { Link, useRouteError } from "react-router-dom";

import ErrorImage from "../../assets/16.png";
import { useTranslation } from "react-i18next";

interface RouteError {
  statusText?: string;
  message?: string;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        <i>{error?.statusText || error?.message}</i>
      </h1>
      <img
        src={ErrorImage}
        alt="Error Image"
        style={{
          width: "80%",
          height: "80vh",

          margin: "auto",
          display: "flex",
        }}
      />
      <Link to="/">{t("go-back")}</Link>
    </div>
  );
}

export default ErrorPage;
