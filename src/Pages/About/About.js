import React from 'react'
// import Footer from '../Components/Footer/Footer'
import Header from './Components/Header/Header'
// import Nav from   '../Components/Navbar/Navbar'
import AboutCards from './Components/AboutCards/AboutCards'
import Choose from './Components/Choose/Choose'
import OurTeam from './Components/OurTeam/OurTeam'
import style from "./Components/Header/header.module.css"
import  { AnimatedPageRight } from '../AnimatedPages/AnimatedPages'

function About() {
  return (
    <>
{/* <AnimatedPageRight> */}
    <Header></Header>
    <div className={style["container"]}>
    <AboutCards id='cards'></AboutCards>
    <Choose></Choose>

    <OurTeam></OurTeam>
    </div>
{/* </AnimatedPageRight> */}

    </>
  )
}

export default About