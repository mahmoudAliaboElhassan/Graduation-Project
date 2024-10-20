import { DirectionType } from "../utils/types";

function UseDirection() {
  const dir = (document.documentElement.dir ||"ltr") as "ltr"|"rtl";
  const left = dir === "ltr" ? "left" : "right";
  const right = dir === "ltr" ? "right" : "left";

  const direction: DirectionType = {
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
  return { direction };
}

export default UseDirection;
// Capitalization of Direction: In JavaScript/TypeScript, variables typically use camelCase. Using Direction (with uppercase "D") might cause confusion as it's treated more like a class or constructor by convention.
//  It would be better to rename it to direction to follow common
