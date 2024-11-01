import { useTranslation } from "react-i18next";
import "./loader.css";

function Loader() {
  const { t } = useTranslation();
  return (
    <div className="loader-container">
      <div className="page-loader">
        <div data-glitch={t("loading")} className="glitch">
          {t("loading")}
        </div>
      </div>
    </div>
  );
}

export default Loader;
