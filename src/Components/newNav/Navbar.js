import React from 'react'
import { useSelector } from "react-redux";
import { Button } from 'primereact/button';
import  style  from './Navbar.module.css' 
import { NavLink, useLocation  } from 'react-router-dom';
import logo from "./logo.png"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux'
import { logoutt} from '../../redux/slices/UserSlice'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import boatt from './creenshot-2023-07-04-165742-removebg.svg'
import notificationIcon from './notification.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Close, Face } from '@mui/icons-material';



import { useRef } from 'react';
import axios from 'axios';
const socket = io('http://localhost:5000');

// const Boatt = new XMLSerializer().serializeToString(boatt);

// let boattString;

// try {
//   const boattXML = new DOMParser().parseFromString(boatt, 'image/svg+xml');    
//   boattString = new XMLSerializer().serializeToString(boattXML);
// } catch (e) {
//   // Parsing failed, fallback to SVG string  
//   boattString = boatt;   
// }


// Notification Menu
const StyledMenu = styled((props) => (
  <Menu

  className={style.notificationMenu}

    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 0,
    marginTop: theme.spacing(2),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
// Notification Menu End 

function Navbar() {
  const {user } = useSelector(state => state.UserSlice)
  const  notificationSound = useRef(null);
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
// Notification Menu 
// const [anchorEl, setAnchorEl] = React.useState(null);
// const openNotificationModal = Boolean(anchorEl);
// const handleClick = (event) => {
//   setAnchorEl(event.currentTarget);
//   setOpenNotification(!openNotification);
// };
// const handleCloseopenNotificationModal = () => {
//   emptyNotification()
//   setAnchorEl(null); 
// };
// const [readNotifications, setReadNotifications] = useState([]);
//   const [notifications, setNotifications] = useState([]);
const [anchorEl, setAnchorEl] = React.useState(null);
const openNotificationModal = Boolean(anchorEl);
const [readNotifications, setReadNotifications] = useState([]);
const [notifications, setNotifications] = useState([]);
const [openNotification, setOpenNotification] = useState(false);
const [showAnimation, setShowAnimation] = useState(true);


const handleClick = (event) => {
  if (openNotificationModal) {
    emptyNotification();
    setAnchorEl(null);
  } else {
    setAnchorEl(event.currentTarget);
    setOpenNotification(true);
  }
};

const handleCloseopenNotificationModal = () => {
  emptyNotification();
  setAnchorEl(null);
  setOpenNotification(false);
};
 
  const emptyNotification = () => {
  };
 
  const remove = (index) => {
    setNotifications((prevState) => {
      const newNotifications = [...prevState];
      newNotifications.splice(index, 1);
      return newNotifications;
    })
    
    setReadNotifications((prevState) => {
      const newNotifications = [...prevState];
      newNotifications.splice(index, 1);
      return newNotifications;
    })

  };
  const removeAllNotifications = () => {
    setNotifications([]);
    setReadNotifications([])
  };


  const markAsRead = (index) => {
    console.log(index);
    setReadNotifications((prevState) => [...prevState, index]);
  };
  useEffect(() => { 
    
   
  }, []);
  const playSound = () => {
    if (notificationSound.current) {
      notificationSound.current.play();
    }
  };
  useEffect(() => {
      socket.on('hello',(e)=>{
        console.log(e);
      })
    const id =  Cookies.get("userId")
      if(id){

        axios.get(`http://localhost:5000/user/notifications/${id}`).then((res)=>{
          console.log(res.data.unreadNotifications,"userNooot");
          setNotifications(res.data.unreadNotifications)
          console.log(notifications,"eee");
    
        })
  


    socket.on('Owner-Cancel-Trip', (data) => {

      if (!notifications.some((notification) => notification === data.tripNotification)) {
        setNotifications((prev) => [...prev, data.tripNotification]);
      }
      
    });
    socket.on('Owner-accepted-Trip', (data) => {
      

  
      console.log(data,"sssssssssssw3q");
    
      
        if(id===data.notification.clientId){
          setTimeout(() => {
            playSound();
          }, 300);
          const { message, status, _id } = data.notification;
          
     
          const isNewNotification = notifications.find(notification => notification._id === _id) === undefined;        
        
        if(isNewNotification){
          
       
            if (!notifications.some(notification => notification._id === data.notification._id)) {
              setNotifications(prevState => [...prevState, data.notification]);
            }
  
  
          }
          else{
            console.log("old");
          }
          
      }
      
    });
    socket.on('Owner-finished-Trip', (data) => {
      if (!notifications.some((notification) => notification === data.tripNotification)) {
        setNotifications((prev) => [...prev, data.tripNotification]);
      }
      
    });
    if(!user){
      setShowAnimation(false)
    }
    else{
      setShowAnimation(true)

    }
  }
  }, []);
  const dispatch =useDispatch()
  const navigate = useNavigate()

  function logout(){
    dispatch(logoutt())
    navigate("/login-signup")
    
  }
    const {boatOwner } = useSelector(state => state.UserSlice)
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true); document.getElementById("nav").style.left="calc(12.5%-10px)" };
  const handleClose = () => setOpen(false);

  // Get the current path using useLocation hook
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
   <>
   {
    !boatOwner &&
    (
    showAnimation?
    ( <div className={style["nav"]} id='nav'>
    <ul className={style["links"]}>
        <li ><img className={style["last__logo"]} src={boatt} /></li>

        <li ><NavLink  to="/"
           className={activeButton === 'home' ? style["activeLink"] : ''}
           onClick={() => handleButtonClick('home')}
        
        
        
        
        
        >Home</NavLink></li>

        <li ><NavLink to="about"
          className={activeButton === 'about' ? style["activeLink"] : ''}
          onClick={() => handleButtonClick('about')}
        
        
        >About</NavLink></li>

        <li><NavLink  to="contactus"
        
        className={activeButton === 'contactus' ? style["activeLink"] : ''}
        onClick={() => handleButtonClick('contactus')}
        
        
        >Contact</NavLink></li>

    </ul>
  
    { !user ?
    <div className={style["buttons"]} >
        <NavLink 
        
        
        to="login-signup"><Button label="Join us" className={style.joinUs}/></NavLink>
        
    </div>
    :
    <>
  <div className={style.icons}>
  <div className={style.icon} onClick={handleClick}>
  <img
    src={notificationIcon}
    className={style.iconImg}
    alt=""
    id="demo-customized-button"
    aria-controls={openNotificationModal ? 'demo-customized-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={openNotificationModal ? 'true' : undefined}
    variant="contained"
    disableElevation
  />
  {notifications.length > 0 && (
    <>
      <div className={style.counter}>{notifications.length}</div>
      <audio ref={notificationSound} src={require('../../assets/click.mp3')} />
    </>
  )}
</div>
        <div>
          {/* Notification Menu */}
      <StyledMenu
     
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={openNotificationModal}
        onClose={handleCloseopenNotificationModal}
      >
       
        <MenuItem 
        
        className={style.notificationMenu}

        onClick={handleCloseopenNotificationModal} >
          {notifications.length === 0?  <span  style={{color:'#000000ff'}}>No Notifications Yet !</span>
         
           :(
            notifications?.map((item,index) => {
              console.log(item,"iteeeem");
              return <p key={index} style={{color:'#152c72',paddingBottom:'20px', opacity: readNotifications.includes(index) ? 0.5 : 1, transition: 'opacity 0.3s ease-in-out'}} 
              
              
              onMouseEnter={() => {
                axios.put(`http://localhost:5000/user/notifications/${item._id}/mark-as-read`).then((res)=>{
                  console.log(res,"readed");
                
            
                })
                console.log(item,"dsadasdas");
                remove(index)
                markAsRead(index); 
              }}
              >

              {item?.message} <span className={style.closeNotification} onClick={()=>{remove(index)}}>X</span></p>
          })
          
          
          )
          
         
          }
          {!notifications.length<1 && 
             <Button style={{background:'white',color:'#F89334'}}
             onClick={removeAllNotifications}
             >
            Make All Read ?
          </Button>}
        </MenuItem>
       
      
      </StyledMenu>
       {/* Notification Menu End*/}
    </div>
      </div>
        <img onClick={handleOpen} className={style["avatar"]} src={`http://localhost:5000/${user.userData.img}`}  />
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    
    <Box sx={style}>
      {/* <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography> */}
      <div className={style["row"]}>
      <div style={
        {
      
          
          paddingTop: "23px",}}>
      <NavLink to="user-profile" className={style["row_a"]} >
        <i style={
          {
            paddingLeft: "10px",
            
            paddingTop: "7px",}
        } class="fa-regular fa-user"></i>
        <h4  className={style["row_h4"]}>profile</h4>

      </NavLink>
      </div>
        <div onClick={logout} className={style["row_a"]} >
        <i style={
          {
            paddingLeft: "10px",
            
            paddingTop: "7px",}
        } class="fa-solid fa-right-from-bracket"></i>
        <h4  className={style["row_h4"]}>logout</h4>
      </div>
      </div>
    </Box>
  </Modal>
  </>
}
</div>


)



:
( 


<div className={style["nav"]} id='nav'>
        <ul className={style["links"]}>
            <motion.li initial="hiddenVariant"
            animate="revealedVariant"
            transition={{ delay: 6, duration: 0.7 }} variants={{hiddenVariant: { y: 50, opacity: 0 },
             revealedVariant: {
               y: 0,
               opacity: 1,
             },}}><img className={style["last__logo"]} src={boatt} /></motion.li>

            <motion.li initial="hiddenVariant"
            animate="revealedVariant"
            transition={{ delay: 6.5, duration: 0.9 }} variants={{hiddenVariant: { y: 50, opacity: 0 },
             revealedVariant: {
               y: 0,
               opacity: 1,
             },}}><NavLink  to="/">Home</NavLink></motion.li>

            <motion.li  initial="hiddenVariant"
            animate="revealedVariant"
            transition={{ delay: 7, duration: 0.8 }} variants={{hiddenVariant: { y: 50, opacity: 0 },
             revealedVariant: {
               y: 0,
               opacity: 1,
             },}}><NavLink to="about">About</NavLink></motion.li>

            <motion.li initial="hiddenVariant"
            animate="revealedVariant"
            transition={{ delay: 7.5, duration: 0.7 }} variants={{hiddenVariant: { y: 50, opacity: 0 },
             revealedVariant: {
               y: 0,
               opacity: 1,
             },}}><NavLink to="contactus">Contact</NavLink></motion.li>

        </ul>
        <motion.h2  initial="hiddenVariant"
          animate="revealedVariant"
            transition={{ delay: 8, duration: 1 }} variants={{hiddenVariant: { y: -50, opacity: 0 },
             revealedVariant: {
               y: 0,
               opacity: 1,
             },}}></motion.h2>
        { !user ?
        <motion.div className={style["buttons"]} 
        initial="hiddenVariant"  animate="revealedVariant"
        transition={{ delay: 7.5, duration: 0.7 }} variants={{hiddenVariant: { y: 50, opacity: 0 },
         revealedVariant: {
           y: 0,
           opacity: 1,
         },}}>
            <NavLink 
            
            
            to="login-signup"><Button label="Join us" className={style.joinUs}/></NavLink>
            
        </motion.div>
        :
        <>
        <img onClick={handleOpen} className={style["avatar"]} src={`http://localhost:5000/${user.userData.img}`}  />
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <NavLink to="user-profile">
            <div className={style["row"]}>
            <i class="fa-regular fa-user"></i>
            <h4>profile</h4>
          </div>
          </NavLink>

            <div onClick={logout} className={style["row"]}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <h4>logout</h4>
          </div>
        </Box>
      </Modal>
      </>
}
    </div>))
   }
   
   </>
  )
  
}

export default Navbar