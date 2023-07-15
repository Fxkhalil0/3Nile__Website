import React from 'react'
// import Nav from '../Navbar/Nav'
import style from './header.module.css'
import "./header.css"
import headerimg from './mo-gabrail-XMxINoMi2Q4-unsplash.jpg'
import 'react-slideshow-image/dist/styles.css'
import { Fade ,Slide } from 'react-slideshow-image'
import e from './download.jpeg'
import o from './ocean-quotes-index-1624414741.jpg'
function Header() {
  let slide =[{img:headerimg,mainTitle:"3NILE SWEVEL",description:"It is smaller than a ship and can be lifted out of the water and carried on a ship."},{img:e,mainTitle:"3NILE PLUSE",description:"It is smaller than a ship and can be lifted out of the water and carried on a ship."},{img:o,mainTitle:"3NILE VIB",description:"It is smaller than a ship and can be lifted out of the water and carried on a ship."}]
  const proprietes = {
    duration: 2000,
    transitionDuration: 850,
    infinite: true,
    indicators: false,
    arrows: false,
    pauseOnHover: false,
}
const propriete = {
  duration: 2000,
  transitionDuration: 850,
  infinite: true,
  indicators: true,
  arrows: false,
  pauseOnHover: false,
}
  return (
    
    <>
 
    <header className={style["home__header"]}>
    <div className={style["home__text"]}>
    <Slide {...proprietes}>
            {slide.map((img,index)=>(
              <>
        
        <p>{img.mainTitle}</p>
        <p>{img.description}</p>
        </>
            ))}
        </Slide>
               
               
    </div>
    <div className={style["header__img"]}>
      <span className={style["go"]}>Go</span>
    <Fade {...propriete}>
            {slide.map((img,index)=>(
              <>
        <img src={img.img} key={index} alt={index}/>
        </>
            ))}
        </Fade>
    </div>
    </header>
    </>
  )
}

export default Header