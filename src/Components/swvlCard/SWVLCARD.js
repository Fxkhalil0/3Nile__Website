import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import cardImage from "./boat.jpg";
import heart from "./heart-fill.png";
import heartOutline from "./heart-outline.png";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { OwnerdeleteBoat, SwvlDetails } from "../../redux/slices/UserSlice";
import { useSelector } from "react-redux";
import { getOwnerBoats } from "../../redux/slices/UserSlice";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
function SWVLCARD({ data }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={style["card-list"]}>
        <article className={style["card"]}>
          <figure className={style["card-image"]}>
            <img src={`http://localhost:5000/${data?.item?.boat.images[0]}`} />
          </figure>
          <div className={`${style["card-header"]} ${style["card-text"]}`}>
            <h4>Date:</h4>
            <h5>2023-06-20</h5>
            {/* {data.item.date} */}
            <h4>Available Seats:</h4>
            <h5>{data?.item?.availableSeats}</h5>
          </div>

          <div className={style["card-footer"]}>
            <div className={style["card-meta card-meta--views"]}>
              <div className={style["card-text"]}>
                <h4>Port:</h4>
                <h5 style={{ paddingRight: '35px' }}>{data?.item?.port}</h5>
              </div>

              <div className={style["card-text"]}>
                <h4>Target Place:</h4>
                <h5>{data?.item?.targetPlace}</h5>
              </div>
            </div>
            <div className={style["card-meta card-meta--date"]}>
              <div className={style["card-text"]}>
                <h4>Price:</h4>
                <h5 style={{ paddingRight: '25px' }}>{data?.item?.priceForTrip} EGP</h5>
              </div>
            </div>
          </div>
          <div>
            <NavLink to={`/swvlTripDetails/${data?.item?._id}`}>
              <Button
                className={style["card-btn"]}
                onClick={() => {
                  dispatch(SwvlDetails(data?.item?._id)).then(() => { });
                }}
              >
                Show Details
              </Button>
            </NavLink>
          </div>
        </article>
      </div>
    </>
  );
}

export default SWVLCARD;
