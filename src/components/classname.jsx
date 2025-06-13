// Professional Way

import classNames from "classnames";
import "styles.css";

const Button = ({
  isPrimary,
  isRounded,
  isLoading,
  isFullWidth,
  isDisabled,
}) => {
  const btnClass = classNames("btn", {
    "btn-primary": isPrimary,
    "btn-rounded": isRounded,
    "btn-loading": isLoading,
    "btn-full": isFullWidth,
    "btn-disabled": isDisabled,
  });

  return (
    <button className={btnClass} disabled={isDisabled}>
      {isLoading ? "Loading..." : "Click Me"}
    </button>
  );
};

export default Button;
