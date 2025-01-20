import React from "react";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function IntroductorySection() {
  const { t } = useTranslation();
  const words = t("welcome-sentence").split(" ");
  // Use useInView hook
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.22, delayChildren: 0.06 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div
      style={{
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        fontSize: "2rem",
      }}
      ref={textRef}
      initial="hidden"
      animate={textInView ? "visible" : "hidden"} // Use "hidden" instead of null
      variants={container}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          <Typography gutterBottom sx={{ color: "white", fontSize: 23 }}>
            {word}
          </Typography>
        </motion.span>
      ))}
    </motion.div>
  );
}

export default IntroductorySection;
// import React, { useEffect } from "react";

// import { useTheme } from "@emotion/react";
// import { useTranslation } from "react-i18next";
// import { Container } from "@mui/material";
// import { Typography } from "@material-ui/core";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// import "./introductory.css";
// import Image from "@assets/introductory";
// import UseThemMode from "@hooks/use-theme";
// import UseMediaQueryHook from "@hooks/use-media-query";
// import { IntroudctoryButton } from "@styles/introductory";

// function Introductory() {
//   const theme = useTheme();
//   const { t } = useTranslation();
//   const { themeMode } = UseThemMode();
//   const { isMatch } = UseMediaQueryHook();

//   // Use useInView hook
//   const { ref: imgRef, inView: imgInView } = useInView({ triggerOnce: false });
//   const { ref: textRef, inView: textInView } = useInView({
//     triggerOnce: false,
//   });
//   const { ref: introductoryRef, inView: introductoryInView } = useInView({
//     triggerOnce: false,
//   });

//   useEffect(() => {}, [theme.direction]);

//   const words = t("welcome-sentence").split(" ");

//   const container = {
//     hidden: { opacity: 0 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       transition: { staggerChildren: 0.22, delayChildren: 0.06 * i },
//     }),
//   };

//   const child = {
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//     hidden: {
//       opacity: 0,
//       x: 20,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <div
//       className={`hero ${themeMode}`}
//       style={{ textAlign: isMatch ? "center" : "inherit" }}
//     >
//       <Container
//         data-aos="fade-up"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: isMatch ? "column" : "row",
//         }}
//       >
//         <motion.div
//           ref={imgRef}
//           initial={{ opacity: 0, y: -100 }}
//           animate={imgInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 1 }}
//           className="hero-right"
//         >
//           <img
//             src={Image[0]}
//             alt=""
//             style={{ width: "350px", height: "350px" }}
//             loading="lazy"
//           />
//         </motion.div>
//         <div className="hero-left">
//           <h2>
//             <motion.div
//               style={{
//                 overflow: "hidden",
//                 display: "flex",
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//                 fontSize: "2rem",
//               }}
//               ref={textRef}
//               initial="hidden"
//               animate={textInView ? "visible" : "hidden"} // Use "hidden" instead of null
//               variants={container}
//             >
//               {words.map((word, index) => (
//                 <motion.span
//                   variants={child}
//                   style={{ marginRight: "5px" }}
//                   key={index}
//                 >
//                   {word}
//                 </motion.span>
//               ))}
//             </motion.div>
//           </h2>
//           <motion.div
//             ref={introductoryRef}
//             initial={{ opacity: 0, y: -100 }}
//             animate={introductoryInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 1 }}
//           >
//             <div
//               className="hero-hand-icon"
//               style={{ justifyContent: isMatch ? "center" : "start" }}
//             >
//               <p>{t("feel")}</p>
//               <img src={Image[1]} alt="New Collection Icon" />
//             </div>
//             <p>{t("free")}</p>
//             <p>{t("for-browsing")}</p>
//             <IntroudctoryButton to="discover">
//               <Typography>{t("discover")}</Typography>
//               {theme.direction === "rtl" ? (
//                 <ArrowBackIcon
//                   className="icon"
//                   style={{ transition: "0.3s" }}
//                 />
//               ) : (
//                 <ArrowForwardIcon
//                   className="icon"
//                   style={{ transition: "0.3s" }}
//                 />
//               )}
//             </IntroudctoryButton>
//           </motion.div>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Introductory;
