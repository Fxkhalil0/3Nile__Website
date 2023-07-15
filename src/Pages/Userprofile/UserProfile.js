import React from 'react'
import  "../Userprofile/userProfile.module.css"
// navbar With Css
// import Navbar from '../../components/Navbar/Navbar'
// import "../../components/Navbar/navbar.css"
// Cover 
import Cover from './Components/Cover/Cover'
import UserTrips from './Components/UserTrips/UserTrips'
import  { AnimatedPageRight } from '../AnimatedPages/AnimatedPages'


function UserProfile() {
  return (
   <>
         <AnimatedPageRight>

      <Cover />
      <UserTrips />
         </AnimatedPageRight>
      
 
</>

  
  )
}

export default UserProfile