import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'


function Navbar() {

  return (
    <>
    <nav>
    <div className="header__links__container">
    <div className="header__links">
        <h2 color='white'>3nile</h2>
        <ul class="links">
            <li> <NavLink  to="/">
            Home <span className="sr-only">(current)</span>
          </NavLink></li>
            <li> <NavLink className="nav-link" to="about">
            About <span className="sr-only">(current)</span>
          </NavLink></li>
            <li> <NavLink className="nav-link" to="description">
            Description <span className="sr-only">(current)</span>
          </NavLink></li>
            <li> <NavLink className="nav-link" to="user-profile">
            Profile <span className="sr-only">(current)</span>
          </NavLink></li>
            <li> <NavLink className="nav-link" to="login-signup">
            Login Or Sign Up! <span className="sr-only">(current)</span>
          </NavLink></li>
            <li> <NavLink className="nav-link" to="filter">
            Filter <span className="sr-only">(current)</span>
          </NavLink></li>
          <li> <NavLink className="nav-link" to="Owner-profile">
            Owner-profile <span className="sr-only">(current)</span>
          </NavLink></li>
         
        </ul>
    </div>
    </div>
    <i class="fa-solid fa-bars"></i>
</nav>
</> 


)
}

export default Navbar