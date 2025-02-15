import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";

import { ScrollButton } from "../../styles/scroll";
import UseDirection from "../../hooks/use-direction";

function Scroll() {
  const { direction } = UseDirection();
  const [show, setShow] = useState(false);

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
            [direction.right]: "10px",
            bottom: "10%",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ScrollButton> Scroll to Top</ScrollButton>
        </motion.div>
      )}
    </div>
  );
}

export default Scroll;
