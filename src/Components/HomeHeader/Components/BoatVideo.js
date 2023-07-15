import React, { useEffect, useState } from 'react'
import myVideo from '../assets/homeblue.mp4'
import styles from './HomeHeader.module.css'
import { useSelector } from "react-redux";

function BoatVideo() {
  const { user } = useSelector(state => state.UserSlice)

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps

    if(!user){
      setShowAnimation(false)
    }
    else{
      setShowAnimation(true)

    }
  
  }, [user]);
  return (
    <>

      
          <div     className={[showAnimation?styles.container2:styles.container]} >
          <video   className={[showAnimation?styles.video2:styles.video]} 
          autoPlay
            muted
            loop>
            <source src={myVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
       

     
  </>
  )
}

export default BoatVideo