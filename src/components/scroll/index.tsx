import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import { ScrollButton } from "../../styles/scroll";
import UseDirection from "../../hooks/use-direction";
import { useAppSelector } from "../../hooks/redux";

function Scroll() {
  const { direction } = UseDirection();
  const [show, setShow] = useState(false);
  const { mymode } = useAppSelector((state) => state.mode);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {show && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "sticky",
             right : "35px",
            bottom: "25%",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ScrollButton mode={mymode}>
            {" "}
            <KeyboardDoubleArrowUpIcon
              fontSize="large"
              sx={{ color: "white" }}
            />
          </ScrollButton>
        </motion.div>
      )}
    </div>
  );
}

export default Scroll;
