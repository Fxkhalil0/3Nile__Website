import React, { useEffect, useState } from 'react'
import style from '../card2/Card.module.css'
import cardImage from '../card2/boat.jpg'
import heart from '../card2/heart-fill.png'
import heartOutline from '../card2/heart-outline.png'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { OwnerdeleteBoat } from '../../redux/slices/UserSlice'
import { useSelector } from "react-redux";
import { getOwnerBoats } from '../../redux/slices/UserSlice'
import { addReview, canceltrip, pendingTrips, finishedTrips } from '../../redux/slices/UserSlice'
import { FaStar } from "react-icons/fa"
import { convertToAmPm,formatDate, formatTime } from '../../Services/functions';

function UserCard({ data }) {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.UserSlice)
  const [disabled, setDisabled] = useState(false)
  function rate(boatId, tripId, ratingValue) {
    setRating(ratingValue)
    dispatch(addReview({ boatId: boatId, clientId: user.userData._id, tripId: tripId, rate: ratingValue })).then(() => {
      setDisabled(!disabled)
      dispatch(finishedTrips({ id: user?.userData._id }))
    }
    )
  }
  function cancel(id) {
    dispatch(pendingTrips({ id: user?.userData._id }))
    dispatch(canceltrip(id)).then(() => dispatch(pendingTrips({ id: user.userData._id })))
  }

  useEffect(() => {

    dispatch(finishedTrips({ id: user?.userData._id }))

  }, []);



  return (
    
    <>
    
      <div className={style["card-list"]}>
        <article className={style["card"]}>
          <figure className={style["card-image"]}>
            <img src={`http://localhost:5000/${data?.boatId?.images[0]}`} />
          </figure>
          <div className={style["card-header"]}>

            <div className={style["card-text"]}>
              <h4>Name:</h4>
              <h5>{data?.boatId?.name}</h5>
            </div>



            {/* <h4>{data.price} </h4> */}

            <div className={style["icon-rate"]}>
              {
                data?.tap == "finished" && (
                  !data?.rate ?
                    [...Array(5)].map((star, i) => {
                      const ratingValue = i + 1
                      return <label>
                        <input className={style["radio"]}
                          type='radio' name='rating'
                          onClick={() => rate(data?.boatId?._id, data?._id, ratingValue)} />
                        <FaStar color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                          className={style["star"]} size={40} />
                      </label>
                    })
                    // <FaStar size={40} />
                    // <input type='number' min={1} max={5} disabled ={disabled} onChange={(e)=>{rate(data.boatId._id , data._id,e) }}/>
                    :
                    // [...Array(5)].map((star , i) => {
                    //   // const ratingValue = data.rate.rating + 1
                    //   return 

                    //           <FaStar color={  data.rate.rating ? "#ffc107" : "#e4e5e9"}

                    //            className={style["star"]} size={40} /> 

                    // }

                    [...Array(5)].map((star, i) => {
                      const ratingValue = i + 1

                      return <label>

                        <FaStar color={ratingValue <= data?.rate?.rating ? "#ffc107" : "#e4e5e9"}

                          className={style["star"]} size={40} />
                      </label>
                    })
                )
                //)     

              }
            </div>
          </div>
          <div className={style["card-footer"]}>
            <div className={style["card-meta card-meta--views"]}>
              <div className={style["card-text"]}>
                <h4>Price:</h4>
                <h5>{data.price} EGP</h5>
              </div>
            </div>
            <div className={style["card-meta"]}>
            <h4 style={{paddingRight:"30px",
              paddingLeft:"20px"}}>At:</h4>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
                <rect x={2} y={4} width={20} height={18} rx={4} />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M2 10h20" />
              </svg>
              {/* <h5>{data.date}</h5> */}
              <h5 style={{fontSize:"17px",paddingLeft:"10px"}}>{formatDate(data?.startTime)}</h5>    
              <h5 style={{fontSize:"17px",paddingLeft:"10px"}}>{formatTime(data?.startTime)}</h5>
            </div>

            {
              data?.tap == "pending" &&
              <Button type="button" onClick={() => cancel(data?._id)} className={style["btn-swvll"]}>cancel</Button>
            }

          </div>
        </article>
      </div>
    </>
  )
}

export default UserCard