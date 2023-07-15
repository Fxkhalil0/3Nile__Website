import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { fireBaseLogin, register } from '../../redux/slices/UserSlice';
import { login } from '../../redux/slices/UserSlice';
import { useSelector } from 'react-redux';
import style from './login-register.module.css';
import  vector from './images/vec.png'
import { motion } from "framer-motion"
import Modal from "react-modal";
import Modall from '@mui/material/Modal';


// Fire Base  
import GoogleButton from 'react-google-button'
import {auth} from './config'
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
function Login() {
// radio button 

const [value, setValue] = React.useState('user');

const handleChange = (event) => {
  setValue(event.target.value);
};


// radio button end 


// react ui modal 

// const [open, setOpen] = React.useState(false);
// const handleOpen = () => setOpen(true);
// const handleClose = () => setOpen(false);



// react modal end


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { err } = useSelector((state) => state.UserSlice);
  const [open, setOpen] = React.useState(false);

// Succ Modal 
const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);

function openSuccussfullModal() {
  setSuccussfullmodal(true);
}
function closeSuccussfullmodal() {
  setSuccussfullmodal(false);
}
// Succ Modal End

  const [message,SetMessage] = useState("")
  // Form Toggle :
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };
// Login Error Modal 

function handleOpen() {
  setOpen(true);
}
function handleClose() {
  setOpen(false);}
// function closeErrorModal() {
//   seterrorModal(false);
// }
// Login Error Modal End



  // Form Toggle End

  // Radio Button
  let radioButtonValue;
  const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    })
  );

  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
      radioButtonValue = radioGroup.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
  };
  // Radio  Button End

  // Login
  let LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(10, 'must be moro than 10')
      .email()
      .required('must be required'),
    password: Yup.string().min(8, 'must be lower then 20').required('must be lower then 20'),
  });

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      let formlogin = new FormData();
      formlogin.append('email', values.email);
      formlogin.append('password', values.password);
      dispatch(login(values)).then((res) => {
        
        if(res.payload.status===401){
          SetMessage(res.payload.message)
          console.log(message);
          handleOpen()
          setTimeout(()=>{
            handleClose()
          },2000)
        }
        else if (res.payload.status===200){
          if( Cookies.get("userId"))
        navigate('/')
          else if( Cookies.get('boatOwnerId'))
          navigate('/owner-profile');

        }

       

      });
    },
  });

  // Login End

  // SignUp
  let signUpSchema = Yup.object().shape({
    email: Yup.string()
      .min(10, 'must be moro than 10')
      .email()
      .required('must be required'),
    password: Yup.string().min(8, 'must be lower then 20').required('must be lower then 20'),
    name: Yup.string().min(3, 'at least 20 caracter').required('must be more then 3'),
    // username: Yup.string().min(3, "must be moro than 10").required("must be more then 3"),
    // password: Yup.string().min(8, "must be lower then 20").
    // required("must be lower then 20 & more than 8"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      // username:"",
      // password:"",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      let form = new FormData();
      form.append('name', values.name);
      form.append('email', values.email);
      form.append('password', values.password);

      dispatch(register({ ...values, radiovalue: radioButtonValue })).then((res) => {
        console.log(res,"data");
        if(res.payload.status===400){
          SetMessage(res.payload.message)
          handleOpen()
          setTimeout(()=>{
            handleClose() 
          },3000)
        }
        else if (res.payload.status===200){
          SetMessage(res.payload.message)
          openSuccussfullModal()
          setTimeout(()=>{
            closeSuccussfullmodal() 
            handleSignInClick();
          },2000)
       
        }

        // handleSignInClick();
      });
    },
  });
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

  const handleLoginWithGoogle =()=>{
    console.log("Dooone")
  }
  const  handleGoogleSignIn = ()=>{
    const provider = new GoogleAuthProvider();
      try{
        
        signInWithPopup(auth,provider).then((data)=>{
          // navigate('/')
           let userObject = {
           name:data?.user?.providerData[0].displayName,
           email:data?.user?.providerData[0].email,
           password:data?.user?.providerData[0].email,

          }
          dispatch(fireBaseLogin(userObject)).then((res) => {
            console.log(res.payload,"sssssssssss");
            
            if(res.payload.status===401){
              SetMessage(res.payload.message)
            handleOpen()
              setTimeout(()=>{
                handleClose()
              },2000)
            }
            else if (res.payload.status===200){
              navigate('/')
              // if(Cookies.get("userId"))
            
    
            }
            
            // navigate('/')
          })

        })
      }catch(err){
        console.log(err)
      }
  }
  return (
    <>


    

      <div className={`${style.container} ${isSignUpMode ? style['sign-up-mode'] : ''}`}>
        
<Modal
    isOpen={succussfullmodalOpen}
    // onAfterOpen={succussfullmodalOpen}
    onRequestClose={closeSuccussfullmodal}
      className={style["succussfull-modal"]}>
   
    <div className={style["succussfull"]} variant="filled" severity="success" style={{width:'80%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20}}>
  {/* <motion.img 
  
  
  
  src={succ} className={style["succussfull_img"]}  /> */}


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

  <Modall
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={style["error-modal"]}
      >
     <div className={style["error"]} variant="filled" severity="error" style={{width:'80%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20,position:'absolute',left:"700px",top:"300px"}}>
 

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
   <div
   
  
   className={style["succussfull_massage"]}>  {message}</div> 
    </div>
        </Modall>

      {/* <Modal
    isOpen={errorModalOpen}
    onRequestClose={closeErrorModal}
    className={style["error-modal"]}
      
  >
    <div className={style["error"]} variant="filled" severity="error" style={{width:'80%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20}}> */}
  {/* <motion.img
   animate={{
    x: [-10, 10, -10, 10, 0],
  }}
  transition={{
    duration: 0.5,
  }}
  src={error} className={style["succussfull_img"]}  /> */}

{/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
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
   <div
   
  
   className={style["succussfull_massage"]}>  {message}</div> 
    </div>

 
  </Modal> */}





  {/* <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}















        <div className={style['forms-container']}>
          <div className={style['signin-signup']}>
            <form action="#" className={`${style['sign-in-form']} ${style['form-inputs']}`} onSubmit={loginFormik.handleSubmit}>
              <h2 className={style.title}>Sign in</h2>
              <div className={style['input-field']}>
                <i className="fas fa-user" />
                <input type="email" placeholder="Email" {...loginFormik.getFieldProps('email')} />
              </div>
              {loginFormik.touched.email && loginFormik.errors.email ? (
                <div className={style['error-message']}>{loginFormik.errors.email}</div>
              ) : null}
              <div className={style['input-field']}>
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" {...loginFormik.getFieldProps('password')} />
              </div>
            
              



              {loginFormik.touched.password && loginFormik.errors.password ? 
              
              
              
              
              
              (
                <div className={style['error-message']}>{loginFormik.errors.password}</div>
              ) : null}
              <button type="submit" className={`${style.btn} ${style['solid']}`}>
                Sign in
              </button>
              <GoogleButton 
               onClick ={handleGoogleSignIn} 
              
              className={`${style.btn}`} />
              {err && <div className={style['error-message']}>{err.message}</div>}
            </form>
            <form action="#" className={`${style['sign-up-form']} ${style['form-inputs']}`} onSubmit={formik.handleSubmit}>
              <h2 className={style.title}>Sign up</h2>
              <div className={style['input-field']}>
                <i className="fas fa-user" />
                <input type="text" placeholder="Name" {...formik.getFieldProps('name')} />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className={style['error-message']}>{formik.errors.name}</div>
              ) : null}
              <div className={style['input-field']}>
                <i className="fas fa-envelope" />
                <input type="email" placeholder="Email" {...formik.getFieldProps('email')} />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className={style['error-message']}>{formik.errors.email}</div>
              ) : null}
              <div className={style['input-field']}>
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" {...formik.getFieldProps('password')} />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className={style['error-message']}>{formik.errors.password}</div>
              ) : null}
               <div className={style['radio-buttons']}>
      <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
        <MyFormControlLabel
          value="user"
          control={<Radio color="primary" />}
          label="user"
          labelPlacement="top"
        />
        <MyFormControlLabel
          value="boatOwner"
          control={<Radio color="primary" />}
          label="boatOwner"
          labelPlacement="top"
        />
      </RadioGroup>
    </div>
              <button type="submit" className={`${style.btn} ${style['solid']}`}>
                Sign up
              </button>
            </form>
          </div>
        </div>

        <div className={style['panels-container']}>
          <div className={`${style.panel} ${style['left-panel']}`}>
            <div className={style.content}>
              <h3>New here ?</h3>
              <p>Sign up and discover great amount of new opportunities!</p>
              <button className={`${style.btn} ${style['transparent']}`} onClick={handleSignUpClick}>
                Sign up
              </button>
            </div>
            <img src={vector}  className={style.image} alt="signin" />
          </div>
          <div className={`${style.panel} ${style['right-panel']}`}>
            <div className={style.content}>
              <h3>One of us ?</h3>
              <p>If you already has an account, just sign in. We've missed you!</p>
              <button className={`${style.btn} ${style['transparent']}`} onClick={handleSignInClick}>
                Sign in
              </button>
            </div>
            <img  
   src={vector} className={style.image} alt="signup" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;