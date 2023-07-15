import { motion } from "framer-motion";

 const animationRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
 const animationLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const animationTop = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};
const animationTransition = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

export const AnimatedPageRight = ({ children }) => {
  return (
    <motion.div
      variants={animationRight}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .5 }}
    >
      {children}
    </motion.div>
  );
};
export const AnimatedPageleft = ({ children }) => {
  return (
    <motion.div
      variants={animationLeft}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .5 }}
    >
      {children}
    </motion.div>
  );
};
export const AnimatedTransition = ({ children }) => {
  return (
    <motion.div
     
      animate={{ x: -100 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

