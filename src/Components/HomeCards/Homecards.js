import React, { useEffect, useRef } from 'react';
import style from './homecards.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllBoats, getCategoryOne, getCategoryTwo, getCategoryThree } from '../../redux/slices/UserSlice';

import imgone from './New Project.png';
import imgtwo from './DAHAB (1).png';
import imgthree from './cardth (1).png';

function Homecards() {
  const dispatch = useDispatch();
  const observer = useRef(null);

  useEffect(() => {
    dispatch(getAllBoats());
    dispatch(getCategoryOne());
    dispatch(getCategoryTwo());
    dispatch(getCategoryThree());
  }, [dispatch]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.current.unobserve(entry.target);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    const images = document.querySelectorAll('.lazy-image');
    images.forEach((image) => observer.current.observe(image));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <section className={style['our__categories']}>
        <div className={style['container']}>
          <div className={style['category__cards']}>
            <div className={style['left__category']}>
              <figure>
                <img className="lazy-image" data-src={imgone} alt="" />
              </figure>

              <div className={style['category__text']}>
                <h2>3Nile</h2>
                <p>The easy way to choose a boat for your trip and enjoy with your friends and family.</p>
              </div>

              <div className={style['go_to_contact_us_btn']}>
                <NavLink to="last-filter-page/1" className={style['go_to_contact_us']}>
                  GO
                </NavLink>
              </div>
            </div>
            <div className={style['right__category']}>
              <div className={style['category__text']}>
                <h2>3Nile VIP</h2>
                <p>Choose the category you want and what features you'd like to see and do.</p>
              </div>
              <figure>
                <img className="lazy-image" data-src={imgtwo} alt="" />
              </figure>
              <div className={style['go_to_contact_us_btn_right']}>
                <NavLink to="last-filter-page/2" className={style['go_to_contact_us_right']}>
                  GO
                </NavLink>
              </div>
            </div>
            <div className={style['left__category']}>
              <figure>
                <img className="lazy-image" data-src={imgthree} alt="" />
              </figure>

              <div className={style['category__text']}>
                <h2>3Nile Bus</h2>
                <p>Enjoy your journey with more privacy through some private boats.</p>
              </div>

              <div className={style['go_to_contact_us_btn_last']}>
                <NavLink to="last-filter-page/3" className={style['go_to_contact_us_last']}>
                  GO
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homecards;
