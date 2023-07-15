import React from 'react'
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function HeroText() {
  const { user } = useSelector(state => state.UserSlice)

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
  
    if(!user){
      setShowAnimation(false)
    }
    else{
      setShowAnimation(true)

    }
  
  }, []);
    return (
      <>
      {
        showAnimation ?  (<div
          layout
         
          initial={{ height: 0 }}
          animate={{ height: "unset" }}
          transition={{ delay: 6, duration: 1 }}
          style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',paddingTop:'100px'}}
          // className={[styles.flex, styles.flexCol, styles.itemsCenter, styles.textCenter].join(" ")}

        >
          <div
            variants={{hiddenVariant: { y: 50, opacity: 0 },
            revealedVariant: {
              y: 0,
              opacity: 1,
            },}}
            initial="hiddenVariant"
            animate="revealedVariant"
            transition={{delay: 8, duration: 1  }}
            style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center' ,fontSize:'3vw' ,fontWeight:'bold',marginBottom: "30px",paddingTop:'100px'}}


          >   
            <span style={{display:'flex',alignItems:'center', gap: "10px",color:"#595151"}}
 >
               Enjoy a beautiful 
            </span>
            <span style={{color:"#595151"}}>journey with us</span>
          </div>
          <span
            variants={{ hiddenVariant: { y: 50, opacity: 0 },
            revealedVariant: {
              y: 0,
              opacity: 1,
            },}}
            initial="hiddenVariant"
            animate="revealedVariant"
            transition={{ delay: 8, duration: 1  }}
            style={{ marginBottom: "30px", width: "25%",fontSize: "14px",lineHeight: "1.2"}}
            // className={[styles.mdW1_2, styles.text14px, styles.leadingTight].join(" ")}
         
          >
           journey will be filled with beauty, wonder, and excitement.
          </span>
        </div>) : (
          <motion.div
            layout
           
            initial={{ height: 0 }}
            animate={{ height: "unset" }}
            transition={{ delay: 6, duration: 1 }}
            style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}
            // className={[styles.flex, styles.flexCol, styles.itemsCenter, styles.textCenter].join(" ")}
  
          >
            <motion.div
              variants={{hiddenVariant: { y: 50, opacity: 0 },
              revealedVariant: {
                y: 0,
                opacity: 1,
              },}}
              initial="hiddenVariant"
              animate="revealedVariant"
              transition={{delay: 8, duration: 1  }}
              style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center' ,fontSize:'3vw' ,fontWeight:'bold',marginBottom: "30px",paddingTop:'100px'}}
  
  
            >   
              <span style={{display:'flex',alignItems:'center', gap: "10px"}}
   >
   Enjoy a beutiful
              </span>
              <span> journey with us</span>
            </motion.div>
            <motion.span
              variants={{ hiddenVariant: { y: 50, opacity: 0 },
              revealedVariant: {
                y: 0,
                opacity: 1,
              },}}
              initial="hiddenVariant"
              animate="revealedVariant"
              transition={{ delay: 8, duration: 1  }}
              style={{ marginBottom: "30px", width: "25%",fontSize: "14px",lineHeight: "1.2"}}
              // className={[styles.mdW1_2, styles.text14px, styles.leadingTight].join(" ")}
           
            >
              vr headset warable network effect. hypergrowth activist investor.
              substack blogging thiel fellow dropout. alexis ohanian tweeted overhyped
              ed-tech series.
            </motion.span>
          </motion.div>
  
        )
      }
      
      </>
      );
    
}

export default HeroText