import React from 'react'
import { NavLink } from 'react-router-dom'
import style from  './homecontact.module.css'
function Homecontact() {
  return (
   <>
   <section className={style["home_contact_us"]}>
    <div  className={style["container"]}>
        <div  className={style["home_contact_us_bk"]}>
        </div>
        <div  className={style["home_contact_us_content"]}>
            <h2>If you have any question, Please feel free to let us know!</h2>
        </div>
        <div  className={style["go_to_contact_us_btn"]}>
        {/* <button  className={style["go_to_contact_us"]}>Contact Us</button> */}
        <NavLink  to="contactus"  className={style["go_to_contact_us"]}>Contact Us</NavLink>

        </div>
    </div>
</section>
   
   
   </>
  )
}

export default Homecontact