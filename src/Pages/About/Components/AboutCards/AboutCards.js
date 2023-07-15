import React from 'react'
import style from "./AboutCards.module.css"
import card1 from "./about1.png"
import card2 from "./about3.png"
import card3 from "./about2.png"


function AboutCards() {
    return (
        <>
        <section className= {style["about_cards"]}>
                <div  className= {style["about_card"]}>
                    <div  className= {style["about_card_img"]}>
                        <img src={card1} alt="" />
                    </div>
                    <div  className= {style["about_card_discreption"]}>
                        <h2>3Nile </h2>
                        <p>
                        The easy way to choose a boat for your trip and enjoy with your friends and family.
                        Enjoy your journey with more privacy through some private boats.
                        Choose the category you want and what features you'd like to see and do.
                        </p>
                    </div>
                </div>
                <div  className= {style["about_card"]}>
                    <div  className= {style["about_card_discreption"]}>
                        <h2>3Nile VIP</h2>
                        <p>
                        Choose the category you want and what features you'd like to see and do.
                        Enjoy your journey with more privacy through some private boats.
                        The easy way to choose a boat for your trip and enjoy with your friends and family.
                        </p>
                    </div>
                    <div  className= {style["about_card_img"]}>
                        <img src={card2}  alt="" />
                    </div>
                </div>
                <div  className= {style["about_card"]}>
                    <div  className= {style["about_card_img"]}>
                        <img src={card3}  alt="" />
                    </div>
                    <div  className= {style["about_card_discreption"]}>
                        <h2>3Nile Bus</h2>
                        <p>
                        Enjoy your journey with more privacy through some private boats.
                        Choose the category you want and what features you'd like to see and do.
                        The easy way to choose a boat for your trip and enjoy with your friends and family.
                        </p>
                    </div>
                </div>
            </section>
            </>
    )
}

export default AboutCards