import React from 'react';
import style from "./ourTeam.module.css";
import kero from "./WhatsApp Image 2023-06-25 at 1.13.20 PM.jpeg";
import fatma from "./WhatsApp Image 2023-06-25 at 12.54.59 PM.jpeg";
import hosam from "./WhatsApp Image 2023-06-25 at 12.55.01 PM (1).jpeg";
import zamzam from "./WhatsApp Image 2023-06-25 at 12.55.01 PM.jpeg";
import nada from "./nada.jpeg";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function OurTeam() {
  const teamMembers = [
    {
      name: "Fatma Khalil",
      role: "CEO & Founder",
      image: fatma,
    },
    {
      name: "Hossam Elsayed",
      role: "CEO & Founder",
      image: hosam,
    },
    {
      name: "Nada Gamal",
      role: "CEO & Founder",
      image: nada,
    },
    {
      name: "Kerolos Khairy",
      role: "CEO & Founder",
      image: kero,
    },
  
    {
      name: "Zamzam Abdelgwad",
      role: "CEO & Founder",
      image: zamzam,
    },
  ];

  return (
    <section className={style["our__team"]}>
      <div className={style["container"]}>
        <h1>The Team</h1>
        <p>
        A program team is typically organized as a team of teams,Structures are required to coordinate people requirements.
        </p>
        <Carousel
          showArrows={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" className={style["carousel__arrow_left"]} onClick={onClickHandler} title={label}>
                {"<"}
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" className={style["carousel__arrow_right"]} onClick={onClickHandler} title={label}>
                {">"}
              </button>
            )
          }
          showStatus={false}
          showThumbs={false}
          centerMode={true}
          centerSlidePercentage={33.333}
        >
          {teamMembers.map((member, index) => (
            <div key={index} className={style["team__card__box"]}>
              <figure>
                <img src={member.image} alt="" />
              </figure>
              <div className={style["team__card__text"]}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default OurTeam;
