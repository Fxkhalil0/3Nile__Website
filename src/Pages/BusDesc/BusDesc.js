import React from 'react'
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import style from "../DescComponent/Description.module.css";

import { useParams,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect , useState } from 'react'
import { useDispatch } from 'react-redux'
import {  bookSwvl  } from '../../redux/slices/UserSlice'
import Carousel from "react-elastic-carousel";
import Item from "../DescComponent/item";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";    
import Barcode from 'react-barcode';
import styles from "./desc.module.css"
import { FaChair } from 'react-icons/fa';
import Seats from '../../Components/Seats/Seats';
import boatseats from './swvlboatnew.png'
import { convertToAmPm, formatDate } from '../../Services/functions';
import axios from 'axios';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
];
function BusDesc() {

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const { swvlRecit } = useSelector(state => state.UserSlice)
    const { bookedSeats } = useSelector(state => state.UserSlice)
    const { user } = useSelector(state => state.UserSlice)
    const [seats , setSeats] = useState(0)
    const [swvls , setSwvl] = useState(swvlRecit)
    function seat(e){
        setSeats(e.target.value)
    }
function book(id){
    dispatch(bookSwvl({swvlId:id,userId:user.userData._id,numberOfSeats:bookedSeats})).then((res)=>{
      setavailable(res.payload.data.TripDetails.swvlDetails.availableSeats)
     console.log(res.payload.data.TripDetails.swvlDetails.availableSeats

      ,"cxzcxcvbcxb")
    })
    handleOpen()
    // dispatch(getSwvl())
    // console.log(swvlRecit.TripDetails.numberOfSeats)
}
    const param = useParams();
    const loc=useLocation();
  
  
  
  
   
    
    const [boatDetails,setBoatDetails]=useState(loc.state);
    // const {loading} = useSelector((state) => state.UserSlice);
    const dispatch =useDispatch()
  

    
  
  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    axios.get(`http://localhost:5000/user/boat/${loc.state.boat._id}`).then(res=>{
      console.log(res,"boat data")
    })
    setBoatDetails(loc.state);  
  },[boatDetails]);
  
  

  const seatss = [];
  for (let i = 0; i < boatDetails.boat.numberOfpeople/4; i++) {
    seatss.push(<><label className={styles["label"]} HtmlFor={i}><FaChair key={i} /></label > <input type="checkBox" id={i} className={styles["box"]}></input></>);
  }
  const [available , setavailable] = useState(boatDetails?.availableSeats)

  return (
    <> 
     
    <div  className={style["boat-description"]}>
      <div className={style["container"]}>
        <div  className={style["boat-description__content"]}>
          <div className={style["boat-description__image"]}>
   
          <div className="App">
          <Carousel breakPoints={breakPoints}>
            
            
            
            {
              boatDetails?.boat?.images.map((imageUrl)=>{
              
                return  <Item><img style={{width: '100%'}} src={`http://localhost:5000/${imageUrl}`} alt=''/></Item>
              })
            }
           
            
          
          </Carousel>
        </div>
  
          </div>
          <div className={style["boat-description__info_con"]}>
          <div  className={style["boat-description__info"]}>
            <h3>{boatDetails?.name}</h3>
            <h4>
              Price Per Hour : {boatDetails?.priceForTrip}
            </h4>
            <p>
             {boatDetails?.description}
            </p>
            <div  className={style["boat-description__icons"]}>
              <i className="fa-solid fa-ship" />
              <i  className="fa-solid fa-sailboat" />
              <i  className="fa-solid fa-anchor" />
              <i className="fa-solid fa-ferry"/>
            </div>    
            <h4 style={{paddingTop:"15px"}}>
            Target Place : <span>{boatDetails?.targetPlace} </span>
            </h4>
            
            <h4 style={{paddingTop:"15px"}}>
              Date: <span>{formatDate(boatDetails?.date)} </span>
            </h4>
            <h4 style={{paddingTop:"15px"}}>
            Time: <span>{convertToAmPm(boatDetails?.time)} </span>
            </h4>
            <h4 style={{paddingTop:"15px"}}>
            Port: <span>{boatDetails?.port} </span>
            </h4>
            <h4 style={{paddingTop:"15px"}}>
            Number Of Seats: <span>20 </span>
            </h4>
            <h4 style={{paddingTop:"15px"}}>
            Available Seats: <span>{available} </span>
            </h4>
           
           
          </div>
          </div>
        </div>
      </div>
    </div>
    <div  className={style["technical-features"]}>
      <div  className={style["container"]}>
        <div className={style["technical-features__content"]}>
            {
                boatDetails?.port == "KFC" &&
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.3800379538925!2d32.895774823886775!3d24.088127275725544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x143664b22707f779%3A0xd578c290c8f02b91!2z2YPZhtiq2KfZg9mK!5e0!3m2!1sar!2seg!4v1686489060005!5m2!1sar!2seg" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            }
            {
                boatDetails?.port == "MAC" &&
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.177281877451!2d32.89426337582956!3d24.095260278436683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x143664b56f6856e9%3A0x493d6a2548d658b9!2sMcDonald&#39;s!5e0!3m2!1sen!2seg!4v1687172747619!5m2!1sen!2seg" width="800" height="600" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              }
        
<div className={style["seats"]}>
  <img className={style["seats_img"]} src={boatseats}/>
<Seats state={boatDetails}/>
<input type='submit' value='book' className={styles["seats_book"]} onClick={()=>
  
  book(boatDetails?._id)}
  
  
  
  />
</div>
    {/* <div className={style["seats"]}>
      <div className={styles["top"]}>
        <h4>please select a seat</h4>
      </div>
      <div className={styles["seats"]}>
     
      <div className={styles["row-container"]}>

<div className={styles["first-row"]}>
{
seatss
}
</div>
<div className={styles["second-row"]}>
{
seatss
}
</div>
</div>
            <div className={styles["row-container"]}>

            <div className={styles["third-row"]}>
            {
            seatss
            }
            </div>
      <div className={styles["forth-row"]}>
            {
            seatss
            }
            </div>
            </div>
      </div>
            <input type='number' onChange={(e)=>seat(e)}  />
            <button onClick={()=>book(boatDetails._id)}>Book</button>
    </div> */}
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={style["contentt"]}
      >
        <Box sx={style}>
          <div className={style.discModal}>
          {
            swvlRecit?.message? (
              <div>

              
              
            
              <h1 className={style["titleModal"]}>{swvlRecit?.message}</h1>
              <h1 className={style["titleModal"]}>Number Of Seats: {swvlRecit?.TripDetails?.numberOfSeats}</h1>
              <h1 className={style["titleModal"]}>Date: {formatDate(swvlRecit?.TripDetails?.swvlDetails?.date)}  AT: {convertToAmPm(boatDetails?.time)}</h1>
              <h1 className={style["titleModal"]}>Port: {swvlRecit?.TripDetails?.swvlDetails.port}</h1>
              <h1 className={style["titleModal"]}>Price: {swvlRecit?.TripDetails?.TotalPrice} EGP</h1>
              <h1 className={style["titleModal"]}>targetPlace: {swvlRecit?.TripDetails?.swvlDetails?.targetPlace}</h1>
              <div>
      <Barcode  height={90} margin={20} format="code39" value={swvlRecit?.TripDetails?.bookingBarcode} />
    </div>
              </div>
            ):( <h1 className={style["titleModal"]}>{swvlRecit?.error}</h1>
            )
          }
          </div>
       
        </Box>
      </Modal>
        
        </div>
      </div>
    </div>
   
        
  </>
  
  )
}

export default BusDesc