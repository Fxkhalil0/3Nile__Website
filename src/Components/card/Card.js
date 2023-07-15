import React,{useSelector} from 'react'
import style from './Card.module.css'
import cardImage from './boat.jpg'
import { NavLink } from 'react-router-dom'
import Loader from '../Loader/Loader';
function Card(props) {
  return (
    <>
    <div className={style["card"]}>
      <NavLink  to={`/Description/${props.data._id}`} state={props.data} >
    <img src={cardImage} alt='boat'/>
    {/* <img src={`http://localhost:5000/${props.data.images[0]}`} alt='boat' /> */}
    <div className={style["header-text"]}>
      <h4>{props.data.name}</h4>
      <h5>{props.data.price} EGP</h5>
    </div>
    <div className={style["card-text"]}>
      <h5>Boat owner</h5>
      <h5>name name</h5>
    </div>
    <div className={style["card-text"]}>
      <h5>type</h5>
      <h5>{props.data.type}</h5>
    </div>
    <div className={style["card-text"]}>
      <h5>number of people</h5>
      <h5>{props.data.numberOfPeople}</h5>
    </div>
    <i className={style["fa-solid fa-ellipsis"]} />
  </NavLink>  
  </div>
  </>
  )
}

export default Card