import React from 'react'
import style from './Card.module.css'
import { NavLink } from 'react-router-dom'
import {motion} from 'framer-motion'
function Cardf(props) {
  return (
    <>

    
   <NavLink  className={style["card-list"]}  to={`/Description/${props?.data?._id}`} state={props?.data} >
    <motion.div 
   transition={{ type: "spring", stiffness: 100,delay:.1 }}

    animate={{opacity:1,animationDuration:2,animationDelay:3}}
         initial={{opacity:0 }}
         exit={{opacity:0}}
        
         
         >
  <div  className={style["card"]}>
  <figure className={style["card-image"]}>
            <img src={`http://localhost:5000/${props?.data?.images[0]}`} alt='boat' />
          </figure>
          <div className={style["card-header"]}>
            <h4  href="#"> {props?.data?.name}</h4>
            <h5>{props?.data?.price} EGP</h5>
          </div>
          <div className={style["card-footer"]}>
            <div >
            <div className={style["card-text"]}>
      <h4>type</h4>
      <h5>{props?.data?.type}</h5>
    </div>
          <div className={style["card-text"]}>
           <h4>number of people</h4>
          <h5>{props?.data?.numberOfpeople}</h5>
           </div>
            </div>
          </div>

 
  </div>
  </motion.div>
  </NavLink>  
  </>
  )
}

export default Cardf