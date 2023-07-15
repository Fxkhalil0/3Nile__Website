import React from 'react'
import style from "./ownNav.module.css";
import { useDispatch, useSelector } from 'react-redux';
import boatt from "../newNav/creenshot-2023-07-04-165742-removebg.svg"
import { Box, Modal } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutt } from '../../redux/slices/UserSlice';

function OwnNav() {
    const { boatOwner } = useSelector((state) => state.UserSlice);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true);  };
    const handleClose = () => setOpen(false);
    const dispatch =useDispatch()
    const navigate = useNavigate()
    function logout(){
      dispatch(logoutt())
      navigate("/login-signup")
      
    }
  return ( 
    <>
  
    {
      boatOwner && 
      <>
      <div className={style["nav"]}>
      <img className={style["last__logo"]} src={boatt} />
                <img onClick={handleOpen} className={style["avatar"]} src={`http://localhost:5000/${boatOwner.boatOwnerData.img}`}  />
                <Modal
    open={open}handleCloseopenNotificationModal
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
      

        <div onClick={logout} className={style["row"]}>
        <i style={
          {marginLeft: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "7px",}
        } class="fa-solid fa-right-from-bracket"></i>
        <h4 className={style["row_h4"]}>logout</h4>
      </div>
    </Box>
  </Modal>
            </div>
            </>
        }
          </>
  )

}

export default OwnNav