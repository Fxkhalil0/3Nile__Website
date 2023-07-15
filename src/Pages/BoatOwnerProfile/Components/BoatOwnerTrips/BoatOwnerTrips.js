import React from 'react'
import style from "../BoatOwnerTrips/BoatOwnerTrips.module.css"
import Card from '../../../../Components/card2/Card'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { getOwnerRequests} from '../../../../redux/slices/UserSlice'
import { getOwnerSwvlTrips} from '../../../../redux/slices/UserSlice'
import { getOwnerBoats} from '../../../../redux/slices/UserSlice'
import { getOwnerPreviousTrips} from '../../../../redux/slices/UserSlice'
import { getOwnerCurrentTrips} from '../../../../redux/slices/UserSlice'
import { useState } from 'react';
import { useEffect } from 'react';
import SWVLCARD from '../../../../Components/swvlCard/SWVLCARD';
import Loader from '../../../../Components/SplashComponent/Splash';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function BoatOwnerTrips() {
  const {boatOwner } = useSelector(state=>state.UserSlice)
  const {ownerSwvl } = useSelector(state=>state.UserSlice)
  const {ownerBoats } = useSelector(state=>state.UserSlice)
  const [status,setStatus]=useState('all')
  const [flag,setFlag]=useState(false)
  const { loading } = useSelector((state) => state.UserSlice);

  const dispatch =useDispatch()

  function getRequests(){
    setStatus("pending")
    dispatch(getOwnerRequests(boatOwner.boatOwnerData._id)).then((res)=>{
      console.log(res,"reeeeeeeeee")
    })
    console.log(ownerBoats);
  }
  function getSwvls(){
    setFlag(true)
    setStatus("swvl")
    console.log(ownerSwvl);

    dispatch(getOwnerSwvlTrips(boatOwner.boatOwnerData._id)).then((res)=>{
    })
  }
  function getAllBoats(){
    setFlag(false)

    setStatus("all")

    dispatch(getOwnerBoats(boatOwner.boatOwnerData._id));
    console.log(ownerBoats);
  }
  
  function getPreviousTrips(){
    setFlag(false)

    setStatus("finished")
    dispatch(getOwnerPreviousTrips(boatOwner.boatOwnerData._id));
    console.log(ownerBoats );
  }
  function getCurrentTrips(){
    setFlag(false)

    setStatus("running")
    dispatch(getOwnerCurrentTrips(boatOwner.boatOwnerData._id));
    console.log(ownerBoats);
  }

  useEffect(()=>{
    socket.on("You-Got-New-Trip-Request" , (data)=>{
      dispatch(getOwnerRequests(boatOwner.boatOwnerData._id))
      setStatus("pending")
    })


    dispatch(getOwnerSwvlTrips(boatOwner.boatOwnerData._id)).then(()=>{
    })
    setFlag(false)
  },[])

    return (
        <>
          {
            loading? (<Loader/>):(
              <>
              
        
        <section >
         <div  className={style["user-trips"]}>
           <div className={style["container"]}>
             <div className={style["trips-nav"]}>
               <div className={style["trips-nav-buttons"]}>
                 <div className={style["previous-trips"]}>
                   <button
                className={ status === 'all'  ? style["activeLink"] : ''}

                   
                   onClick={getAllBoats}>Boats</button>
                 </div>
                 <div className={style["requests-trips"]}>
                   <button
                    className={ status === 'pending'  ? style["activeLink"] : ''}

                   onClick={getRequests}
                   
                   
                   >Your Requests </button>
                 </div>
                 <div className={style["requests-trips"]}>
                   <button
                    className={ status === 'running'  ? style["activeLink"] : ''}

                   
                   onClick={getCurrentTrips}>Your Current Trips</button>
                 </div>
                 <div className={style["favourite-trips"]}>
                   <button

                      className={ status === 'finished'  ? style["activeLink"] : ''}

                    onClick={getPreviousTrips}
                    
                    
                    >Your Previous Trips</button>
                 </div>
                 <div className={style["favourite-trips"]}>
                   <button
                   className={ status === 'swvl'  ? style["activeLink"] : ''}

                   onClick={getSwvls}
                   
                   
                   >Swvl Trips</button>
                 </div>
               </div>
             </div>
             <div className={style["user-trips-cards"]}>
               <div className={style["cards"]}>

             {
                !flag && ownerBoats?.data&& ownerBoats?.data.map((item) => {
                return <Card key={item?.id} data={{item,status}}  />
            })
             }
             { 
                flag && ownerSwvl.data&& ownerSwvl.data.map((item) => {
                return <SWVLCARD key={item.id} data={{item}}  />
            })
             }

               </div>
             </div>
           </div>
         </div>
       </section>
       </>
            )
          }
        
        </>
       )
}

export default BoatOwnerTrips