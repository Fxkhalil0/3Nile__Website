import React from 'react'
import style from "./header.module.css"
import header_img from "./hand2.png"
import {motion,useAnimation } from 'framer-motion'

const text = "Fast and secure access always with you";
const characters = text.split('');
function Header() {


  
  return (
    <>
      <header>
        <div className={style["header__content"]}>

          <div className={style["header__content-left"]}>
            <h1 className={style["header__content-title"]}>
              
              
              
            {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}         
      
      </h1>   <p className={style["header__content-disc"]}>Fast and secure access always with you Fast and secure access always with you
              Fast and secure access always with you</p>

            <div className={`${style.flex} social-btns`}>
              <a className={`${style["app-btn"]} ${style.blu} ${style.flex} ${style.vert}`} href="http:apple.com">
                <i className="fab fa-apple"></i>
                <p>Available on the <br /> <span className={style["big-txt"]}>App Store</span></p>
              </a>

              <a className={`${style["app-btn"]} ${style.blu} ${style.flex} ${style.vert}`} href="http:google.com">
                <i className="fab fa-google-play"></i>
                <p>Get it on <br /> <span className={style["big-txt"]}>Google Play</span></p>
              </a>
            </div>

          </div>

          <div className={style["header__content-imgg"]}>
            <img src={header_img} alt="" width='30%' height='auto'/>
          </div>

          <div className={style["header__content-right"]}>
          </div>
        </div>
      </header>

    </>
  )
}

export default Header
