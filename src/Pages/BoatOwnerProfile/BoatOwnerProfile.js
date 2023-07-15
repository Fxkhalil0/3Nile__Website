import React from 'react'
import BoatOwnerTrips from './Components/BoatOwnerTrips/BoatOwnerTrips'
import OwnerCover from './Components/Cover/OwnerCover'
import  { AnimatedPageRight } from '../AnimatedPages/AnimatedPages'

function BoatOwnerProfile() {

    return (
       
  
       <>
        <AnimatedPageRight>
      <OwnerCover />
      <BoatOwnerTrips />
     </AnimatedPageRight>
       
     {/* <Navbar></Navbar> */}
       </>
     
    
      
    
      
 

       )
}

export default BoatOwnerProfile