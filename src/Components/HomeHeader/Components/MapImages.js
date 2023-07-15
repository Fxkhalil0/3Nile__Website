import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './HomeHeader.module.css';
import map1 from '../assets/map_1.png';

function MapImages() {
  const [showAnimation, setShowAnimation] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowAnimation(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.maps} ref={containerRef}>
      {showAnimation ? (
        <>
          <motion.img
            src={map1}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 6 + 1.2,
              type: 'tween',
              duration: 0.5,
            }}
            className={styles.image}
          />
          <motion.img
            src={map1}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 6 + 1.2,
              type: 'tween',
              duration: 0.5,
            }}
            className={styles.image2}
          />
        </>
      ) : (
        <>
          <img alt='' src={map1} className={styles.image} />
          <img alt='' src={map1} className={styles.image2} />
        </>
      )}
    </div>
  );
}

export default MapImages;
