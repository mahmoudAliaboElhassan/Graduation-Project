import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeMode } from "../../state/slices/mode";

function Mode() {
  const { mymode } = useAppSelector((state) => state.mode);
  const dispatch = useAppDispatch();
  const change: any = () => dispatch(changeMode());
  const { t } = useTranslation();
  return (
    <>
      <Tooltip title={t(`change-${mymode}`)}>
        <IconButton onClick={change} color="inherit">
          {mymode == "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default Mode;

// import React, { useState } from "react";

// import "./mode.css";
// import UseDirection from "../../hooks/use-direction";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { changeMode } from "../../state/slices/mode";

// // function Mode() {
// //   const [isChecked, setIsChecked] = useState<boolean>(false); // Initialize state for the checkbox
// //   const { Direction } = UseDirection();
// //   const dispatch = useAppDispatch();
// //   const { mymode } = useAppSelector((state) => state.mode);
// //   console.log("isChecked", isChecked);
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setIsChecked(e.target.checked);
// //     dispatch(changeMode());
// //   };
// //   return (
// //     <div className="toggle-border" style={{ [Direction.marginLeft]: "8px" }}>
// //       <input
// //         id="one"
// //         type="checkbox"
// //         onChange={handleChange}
// //         checked={mymode === "dark"}
// //       />
// //       <label htmlFor="one">
// //         <div className="handle"></div>
// //       </label>
// //     </div>
// //   );
// // }

// // export default Mode;
