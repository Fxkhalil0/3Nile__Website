import React from 'react'
import style from './loginsignup.module.css'

function LoginSignup() {
  return (
    <>

    	  <div className={style["main"]}>  	
        <input type="checkbox" className={style["chk"]} id={style['chk']} aria-hidden="true" />
        <div className={style["signup"]}>
          <form>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button>Sign up</button>
          </form>
        </div>
        <div className={style["login"]}>
          <form>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button>Login</button>
          </form>
        </div>
      </div>
  
    
    </>
  )
}

export default LoginSignup