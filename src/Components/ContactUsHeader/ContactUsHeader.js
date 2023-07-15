import React, { useEffect } from 'react'
// import cover from '../../Pages/ContactUsPage/500px (2).jpeg'
import cover from '../../Pages/ContactUsPage/bbb.jpg'
import style from '../../Pages/ContactUsPage/Contactus.module.css'

function ContactUsHeader() {
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' }); 

    },[])
    return (
        <>
            <div className="contact__us__section">
                <div className="contact__us__header">
                    <div className={style["contact__us__header__figure"]}>
                        <img className={style["contact__us__header__img"]} src={cover} alt=''/>

                        <div className={style["contact__us__contact__us__social__details__container"]}>
                            <div className={style["contact__us__social__details"]}>
                                <div className={style["contact__us__social__box"]}>
                                    <i className="fa-solid fa-headset" style={{ fontSize: '40px' }}></i>
                                    <div className={style["contact__us__social__text"]}>
                                        <h3>
                                            Phone:
                                        </h3>
                                        <h4>
                                            010123456789
                                        </h4>
                                    </div>
                                </div>
                                <div className={style["contact__us__social__box"]}>
                                    <i className="fa-solid fa-envelope" style={{ fontSize: '40px' }}></i>
                                    <div className={style["contact__us__social__text"]}>
                                        <h3>
                                            Email:
                                        </h3>
                                        <h4>
                                            3nileComm@gmail.com
                                        </h4>
                                    </div>
                                </div>
                                <div className={style["contact__us__social__box__last"]}>
                                    <i className="fa fa-brands fa-square-facebook" style={{ fontSize: '40px' }}></i>
                                    <div className={style["contact__us__social__text"]} >
                                        <h3>
                                            Facebook:
                                        </h3>
                                        <h4>
                                            3nile Community
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContactUsHeader