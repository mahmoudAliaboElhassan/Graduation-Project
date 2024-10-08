import { DirectionType } from "../utils/types";

function UseDirection() {
  const dir = document.documentElement.dir || "ltr";
  const left = dir === "ltr" ? "left" : "right";
  const right = dir === "ltr" ? "right" : "left";

  const Direction: DirectionType = {
    direction: dir,
    left: left,
    right: right,
    marginLeft: `margin-${left}`,
    marginRight: `margin-${right}`,
    paddingLeft: `padding-${left}`,
    paddingRight: `padding-${right}`,
    borderTopRightRadius: `border-top-${right}-radius`,
    borderRight: `border-${right}`,
  };
  return { Direction };
}

export default UseDirection;
