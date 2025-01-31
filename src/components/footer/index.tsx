import { useTranslation } from "react-i18next";

import { FooterContainer } from "../../styles/footer";
import { useAppSelector } from "../../hooks/redux";

function Footer() {
  const { mymode } = useAppSelector((state) => state.mode);
  const { t } = useTranslation();

  return (
    <FooterContainer mode={mymode}>
      <div> {t("footer-text")}</div>
      <div> {t("footer-team")}</div>
    </FooterContainer>
  );
}

export default Footer;
