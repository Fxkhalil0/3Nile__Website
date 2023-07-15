import React from 'react'
import style from './Description.module.css'
// import Discription from './Description'
// import App from '../App'
import cardboat from './boat.jpg'

function Card () {
    return (
        <>
            <div className={style["simailar-boats__card"]}>
                <img src={cardboat} alt="" />
                <div className={style["card__name"]}>
                    <h3>lorem</h3>
                    <h4>EGP 555</h4>
                </div>
                <h5>lorem <span>lorem</span></h5>
                <h5>lorem <span>lorem</span></h5>
                <h5>lorem <span>lorem</span></h5>
                <h5>lorem <span>lorem</span></h5>
                <i className={style["fa-solid fa-ellipsis"]}></i>
            </div>
        </>
    )
}

export default Card