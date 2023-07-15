import React, { useEffect, useState } from 'react'
import style from "./cover.module.css"

import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
// import To USer React Modal 
import Modal from 'react-modal';
import { Form, Formik, useFormik } from 'formik';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { editUserInfo, userUpdateCover,userInFo } from '../../../../redux/slices/UserSlice';
import { motion } from "framer-motion"
// Socket--> user
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Cover() {
  const [CoverOpen, setCoverOpen] = React.useState(false);

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
  const { user } = useSelector((state) => state.UserSlice);

  const [userState, setuserState] = useState(user.userData);

  // Socket

  // User Listen 
  socket.on('Owner-Cancel-Trip', (data) => {
    console.log(data);

  });
  socket.on('Owner-accepted-Trip', (data) => {

    console.log(data)

  });
  socket.on('Owner-finished-Trip', (data) => {

    console.log(data)

  });

  // Socket End



  // const {editUserInfo } = useSelector(state => state.UserSlice)
  const dispatch = useDispatch();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/user/userInfo/${user?.userData?._id}`).then((res) => {
    // setuserState(res?.data)

    })  
  }, [userState])



  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // //////////////////////


  const formik = useFormik({
    initialValues:
    {
      name: '',
      phone: '',
      img: null,
      address: '',
      id: "",
    },

    onSubmit: (values) => {
      let form = new FormData();
      form.append('name', values.name);
      form.append('phone', values.phone);
      form.append('address', values.address);
      form.append('id', user.userData._id);
      form.append('img', values.img);
      setIsOpen(false);
      console.log(values, "VALuES");
      console.log(values.img, "VALuES");
      dispatch(editUserInfo({ ...values, id: userState._id })).then((res) => {
        setTimeout(()=>{
          dispatch(userInFo(userState._id))
          .then((res) => {
            console.log(res.payload?.data?.userData,"resd")
            setuserState(res?.payload?.data?.userData)
        
            setSuccmessage("Your Data has been updated")
          openSuccussfullModal()
            })

        },100)
        setTimeout(() => {


          closeSuccussfullmodal()
        }, 1500)


       

  
      })

    }
  })


  
  // ///////////////////
  // Cover
  const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);
  const [errorModalOpen, seterrorModal] = React.useState(false);
  const [message, SetMessage] = useState("")
  const [Succmessage, setSuccmessage] = useState("")
  function openSuccussfullModal() {
    setSuccussfullmodal(true);
  }
  function closeSuccussfullmodal() {
    setSuccussfullmodal(false);
  }
  function closeCoverModal() {
    setCoverOpen(false);
  }
  function openCoverModal() {
    setCoverOpen(true);
  }

  function openErrorModal() {
    seterrorModal(true);
  }
  function closeErrorModal() {
    seterrorModal(false);
  }
  const CoverinitialValue = {

    img: null,
  };
  const handleCoverImage = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("img", file);
  };
  const handleCover = async (values, { setSubmitting }) => {
    console.log(values, "TEST");
    const userID = user.userData._id;

    const formDataa = new FormData();
    formDataa.append("img", values.img);
    console.log(formDataa);
    dispatch(userUpdateCover({ userId: userID, ...values })).then(
      (res) => {
        console.log(res,"cxcxcx")
        if (res.payload.data.status === 200) {
          setSuccmessage(res.payload.data.message)

          closeCoverModal();
          openSuccussfullModal()
          console.log(res.payload.data.data.userData, "rdsaee.")
          setuserState(res.payload.data.data.userData);
          console.log(userState, "userrrrrState")

          setTimeout(() => {

            closeSuccussfullmodal()
          }, 1500)
        }
        else if (res.payload.data.status === 400) {
          SetMessage(res.payload.data.message)
          closeCoverModal();
          openErrorModal()



          setTimeout(() => {

            closeErrorModal()

          }, 1500)
        }

      }
    );

    setSubmitting(false);
  };


  return (


    <>
      <div>
      <Modal
          isOpen={errorModalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeErrorModal}
          className={style["error-modal"]}>

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
  {/* <img src={error} className={style["succussfull_img"]}  /> */}
   <div className={style["succussfull_massage"]}>  {message}</div> 
    </div>
 
  </Modal>
      <Modal
          isOpen={succussfullmodalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeSuccussfullmodal}
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
  
  {/* <img src={succ} className={Detailsstyle["succussfull_img"]}  /> */}
   <div className={style["succussfull_massage"]}>{Succmessage}</div> 
    </div>
       
        </Modal>
        
      <Modal
        isOpen={CoverOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeCoverModal}
        className={style["content1"]}
        contentLabel="Example Modal"
      >
        <div className={style.discModal}>
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            className={style["titleModal2"]}
          >
            Edit Cover Image
          </h2>
          <CloseIcon
            onClick={closeCoverModal}
            className={style["closeModal"]}
          ></CloseIcon>
          <hr />
        </div>
        {/* <div className={style['titleModal']}>Edit Information:</div> */}
        <Formik initialValues={CoverinitialValue} onSubmit={handleCover}>
          {({ isSubmitting, setFieldValue }) => (
            <Form style={{marginTop:"159px"}}>

              <div className={style.form_input2}>
                <label className={style['labelModal']} htmlFor="img">Change Your Cover Image:
                <input className={style['inputModal']} type="file" id="img" name="img"
                  onChange={(event) => handleCoverImage(event, setFieldValue)}
                />
                </label>
              </div>
              <div className={style['form_btn_container']}>
                <button className={style['form_btn']} type="submit" disabled={isSubmitting}>
                  save changes
                </button>
                <button className={style['form_btn']} onClick={closeCoverModal}>
                  cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className={style["content"]}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} className={style['titleModal']}>Edit Information</h2>

          <div className={style.discModal}>
            <CloseIcon onClick={closeModal} className={style['closeModal']}></CloseIcon>
            <hr />
          </div>
          {/* <div className={style['titleModal']}>Edit Information:</div> */}
          <form className={style['edit_form']} onSubmit={formik.handleSubmit}>
            <div className={style['form_group']}>




              <div className={style.form_input} >
                <h5 className={style['labelModal']}>Name:</h5>
                <input id="outlined-basic" label="Your Name" variant="outlined" className={style['inputModal']} name='name' onChange={formik.handleChange} />
                {/* <input type="text" id="name" className={style['inputModal']} /> */}
              </div>

              <div className={style.form_input} >
                <h5 className={style['labelModal']}>Address:</h5>
                <input id="outlined-basic" label="Your Address" variant="outlined" className={style['inputModal']} name='address' onChange={formik.handleChange} />
                {/* <input type="text" id="name" className={style['inputModal']} /> */}
              </div>

              <div className={style.form_input} >
                <h5 className={style['labelModal']}>Phone:</h5>
                <input id="outlined-basic" label="Your Phone" variant="outlined" className={style['inputModal']} name='phone' onChange={formik.handleChange} />
                {/* <input type="text" id="name" className={style['inputModal']} /> */}
              </div>

              <div className={style.form_input}>
                <div className={style['wrapper']} >



                </div>
                <label htmlFor="outlined-basic" className={style['input']}>
                  <h5 className={style['labelModal']}>image:</h5>
                  <input type="file" id="outlined-basic" name="img" onChange={(e) => {
                    formik.setFieldValue('img', e.currentTarget.files[0])
                  }} />
                </label>

              </div>


            </div>

            <div className={style['form_btn_container']}>

              <button type='submit' className={style['form_btn']} onClick={closeModal}>
                cancel
              </button>
              <button type='submit' className={style['form_btn']}>
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      </div>



      <section>
        <div className={style["profile"]}>
          <div className={style["container"]}>
            <div className={style["profile-content"]}>
              <div className={style["profile-header"]}>
                <div className={style["prodile-cover-container"]}>
                  <div className={style["profile-cover"]}>
                  <img src={`http://localhost:5000/${userState?.coverImg}`} alt="" />
                  </div>
                  <div className={style["cover-icon"]}>
                  <i
                      className="fa-solid fa-pencil fa-xl"
                      style={{ color: "#ffffff" }}
                      onClick={() => {
                        openCoverModal()
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={style["profile-details"]}>
              <div className={style["personal-img-editIcon"]}>
                <div className={style["profile-image"]}>
                  <div className={style["image-container"]}>
                    <div className={style["image-editor"]}>
                      <button type="button" className={style["image-button-show"]}>
                        <img src={`http://localhost:5000/${userState?.img}`} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={style["edit-Icon"]}>

                </div>
              </div>

              <div className={style["user-info"]}>
                <div className={style["user-name"]}>
                  <div className={style["name"]}>
                    {/* /////////////////////////////////////////////////////////////////// */}
                    <h1>{userState?.name}</h1>


                  </div>
                  <div className={style["title"]}>
                    <p>{userState?.address}</p>
                  </div>
                  <div >
                    <h4 style={{ opacity: .5 }} className={style["address"]}>{userState?.phone}</h4>
                  </div>
                </div>
                <div className={style["user-info-buttons"]}>

                  <div className={style["second-button"]}>
                    <button onClick={openModal}>Edit Your Information</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Cover