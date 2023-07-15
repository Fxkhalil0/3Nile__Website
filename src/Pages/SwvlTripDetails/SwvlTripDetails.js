import React from "react";
import style from "./swvl.module.css";
import Carousel from "react-elastic-carousel";

import Item from "../DescComponent/item";

import Rating from "../../Components/Rate/Rating";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SwvlDetails ,getSwvl,loading} from "../../redux/slices/UserSlice";
import Splash from "../../Components/SplashComponent/Splash";
import {formatDate ,convertToAmPm} from '../../Services/functions'
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function SwvlTripDetails() {
    const [isComed,setisComed]=useState(false)
  const dispatch = useDispatch();
  const { swvlTrip } = useSelector((state) => state.UserSlice);
  const { loading } = useSelector((state) => state.UserSlice);
    console.log(swvlTrip,"fff");
    
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow: 1 },
        { width: 1200, itemsToShow: 1 },
      ];
      useEffect(()=>{

        socket.on("Swvl-booked", (data)=>{
          dispatch(SwvlDetails(swvlTrip?._id))  
        
        })
        console.log(swvlTrip.bookingInfo)
        if(swvlTrip.bookingInfo){
          setisComed(true)
          console.log(isComed,"isCcccco")

        }else{
          setisComed(false)
          console.log(isComed,"isCccdddcco")

        }
      },[isComed])
    return (
    <>
   {

    loading ? <Splash/> 
    :
    (

      <>
      
      <div className={style["boat-description"]}>
        <div className={style["container"]}>
          <div className={style["boat-description__content"]}>
            <div className={style["boat-description__image"]}>
              <div className="App"></div>
              <Carousel breakPoints={breakPoints}>
                  {/* <Item><img style={{width: '100%'}} src={"../../../../3Nile-backend/uploads/24b8135e-54c4-496f-937f-f2e373acc0c4.jpg"} alt=''/></Item> */}

                  {
                    
                  swvlTrip?.boat?.images?.map((imageUrl) => {
                    console.log(imageUrl);
                    return (
                      <Item>
                        <img
                          style={{ width: "100%" }}
                          src={`http://localhost:5000/${imageUrl}`}
                          alt=""
                        />
                      </Item>
                    );
                  })}
                </Carousel>
            </div>
            <div className={style["boat-description__info_con"]}>
              <div className={style["boat-description__info"]}>
                <h3>{swvlTrip?.boat.name}</h3>

                <h4>Trip Time : {convertToAmPm(swvlTrip?.time)}</h4>
                <h4>Trip Date : {formatDate(swvlTrip?.date)}</h4>
                {/* {swvlTrip?.date} */}

                <div className={style["boat-description__icons"]}>
                  <i className="fa-solid fa-ship" />
                  <i className="fa-solid fa-sailboat" />
                  <i className="fa-solid fa-anchor" />
                  <i className="fa-solid fa-ferry" />
                </div>


               
                <h4 style={{ marginBottom: "15px", fontSize: "20px" ,paddingTop: "20px;" }}>Port : {swvlTrip?.port}</h4>
                <h4 style={{ marginBottom: "15px", fontSize: "20px" ,paddingTop: "20px;" }}>Target Place : {swvlTrip?.targetPlace}</h4>
                <h4 style={{ paddingTop: "15px" }}>
                  Available Seats: <span>{swvlTrip?.availableSeats} </span>
                </h4>

                <h4 style={{ paddingTop: "15px" }}>
                  Price: <span>{swvlTrip.priceForTrip} EGP</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style["technical-features"]}>
        <div className={style["container"]}>
          <div className={style["technical-features__content"]}>
            <div style={{ paddingTop: "100px" }} className={style["technical"]}>
              <h2 style={{ fontSize: "40px" }}>Trip Booking Info</h2>

                { isComed ?
                
               
                    swvlTrip?.bookingInfo.map((item) => {
                        console.log(item);
                        return (
                            <div className={style["row"]}>
                <div className={style["item"]}>
                  <h4 style={{ fontSize: "30px" }}>Barcode </h4>
                  <h5 style={{ fontSize: "20px" }}>{item?.Barcode}</h5>
                </div>
                <div className={style["item"]}>
                  <h4 style={{ fontSize: "30px" }}>Number Of Seats:</h4>
                  <h5 style={{ fontSize: "20px" }}>{item?.numberOfSeats}</h5>
                </div>
                <div className={style["item"]}>
                  <h4 style={{ fontSize: "30px" }}>Price:</h4>
                  <h5 style={{ fontSize: "20px" }}>{item?.price}</h5>
                </div>
              </div>
                        );
                      }):
                      
                     ( <div>No one Booked Yet</div>)
                      }

             
             
            
            </div>

        
          </div>
        </div>
      </div>
      </>      
    )
                    }
    </>
  );
}

export default SwvlTripDetails;
