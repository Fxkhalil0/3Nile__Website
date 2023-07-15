import React from "react";
import style from "./Description.module.css";
import Cardf from "../../Components/card -filter-desc/Card";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTrip,
  getBoatData,
  getCategoryOne,
  getCategoryTwo,
} from "../../redux/slices/UserSlice";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import Rating from "../../Components/Rate/Rating";
// import Loader from "../../Components/Loader/Loader";r

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { motion } from "framer-motion"
//map


import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import { AnimatedPageRight, AnimatedPageleft } from "../AnimatedPages/AnimatedPages";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];


// motion 


const pathVariants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
  },
};
const pathVariant = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
  },
};

// motion end
function Description() {
  const [errorModalOpen, seterrorModal] = React.useState(false);
  const [port, setPort] = useState(null);
  const today = dayjs();
  const twoPM = dayjs().set('hour', 14).startOf('hour');
  const threePM = dayjs().set('hour', 15).startOf('hour');
  const { boat } = useSelector((state) => state.UserSlice);
  const { user } = useSelector((state) => state.UserSlice);
  const param = useParams();
  const loc = useLocation();
  const navigate = useNavigate();

  const { categoryOne } = useSelector((state) => state.UserSlice);
  const { categoryTwo } = useSelector((state) => state.UserSlice);
  const [category, setCategory] = useState('')

  let maps = [<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.64885241202975!2d32.89309529012126!3d24.08807095701121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x143664b22707f779%3A0xd578c290c8f02b91!2sKFC%20-%20Aswan!5e0!3m2!1sen!2seg!4v1687172127479!5m2!1sen!2seg" width="800" height="600" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    ,
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.177281877451!2d32.89426337582956!3d24.095260278436683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x143664b56f6856e9%3A0x493d6a2548d658b9!2sMcDonald&#39;s!5e0!3m2!1sen!2seg!4v1687172747619!5m2!1sen!2seg" width="800" height="600" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    ,
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d557.3219217645001!2d32.89021266972718!3d24.08504527073065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x143665632399e103%3A0xabe224c154140b!2sFerry%20Boat%20Aswan%20Museum!5e0!3m2!1sen!2seg!4v1687172849457!5m2!1sen!2seg" width="800" height="600" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  ]
  console.log(loc.state);
  const [boatDetails, setBoatDetails] = useState(loc.state);
  const [boatReviews, setBoatReviews] = useState(loc.state);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });


    dispatch(getCategoryOne());
    dispatch(getCategoryTwo());

    if (boatDetails.portName == "KFC") {
      setPort(maps[0])
    } else if (boatDetails.portName == "MAC") {
      setPort(maps[1])
    } else {
      setPort(maps[2])
    }
  }, []);

  // const { boatDetails } = useSelector(state => state.UserSlice)

  // const {loading} = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();

  // Booking Succussfull Modal
  const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);
  const [message, SetMessage] = useState("");

  function openSuccussfullModal() {
    setSuccussfullmodal(true);
  }
  function succussfullmodalClose() {
    setSuccussfullmodal(false);
  }
  // Booking Succussfull Modal End
  // Booking Err Modal 
  function openErrorModal() {
    seterrorModal(true);
  }
  function closeErrorModal() {
    seterrorModal(false);
  }
  // Booking Err Modal End
  useEffect(() => {
    // console.log("deuhedhudeuhedhuedhu");
    dispatch(getBoatData(param.id)).then((res) => {
      let boatRev = res.payload
      setBoatReviews(boatRev)
    })
    // console.log("object");
    // [dispatch, param.id]
    setBoatDetails(loc.state);
    setCategory(loc.state.category)
  }, [loc.state]);

  const [value, setValue] = useState();

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  // let BookingSchema = Yup.object().shape({
  //   email: Yup.string().min(10, "must be moro than 10").
  //             email().required("must be required"),
  //           password: Yup.string().min(8, "must be lower then 20").
  //       required("must be lower then 20"),

  //     })

  const BookingFormik = useFormik({
    initialValues: {
      date: "",
      startTime: "",
      hours: "",
    },
    // validationSchema: BookingSchema,
    onSubmit: (values) => {
      console.log(time);
      console.log(values);
      let val = { ...values, startTime: time }
      console.log(val, "Final Values");
      if (user) {
        let id = user.userData._id;
        let boatId = param.id;
        dispatch(addTrip({ ...val, id: id, boatId: boatId })).then((res) => {
          console.log(res);
          if (res.payload.status === 200) {
            openSuccussfullModal();
            SetMessage(res.payload.message);
            setTimeout(() => {
              succussfullmodalClose();
            }, 2000);
          }
          else if (res.payload.status === 201) {
            openErrorModal();
            SetMessage(res.payload.message);
            setTimeout(() => {
              closeErrorModal();
            }, 2000);
          }
        });
      } else {
        openErrorModal();
        SetMessage("Sorry , You Have To Login First");
        setTimeout(() => {
          closeErrorModal();
          navigate("/login-signup");
        }, 3000);
      }
    },
  });

  return (
    <>
      <Modal
        isOpen={errorModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeErrorModal}
        className={style["error-modal"]}

      >


      
      <div className={style["error"]} variant="filled" severity="error" style={{width:'80%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <motion.path
            d="M20 20 L80 80 M80 20 L20 80"
            fill="transparent"
            stroke="red"
            strokeWidth="4"
            strokeLinecap="round"
            variants={pathVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1 }}
          />
        </svg>
   <div className={style["succussfull_massage"]}>  {message}</div> 
    </div>


      </Modal>


      <AnimatedPageleft>

        <div className={style["boat-description"]}>
          <div className={style["container"]}>
            <div className={style["boat-description__content"]}>
              <div className={style["boat-description__image"]}>
                <div className="App">
                  <Carousel breakPoints={breakPoints}>
                    {/* <Item><img style={{width: '100%'}} src={"../../../../3Nile-backend/uploads/24b8135e-54c4-496f-937f-f2e373acc0c4.jpg"} alt=''/></Item> */}

                    {boatDetails.images.map((imageUrl) => {
                      // console.log(imageUrl);
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

                <Modal
                  isOpen={succussfullmodalOpen}
                  // onAfterOpen={afterOpenModal}
                  onRequestClose={succussfullmodalClose}
                  className={style["succussfull-modal"]}
                >
                <div className={style["succussfull"]} variant="filled" severity="success" style={{width:'90%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                   <motion.path
                     d="M10 50 L40 80 L90 20"
                     fill="transparent"
                     stroke="green"
                     strokeWidth="4"
                     variants={pathVariants}
                     initial="initial"
                     animate="animate"
                     transition={{ duration: 1 }}
                   />
                 </svg>
   <div className={style["succussfull_massage"]}>{message}</div> 
    </div>
                </Modal>
              </div>

              <div className={style["boat-description__info_con"]}>
                <div className={style["boat-description__info"]}>
                  <h3>{boatDetails.name}</h3>
                  <h4>Price Per Hour : {boatDetails.price}</h4>
                  <p>{boatDetails.description}</p>
                  <div className={style["boat-description__icons"]}>
                    <i className="fa-solid fa-ship" />
                    <i className="fa-solid fa-sailboat" />
                    <i className="fa-solid fa-anchor" />
                    <i className="fa-solid fa-ferry" />
                  </div>

                  <div className={style['rate']}>
                    <h4 style={{ marginBottom: "10px", fontSize: "28px" }}>
                      Rates:
                      {/* boatDetails.averageRating */}
                    </h4>
                    <h4 style={{ paddingleft: '80px;' }}>
                      <Rating style={{ paddingtop: "20px;" }} rating={boatReviews?.averageRating || 0} />
                    </h4>
                  </div>

                  <h4 style={{ paddingTop: "15px" }}>
                    Number Of People: <span>{boatDetails.numberOfpeople} </span>
                  </h4>
                  <h4 style={{ paddingTop: "15px" }}>
                    Number OF Reviews: <span>{boatReviews.totalReviews} </span>
                  </h4>

                  <h4 style={{ paddingTop: "15px" }}>
                    Boat Type : <span>{boatDetails.type} </span>
                  </h4>
                  <h4 style={{ paddingTop: "15px" }}>
                    Port Name : <span>{boatDetails.portName} </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedPageleft>



      <div className={style["technical-features"]}>
        <AnimatedPageRight>

          <div className={style["container"]}>
            <div className={style["technical-features__content"]}>
              {
                port
              }

              <form
                style={{ width: "40%" }}
                onSubmit={BookingFormik.handleSubmit}
              >
                <div className={style["booking_form"]}>
                  <h3>Booking now</h3>

                  <label htmlFor="">Date</label>
                  <div className={style["card_flex_justify_content_center"]}>
                    <Calendar
                      placeholder="choose a date"
                      style={{ padding: "20px", height: "80px", width: "90%" }}
                      required
                      name="date"
                      value={date}
                      onValueChange={(e) =>
                        setDate(e.value.toString().split("T")[0])
                      }
                      showIcon
                      onChange={BookingFormik.handleChange}
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <label htmlFor="">Start Time</label>
                    <DemoContainer
                      sx={{ height: "80px", width: "90%" }}
                      components={[

                        'MobileTimePicker',


                      ]}
                    >



                      <DemoItem  >

                        <MobileTimePicker
                          onChange={(value) => {
                            const timeZone = 'Africa/Cairo';
                            console.log(value["$d"]);
                            const adjustedTime = value["$d"].toLocaleString({ timeZone });
                            console.log(adjustedTime,
                              'nnhj');
                            setTime(adjustedTime);
                          }}
                          sx={{ background: 'white', color: 'black' }}
                        />
                      </DemoItem>


                    </DemoContainer>
                  </LocalizationProvider>
                  {/* <label htmlFor="">Start Time</label>
                <Calendar
                  placeholder="choose your start time"
                  style={{ padding: "20px", height: "80px", width: "90%" }}
                  required
                  name="startTime"
                  value={time}
                  onValueChange={(e) => {
                    setTime(e.value);
                  }}
                  timeOnly
                  showTime
                  hourFormat="12"
                  onChange={BookingFormik.handleChange}
                /> */}

                  <label htmlFor="">Hours</label>
                  <input
                    style={{ width: "84%", borderRadius: "8px", margin: "20px" }}
                    id="outlined-number"
                    label="Number"
                    type="number"
                    name="hours"
                    required
                    placeholder="choose an Hour"
                    onChange={BookingFormik.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <div className={style["Add_Trip"]}>
                    <button
                      className={style["Add_Trip_btn"]}
                      onClick={() => {
                        console.log(boatDetails);
                      }}
                      type="submit"
                    >
                      Click
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </AnimatedPageRight>
      </div>





      <div className={style["container"]}>
        <div className={style["fd_card_container"]}>
          <h3 className={style["similar-boats"]}>similar boats</h3>
          <div className={style["felxyyy"]}>
            <div />
            {
              category === "3nile" &&
              categoryOne.filter((item) => item._id !== boatDetails._id)
                .slice(0, 3)
                .map((item) => {
                  return <Cardf key={item.id} data={item} />;
                })
            }


            {
              category === '3nile vip' &&
              categoryTwo
                .filter((item) => item._id !== boatDetails._id)
                .slice(0, 3)
                .map((item) => {
                  return <Cardf key={item.id} data={item} />;
                })
            }

          </div>
        </div>
      </div>
    </>
  );
}
export default Description;
