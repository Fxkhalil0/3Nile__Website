import React, { useEffect, useState } from 'react'
import style from '../../Pages/ContactUsPage/Contactus.module.css'
import { useFormik } from 'formik';
import { Textarea } from '@chakra-ui/react';
import map from '../../Pages/ContactUsPage/map.png'
import axios from 'axios';
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Alert } from '@mui/material';
import { motion } from "framer-motion"



function ContactUsForm() {
  const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);

  
  const pathVariants = {
    initial: {
      pathLength: 0,
    },
    animate: {
      pathLength: 1,
    },
  };
  
    const [errorModalOpen, seterrorModal] = React.useState(false);

    const [message, SetMessage] = useState("");
    const {user } = useSelector(state => state.UserSlice)
   useEffect(()=>{
    console.log(user);
   },[])


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

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        onSubmit: (values) => {
            if(user.userData!==null){

          

            console.log(values)
            axios.post('http://localhost:5000/user/contactUs',{
            
      name: values.name,
    email: values.email,
    message: values.message,
    userId:user.userData._id

} ).then((res)=>{
    console.log(res.data.status);

    if (res.data.status === 201) {
        openSuccussfullModal();
        SetMessage(res.data.message);
        setTimeout(() => {
          succussfullmodalClose();
        }, 2000);
      }
      else if (res.status === 400){
        console.log(res.data);
      }
})

}
else {
  setSuccussfullmodal(true);
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
   
    <Alert className={style["error"]}  variant="filled" severity="error" style={{width:'100%',height:70,textAlign:'center' ,fontSize:20}}>
     {message}
    </Alert>
  </Modal>

  <Modal
          isOpen={succussfullmodalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={ succussfullmodalClose}
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
   <div className={style["succussfull_massage"]}>{message}</div> 
    </div>
       
        </Modal>
            <div className={style["contact__us__form__section"]}>
            <h1 className={style["contact__us__header__text"]}>
                            Contact Us Now!
                        </h1>
                <div className={style["contact__us__container"]}>
                    <div className={style["top__border"]}>
                    <div className={style["contact__us__form__map"]}>
                        <div className={style["contact__us__content__text"]}>
                            <div className={style["contact__us__text"]}>

                                <h3 className={style["contact__us__form__title"]}>Get in Touch</h3>
                                <p className={style["contact__us__form__p"]}>lorem ipsum dolor sit amet, consectetur adip non pro id tempor lorem ipsum dolor sit amet, consectetur adip non pro id tempor
                                </p>
                            </div>
                            <figure className={style["contact__us__form__map"]}>
                                <img className={style["contact__us__form__map__img"]} src={map} />
                            </figure>
                        </div>
                        <div className={style["contact__us__form"]}>
                            <form onSubmit={formik.handleSubmit}>
                                <label className={style["contact__us__form__label"]} htmlFor="name">Name :</label >
                                <input
                                    className={style["contact__us__form__input"]}
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />

                                <label className={style["contact__us__form__label"]} htmlFor="email">Email Address :</label>
                                <input
                                    className={style["contact__us__form__input"]}
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />

                                <label className={style["contact__us__form__label"]} htmlFor="message">Message :</label>
                                <Textarea
                                    placeholder="Write your message"
                                    className={style["contact__us__form__textarea"]}
                                    id="message"
                                    name="message"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.message}
                                />

                                <button className={style["contact__us__form__button"]} type="submit">Submit</button>

                            </form>
</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUsForm