import React from 'react';
import loader from './loaderrr.gif'
import style from './Splash.module.css'



function Splash(props) {
  return (
   
    <img className={style.loader} src={loader} alt="loader" />

  )
}

export default Splash