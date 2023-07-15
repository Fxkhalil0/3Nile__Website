import React from 'react'
import style from './navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Navbarr() {
  const nav = useNavigate
  return (
    <>
   

<div>
<div className={style["header"]} >
  <div className={style["navbar"]}>
  <div className={style["nav_logo"]}>
  <NavLink to="/" >
  <h1>3Nile</h1>
  </NavLink>
  </div>
  <div className={style["menu"]}>

    <svg className={style["line-top"]} width={750} height={15} viewBox="0,0 1000,20">
      <line className={style["line-dash"]} x1={0} y1={15} x2={1000} y2={15} style={{stroke: 'orange', strokeWidth: 2, strokeLinecap: 'round', strokeDasharray: '180,1200', strokeDashoffset: -35}} />
    </svg>

    <ul className={style["NavLink"]}>
      <li><NavLink to="/" className={style["NavLink"]}>Home</NavLink></li>
      <li><NavLink to="about" className={style["NavLink"]}>About</NavLink></li>
      <li><NavLink to="description" className={style["NavLink"]}>Contact</NavLink></li>
      <li><NavLink to="user-profile" className={style["NavLink"]}>profile</NavLink></li>
      <li><NavLink to="Owner-profile" className={style["NavLink"]}>Owner-profile</NavLink></li>
    </ul>
    <svg className="line-bottom" width={750} height={30} viewBox="0,0 1000,40">
      <polygon className={style["lb"]} points="35,53 115,53 125,43 135,53 215,53" />
      <polygon className={style["lb"]} points="285,53 365,53 375,43 385,53 465,53" />
      <polygon className={style["lb"]} points="535,53 615,53 625,43 635,53 715,53" />
      <polygon className={style["lb"]} points="785,53 865,53 875,43 885,53 965,53" />
    </svg>
    </div>
    <div className={style["navicon"]}>
    <NavLink className={style["NavLink"]} to="/"><i style={{ padding: 40}} className="fa fa-solid fa-comment"></i></NavLink>
    <NavLink className={style["NavLink"]} to="/"><i className="fa fa-solid fa-bell"></i></NavLink>
    </div>
    <div  className={style["butt_margin"]}>
    <button  className={style["join_us_but"]}>
    <NavLink className={style["NavLink_but"]} to="login-signup">join us</NavLink>
    </button>
    </div>
  </div>
</div>
</div>


</> 


)
}

export default Navbarr


