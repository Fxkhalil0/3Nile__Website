import React from "react";
import { motion } from "framer-motion";
import animationStart from "./AnimationComponents";

function Animation() {

    
    
    return (
    <motion.div
    //   variants={reveal}
      initial="hiddenVariant"
      animate="revealedVariant"
      transition={{ delay: 6 }}
    >
      Your component content goes here
    </motion.div>
  );
}
export default Animation;
