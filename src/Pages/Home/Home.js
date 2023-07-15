import React from 'react'
import Homecards from '../../Components/HomeCards/Homecards'
import Homecontact from '../../Components/homecontact/Homecontact'
import Homesocial from '../../Components/homesocial/Homesocial'
import HomeHeader from '../../Components/HomeHeader/HomeHeader'
function Home() {
  return (
    <>
    <HomeHeader/>
    <Homecards/>
    {/* <Count/> */}
    <Homecontact/>
    <Homesocial/>
    </>
  )
}

export default Home