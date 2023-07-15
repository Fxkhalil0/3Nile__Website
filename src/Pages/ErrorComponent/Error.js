import React from 'react'
import style from './Error.module.css'
import image from './pexels-photo-22628000.jpeg'
import { useNavigate } from 'react-router-dom';

const Error=() =>{
    const navigate = useNavigate();

    return (
        <>
        <section className={style["error"]}>
        <div  className={style["container"]}>
            <div  className={style["error__content"]}>
                <div  className={style["error__text"]}>
                    <h1 className={style["h1"]}>404</h1>
                    <p className={style["p"]}>The page you are looking for might have been removed had its name changed or it temporarily unavailable</p>
                    <button  onClick={()=>{
                        
                        navigate('/home'); 

                    }
                          
                        } className={style["error__button"]}>
                        <i  className={style[" bx bxs-home"]} ></i> Home Page</button>
                </div>
                <figure className={style["error__image"]}>
                    <img className={style["image"]} src={image} alt="" />
                </figure>
            </div>
        </div>
    </section>
        </>
    )
}
export default Error;