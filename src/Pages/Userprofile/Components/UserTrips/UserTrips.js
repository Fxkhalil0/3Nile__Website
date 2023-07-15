import React from 'react';
import style from '../UserTrips/userTrips.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import UserCard from '../../../../Components/UserCard/UserCard';
import { pendingTrips, acceptedTrips, finishedTrips } from '../../../../redux/slices/UserSlice';

function UserTrips() {
  const [tap, setTap] = useState('accepted');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserSlice);
  const { accepted } = useSelector((state) => state.UserSlice);
  const { finished } = useSelector((state) => state.UserSlice);
  const { pending } = useSelector((state) => state.UserSlice);

  useEffect(() => {
    dispatch(finishedTrips({ id: user.userData._id }));
    dispatch(acceptedTrips({ id: user.userData._id }));
    dispatch(pendingTrips({ id: user.userData._id }));
  }, []);

  function pend() {
    setTap('pending');
  }

  function accep() {
    setTap('accepted');
  }

  function prev() {
    setTap('finished');
  }

  return (
    <>
      <section>
        <div className={style['user-trips']}>
          <div className={style['container']}>
            <div className={style['trips-nav']}>
              <div className={style['trips-nav-buttons']}>
                   <div className={style['previous-trips']}>
                  <button

          className={ tap === 'accepted'  ? style["activeLink"] : ''}
                    

                   onClick={accep}
                  >
                    Accepted Trips
                  </button>
                </div>
                <div className={style['previous-trips']}>
                  <button
                  className={ tap === 'finished'  ? style["activeLink"] : ''}


                    onClick={prev}
                  >
                    Previous Trips
                  </button>
                </div>
                <div className={style['previous-trips']} 
                
                            >
                  <button
                   className={ tap === 'pending'  ? style["activeLink"] : ''}

                    onClick={pend}
                  >
                    Pending Trips
                  </button>
                </div>
             
              </div>
            </div>
            <div className={style['user-trips-cards']}>
              <div className={style['cards']}>
                {tap === 'pending' &&
                  pending?.map((item) => {
                    return <UserCard key={item?.id} data={{ ...item, tap: tap }} />;
                  })}
                {tap === 'accepted' &&
                  accepted?.map((item) => {
                    return <UserCard key={item?.id} data={{ ...item, tap: tap }} />;
                  })}
                {tap === 'finished' &&
                  finished?.map((item) => {
                    return <UserCard key={item?.id} data={{ ...item, tap: tap }} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserTrips;
