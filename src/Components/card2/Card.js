import React, { useEffect, useState } from 'react'
import style from './Card.module.css'
import cardImage from './boat.jpg'
import heart from './heart-fill.png'
import heartOutline from './heart-outline.png'
import { NavLink } from 'react-router-dom'
import { Alert, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { OwnerdeleteBoat, getOwnerCurrentTrips, getOwnerRequests } from '../../redux/slices/UserSlice'
import { useSelector } from "react-redux";
import { getOwnerBoats } from '../../redux/slices/UserSlice'
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-modal";
import Detailsstyle from "../../Pages/BoatDetials/BoatDetials.module.css";
import { motion } from "framer-motion"
import CloseIcon from "@mui/icons-material/Close";
import { formatTime } from '../../Services/functions';
function Card({ data }) {
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

  console.log(data, "requessss")
  let subtitle;
  const [boatId, setBoatId] = useState(data.item._id)
  const { boatOwner } = useSelector(state => state.UserSlice)
  const [id, setId] = useState(data._id)
  const [ownerId, setOwnerId] = useState(boatOwner.boatOwnerData._id)
  const [boats, setBoats] = useState([]);
  const dispatch = useDispatch()

  const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);
  const [message, SetMessage] = useState("")
  function openSuccussfullModal() {
    setSuccussfullmodal(true);
  }
  function succussfullmodalClose() {
    setSuccussfullmodal(false);
  }
  useEffect(() => {
    setBoatId(data.item._id)
  },)

  //for the button to be shown or not shown.
  function deleteBoat() {
    console.log("Deleted");
    dispatch(OwnerdeleteBoat({ id: id, ownerId: ownerId }));
    dispatch(getOwnerBoats(boatOwner.boatOwnerData._id)).then((data) => {
      console.log(data.payload, "After Delete");

    }).catch((err) => {

    });
  }


  function acceptTrip(id) {
    axios
      .put("http://localhost:5000/boatOwner/acceptTrip", { id: id }).then((res) => {
        dispatch(getOwnerRequests(boatOwner.boatOwnerData._id))
        SetMessage(res?.data.message)
        openSuccussfullModal()
        setTimeout(() => {
          succussfullmodalClose()
        }, 2000)
        console.log(res);
      })

  }
  function cancelTrip(id) {
    axios
      .put("http://localhost:5000/boatOwner/cancelTrip", { id: id }).then((res) => {
        dispatch(getOwnerRequests(boatOwner.boatOwnerData._id))

        SetMessage(res?.data.message)
        openSuccussfullModal()
        setTimeout(() => {
          succussfullmodalClose()
        }, 2000)
        console.log(res);
      })

  }
  function finishTrip(id) {
    axios
      .put("http://localhost:5000/boatOwner/finishTrip", { id: id }).then((res) => {
        dispatch(getOwnerCurrentTrips(boatOwner.boatOwnerData._id));

        SetMessage(res?.data.message)
        openSuccussfullModal()
        setTimeout(() => {
          succussfullmodalClose()
        }, 2000)
        console.log(res);
      })

  }
  const like = 193;
  const isLiked = true;





  // Modal Add Swvl Trip -- >>

  const [addTripIsOpen, setAddTripIsOpen] = React.useState(false);
  function openAddTripModal() {
    setAddTripIsOpen(true);
  }



  function closeAddTripModal() {
    setAddTripIsOpen(false);
  }


  const Schema = Yup.object().shape({
    port: Yup.string().required("Required"),
    targetPlace: Yup.string().required("Required"),

  });

  const formik = useFormik({
    initialValues: {
      time: "",
      date: "",
      port: "",
      targetPlace: "",
      priceForTrip: "",
      boatId: boatId

    },
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("time", values.time);
      formData.append("date", values.date);
      formData.append("price", values.price);
      formData.append("port", values.port);
      formData.append("targetPlace", values.targetPlace);
      formData.append("priceForTrip", values.priceForTrip);
      formData.append("boatId", boatId);
      // Upload Images For Boat



      axios
        .post("http://localhost:5000/swvl/AddTrip",
          { ...values, boatId: boatId })
        .then((res) => {
          console.log(res);
          SetMessage(res?.data.message)
          openSuccussfullModal()
          setTimeout(() => {
            succussfullmodalClose()
          }, 2000)

          closeAddTripModal()
        }
        )
    }
    ,
    onChange: (value) => {
      console.log(value);
    },
    validationSchema: Schema,
  });

  console.log(data.item, "Item");
  return (
    <>



      {/* SuccessFull Modal */}
      <div>


        <Modal
          isOpen={succussfullmodalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={succussfullmodalClose}
          className={Detailsstyle["succussfull-modal"]}

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


      {/* SuccessFull Modal End*/}
      {/* // Modal Add Swvl Trip -- >> */}

      <div>
        <Modal
          isOpen={addTripIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeAddTripModal}
          className={style["content"]}
          contentLabel="Example Modal"
        >
          <div className={style["discModal"]}>
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className={style["titleModal"]}
            >
              Add 3Nile Bus Trip
            </h2>
            <CloseIcon
              onClick={closeAddTripModal}
              className={style["closeModal"]}
            ></CloseIcon>
            <hr />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={style["form_group"]}>
              <div className={style.form_input}>
                <h5 className={style["labelModal"]}>Trip Time</h5>

                <input
                  name="time"
                  type="time"
                  className={style["inputModal"]}
                  onChange={formik.handleChange}
                />
              </div>

              {/* <button type="button" className={style['btn btn-danger btn-block']} onClick={uploadFiles}>
                Upload
              </button> */}
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Trip Date</h5>
              <input
                name="date"
                type="date"
                onChange={formik.handleChange}
                className={style["inputModal"]}
              />
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Price For Person</h5>

              <input
                name="priceForTrip"
                type="number"
                className={style["inputModal"]}
                onChange={formik.handleChange}
              />
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Port</h5>
              <select
                name="port"
                className={style["inputModal"]}
                onChange={formik.handleChange}
              >
                <option value="">Select a port</option>
                <option value="KFC">KFC</option>
                <option value="MAC">MAC</option>
                <option value="Mahata">Mahata</option>
              </select>
            </div>


            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Target Place</h5>
              <input
                name="targetPlace"
                type="text"
                className={style["inputModal"]}
                onChange={formik.handleChange}
              />
            </div>


            <div className={style['form_btn_container']}>
              <button className={style['form_btn']} onClick={closeAddTripModal}>
                cancel
              </button>
              <button className={style['form_btn']} type="submit" value={"Submit"}>Add</button>
            </div>
          </form>
        </Modal>
      </div>

      {/* // Modal Add Swvl Trip End-- >> */}


      <div className={style["card-list"]}>
        <article className={style["card"]}>
          {
            data?.status === 'all' &&
            <>

              <figure className={style["card-image"]}>
                <img src={`http://localhost:5000/${data?.item?.images[0]}`} />
              </figure>
              <div className={style["card__container"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-text"]}>
                    <h4>Name:</h4>
                    <h5>{data?.item.name}</h5>
                  </div>

                  <div className={style["card-text"]}>
                    <h4>Price:</h4>
                    <h5>{data?.item.price} EGP</h5>
                  </div>

                </div>
                <div className={style["card-footer"]}>
                  <div className={style["card-meta card-meta--views"]}>
                    <div className={style["card-text"]}>
                      <h4>Type:</h4>
                      <h5>{data?.item.type}</h5>
                    </div>
                  </div>
                  <div className={style["card-meta card-meta--date"]}>

                    <div className={style["card-textt"]}>
                      <h4>Number Of People:</h4>
                      <h5 style={{ paddingRight: '20px' }}>{data?.item.numberOfpeople}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </>

          }


          {
            data?.status === 'pending' &&
            <>



              <figure className={style["card-image"]}>
                <img src={`http://localhost:5000/${data?.item?.boatId?.images[0]}`} />
              </figure>
              <div className={style["card__container"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-text"]}>
                    <h4>Name:</h4>
                    <h5>{data?.item?.boatId?.name}</h5>
                  </div>
                  <div className={style["card-text"]}>
                    <h4>Hours:</h4>
                    <h5>{data?.item?.hours}</h5>
                  </div>



                </div>
                <div className={style["card-content"]}>

                  <div className={style["card-footer"]}>
                    {/* <div className={style["card-meta card-meta--views"]}> */}

                    <div className={style["card-text-pre"]}>
                      <h4>Start Time:</h4>
                      <h5>{formatTime(data?.item.startTime)}</h5>
                    </div>

                    {/* </div> */}
                    {/* <div className={style["card-meta card-meta--date"]}> */}

                    <div className={style["card-text-pre"]}>
                      <h4>End Time:</h4>
                      <h5>{formatTime(data?.item.endTime)}</h5>
                    </div>

                    {/* </div> */}
                  </div>
                  <div className={style["card-btns"]}>
                    <Button className={style["card-btn-two"]} onClick={() => { acceptTrip(data?.item._id) }}>Accept Trip</Button>
                    <Button className={style["card-btn-two"]} onClick={() => { cancelTrip(data?.item._id) }}>cancelTrip</Button>
                  </div>
                </div>
              </div>
            </>

          }
          {
            data?.status === 'running' &&

            <>




              <figure className={style["card-image"]}>
                <img src={`http://localhost:5000/${data?.item?.boatId?.images[0]}`} />
              </figure>
              <div className={style["card__container"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-text"]}>
                    <h4>Name:</h4>
                    <h5>{data?.item?.boatId?.name}</h5>
                  </div>
                  <div className={style["card-text"]}>
                    <h4>Hours:</h4>
                    <h5>{data?.item?.hours}</h5>
                  </div>
                </div>


                <div className={style["card-footer"]}>
                  {/* <div className={style["card-text-fin"]}> */}
                  <div className={`${style['card-text']} ${style['card-text-fin']}`}>
                    <h4>Start Time:</h4>
                    <h5>{formatTime(data?.item.startTime)}</h5>
                  </div>
                  {/* </div> */}

                  {/* <div className={style["card-text-fin"]}> */}
                  <div className={`${style['card-text']} ${style['card-text-fin']}`}>
                    <h4>End Time:</h4>
                    <h5>{formatTime(data?.item.endTime)}</h5>
                  </div>
                  {/* </div> */}
                </div>
                <Button className={style["card-btnn"]} onClick={() => { finishTrip(data?.item._id) }}>FinishTrip</Button>
              </div>
            </>

          }

          {
            data?.status === 'finished' &&

            <>



              <figure className={style["card-image"]}>
                <img src={`http://localhost:5000/${data?.item?.boatId?.images[0]}`} />
              </figure>
              <div className={style["card__container"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-text"]}>
                    <h4>Name:</h4>
                    <h5>{data?.item?.boatId?.name}</h5>
                  </div>
                  <div className={style["card-text"]}>
                    <h4>Hours:</h4>
                    <h5>{data?.item?.hours}</h5>
                  </div>



                </div>
                <div className={style["card-footer"]}>
                  <div className={style["card-footer-content"]}>

                    <div className={`${style['card-text']} ${style['card-footer-first']}`}>
                      {/* <div className={style["card-text"]}> */}
                      <h4>Start Time:</h4>
                      <h5>{formatTime(data?.item.startTime)}</h5>
                      {/* </div> */}
                    </div>


                    <div className={`${style['card-text']} ${style['card-footer-first']}`}>
                      {/* <div className={style["card-text"]}> */}
                      <h4>End Time:</h4>
                      <h5>{formatTime(data?.item.endTime)}</h5>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </>

          }




          <div>
            {
              // فاضل نهندل تفاصيل الرحلة مش المركب في صفحة تانية 
              data?.item.category !== 'swvl' && data?.status !== 'pending' && data?.status !== 'running' && data?.status !== 'finished' &&


              <NavLink to={`/boat/${data?.item._id}`} state={data?.item} >
                <Button className={style["card-btnn"]}>Show Boat Details</Button>
              </NavLink>


            }


            {data?.item.category === 'swvl' &&
              <div className={style["card-btn-swvl"]}>

                <Button className={style["btn-swvl"]} onClick={openAddTripModal}>Add Trip</Button>
                <NavLink to={`/boat/${data?.item._id}`} state={data.item} >
                  <Button className={style["btn-swvl"]}>Show Boat Details</Button>
                </NavLink>



              </div>
            }









            {
              data?.status === 'swvl' &&
              <NavLink to={`/boat/${data?.item._id}`} state={data?.item} >
                <Button className={style["card-btnn"]}>Make Review</Button>
              </NavLink>
            }


          </div>
        </article>
      </div>
    </>
  )
}

export default Card