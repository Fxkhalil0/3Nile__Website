import React from 'react'
import style from './count.module.css'
function Count() {
  return (
   <>
   <section className={style["count_container"]}>
    <div className={style["container"]}>
    <div className={style["count_row"]}>
        <div className={style["count_card"]}>
            <i className={style["fa fa-solid fa-sailboat"]}></i>
            <p className={style["count_p"]}>10</p>
            <div className={style["count_border"]}></div>
            <p className={style["count_disc"]}>card one</p>
        </div>


        <div className={style["count_card"]}>
            <i className={style["fa fa-solid fa-person"]}></i>
            <p className={style["count_p"]}>10</p>
            <div className={style["count_border"]}></div>
            <p className={style["count_disc"]}>card one</p>
        </div>
        <div className={style["count_card"]}>
        <i className={style["fa fa-solid fa-person"]}></i>
        <p className={style["count_p"]}>10</p>
        <div className={style["count_border"]}></div>
        <p className={style["count_disc"]}>card one</p>
    </div>
    <div className={style["count_card"]}>
    <i className={style["fa fa-solid fa-person"]}></i>
    <p className={style["count_p"]}>10</p>
    <div className={style["count_border"]}></div>
    <p className={style["count_disc"]}>card one</p>
</div>
</div>
    </div>
</section>
   
   
   </>
  )
}

export default Count