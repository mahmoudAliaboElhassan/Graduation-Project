import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"

import { ScrollButton } from "../../styles/scroll"
import { useAppSelector } from "../../hooks/redux"
import UseDirection from "../../hooks/use-direction"

function Scroll() {
  const [show, setShow] = useState(false)
  const { mymode } = useAppSelector((state) => state.mode)
  const { direction } = UseDirection()

  console.log("window.lenis", window.lenis)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY >= 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (window.lenis) {
      // Use Lenis smooth scroll
      window.lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      {show && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            [direction.right]: "35px",
            bottom: "37%",
            cursor: "pointer",
            width: "fit-content",
            zIndex: 1000,
          }}
          onClick={scrollToTop}
        >
          <ScrollButton mode={mymode}>
            <KeyboardDoubleArrowUpIcon
              fontSize="large"
              sx={{ color: "white" }}
            />
          </ScrollButton>
        </motion.div>
      )}
    </>
  )
}

export default Scroll
