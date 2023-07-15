import React from 'react'
import style from './homesocial.module.css'
import { NavLink } from 'react-router-dom'
import {motion} from 'framer-motion'
const barVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

function Homesocial() {

    
    return (
        <>
            <section>
                <div className={style["social_section"]}>
                    <div className={style["container"]} style={{ overflow: 'hidden' }}>
                        <motion.div 
                       whileHover={{ x: 0, transition: { duration: 0.3 } }}

                        initial={{ x: '100%' }}
                        animate={{ x: '-100%' }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: 'linear'}}
                        
                        // whileHover={{ scale: 1.05 }}
                        // whileTap={{ scale: 0.95 }}
                        
                        className={style["social_section__icons"]}>
                      
                        <div className={style["social_section_one"]}>
                            <NavLink href="#" style={{fontSize:"30px",paddingRight:"20px",color:"gray"}} className="fab fa-facebook"></NavLink>
                            <p>facebook</p>
                        </div>
                        <div className={style["social_section_one"]}>
                            <NavLink href="#" style={{fontSize:"30px",paddingRight:"20px",color:"gray"}} className="fab fa-twitter"></NavLink>
                            <p>twitter</p>
                        </div>
                        <div className={style["social_section_one"]}>
                            <NavLink href="#" style={{fontSize:"30px",paddingRight:"20px",color:"gray"}} className="fab fa-dribbble"></NavLink>
                            <p>dribbble</p>
                        </div>
                        <div className={style["social_section_one"]}>
                            <NavLink href="#" style={{fontSize:"30px",paddingRight:"20px",color:"gray"}} className="fab fa-instagram"></NavLink>
                            <p>instgram</p>
                        </div>
                    </motion.div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Homesocial