import React from 'react'
import  style  from '../card -filter-desc/Card.module.css'
import { NavLink } from 'react-router-dom'
import { convertToAmPm,formatDate } from '../../Services/functions';

function NileBusCard(props) {


   
  return (
    <>
    <NavLink  className={style["card-list"]}  to={`/BusDesc/${props?.data?._id}`} state={props?.data} >
   <div  className={style["card"]}>
   <figure className={style["card-image"]}>
             <img src={`http://localhost:5000/${props?.data?.boat?.images[0]}`} alt='boat' />
           </figure>
           <div className={style["card-header"]}>
             <h4  href="#"> {props?.data?.boat?.name}</h4>
             <h5>Price for one  {props?.data?.priceForTrip} EGP</h5>
           </div>
           <div className={style["card-footer"]}>
             <div >
             <div className={style["card-text"]}>
       <h4>Target Place</h4>
       <h5>{props?.data?.targetPlace}</h5>
     </div>
           <div className={style["card-text"]}>
            <h4>Date</h4>
           <h5>{formatDate(props?.data?.date)}</h5>
            </div>
            <div className={style["card-text"]}>
            <h4>Time</h4>
           <h5>{convertToAmPm(props?.data?.time)}</h5>
            </div>
             </div>
           </div>
 
  
   </div>
   </NavLink>  
 
   </>
   )
  
}

export default NileBusCard