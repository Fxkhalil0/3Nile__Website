import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Dsc.module.css";
import Detailsstyle from "../BoatDetials/BoatDetials.module.css";
import Carousel from "react-elastic-carousel";
import Item from "../DescComponent/item";
import Rating from "../../Components/Rate/Rating";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import axios from "axios";
import { OwnerdeleteBoat,getBoatData} from '../../redux/slices/UserSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { motion } from "framer-motion"

// import To USer React Modal
import Modal from "react-modal";
function BoatDetials() {

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
  const dispatch =useDispatch()
  const navigate = useNavigate();

  const {boatOwner } = useSelector(state=>state.UserSlice)
  const [ownerId, setOwnerId] = useState(boatOwner.boatOwnerData._id) 	


  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const options = [
    "El-MahKama",
    "Kfc-AbbasFarid",
    "El-Mahatta",
    "El-Kornish-ElGded",
  ];

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];
  const loc = useLocation();
  const param = useParams();
  const [boatReviews, setBoatReviews] = useState(loc.state);
  useEffect(() => {
    // console.log("deuhedhudeuhedhuedhu");
    dispatch(getBoatData(param.id)).then((res) => {
      let boatRev = res.payload
      setBoatReviews(boatRev)
    })
    // console.log("object");
    // [dispatch, param.id]
    setBoatDetails(loc.state);
   
  }, [loc.state]);
  const [boatDetails, setBoatDetails] = useState(loc.state);
  const [value, setValue] = React.useState(options[0]);
  let subtitle;
  let image = [];
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [EditBoatmodalIsOpen, setEditBoatIsOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");
  const [imageUpload, setimageUpload] = React.useState("");

  // Succussfull Modal
  const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);

  function openSuccussfullModal() {
    setSuccussfullmodal(true);
  }
  // Succussfull Modal End

  // Succussfull Edit Modal
  const [succussfullEditOpen, setSuccussfullAdded] = React.useState(false);

  function openSuccussfullAdded() {
    setSuccussfullAdded(true);
  }
  function closeSuccussfullAdded() {
    setSuccussfullAdded(false);
  }

  // Succussfull Edit Modal End

  // Delete Boat :

  function deleteBoat(){

    dispatch(OwnerdeleteBoat({id:boatDetails._id,ownerId:ownerId})).then(()=>{
      openSuccussfullModal()
      setTimeout(()=>{
        navigate('/Owner-profile'); 
      },1500)
      // alert("Your Boat Has Been Deleted Succ ")  
      
     
    })
  }
  const uploadMultipleFiles = (e) => {
      // e.preventDefault();
      const files = e.target.files;
      
      console.log(files.file,"Ima");
    // Calculate the total number of files including the new ones
    const totalFiles = fileArray.length + files.length;
        console.log(totalFiles,"total");
    // Check if the total number of files is greater than 9
    if (totalFiles > 9) {
      alert("You can't upload more than 9 photos.");
      return;
    }
    
    const fileArrayCopy = [...fileArray];
 
    for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
        setimageUpload(fileArray);

    }
    setFileArray(fileArrayCopy);
  
  };
  const removeImage = (index) => {
    const fileArrayCopy = fileArray.slice();
    fileArrayCopy.splice(index, 1);
    setFileArray(fileArrayCopy);
  };

  function openEditBoatModal() {
    setEditBoatIsOpen(true);
  }


  function closeEditBoatModal() {
    setEditBoatIsOpen(false);
  }

  const [fileArray, setFileArray] = useState([]);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
    // price: Yup.number().required("Required"),
    // portName: Yup.string().required("Required"),
    // type: Yup.string().required("Required"),
    // numberOfpeople: Yup.number().required("Required"),
    // images: Yup.array().min(1, "At least one image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      number: 0,
      images: [],
    },
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);

      formData.append("number", values.number);

      for (let i = 0; i < imageUpload.length; i++) {
       console.log(imageUpload[i]);
        formData.append("images", imageUpload[i]);
      }

      axios
        .put(
          `http://localhost:5000/boatOwner/editBoat/${boatDetails._id}`,
          formData
        )
        .then(() => {
          closeEditBoatModal()
          openSuccussfullAdded()
          setTimeout(()=>{
            closeSuccussfullAdded()
            navigate('/Owner-profile'); 

          },1500)
        })
        .catch((err) => console.log(err));
    },
    onChange: (value) => {
      console.log(value);
    },
    validationSchema: Schema,
  });
  return (
    <>


    {/* Succussfull Modal  */}

      <div>


      <Modal
          isOpen={succussfullmodalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeEditBoatModal}
            className={Detailsstyle["succussfull-modal"]}
            
        >
         



         
     <div className={Detailsstyle["succussfull"]} variant="filled" severity="success" style={{width:'90%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20}}>
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
   <div className={Detailsstyle["succussfull_massage"]}>You Boat Has Deleted Succussfully</div> 
    </div>
       
        </Modal>
      </div>

    {/* Succussfull Modal End */}


    {/* Succussfull Edit Modal  */}

      <div>


      <Modal
          isOpen={succussfullEditOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeEditBoatModal}
            className={Detailsstyle["succussfull-modal"]}
            
        >
         
     


       
          <div className={Detailsstyle["succussfull"]} variant="filled" severity="success" style={{width:'90%',height:230,textAlign:'center' ,fontSize:20,borderRadius:20}}>
  {/* <img src={succ} className={Detailsstyle["succussfull_img"]}  /> */}
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
   <div className={Detailsstyle["succussfull_massage"]}>   You Boat Data Has Been Updated  Succussfully</div> 
    </div>
        </Modal>
      </div>


    {/* Succussfull Edit Modal End */}

    
      <div>
        <Modal
          isOpen={EditBoatmodalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeEditBoatModal}
         
          contentLabel="Example Modal"
          className={Detailsstyle["content"]}
        >
          <div className={Detailsstyle.discModal}>
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className={Detailsstyle["titleModal"]}
            >
              Edit Boat{" "}
            </h2>
            <CloseIcon
              onClick={closeEditBoatModal}
              className={Detailsstyle ["closeModal"]}
            ></CloseIcon>
            <hr />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={Detailsstyle["form_group"]}>
              <div className={Detailsstyle.form_input}>
                <h5 className={Detailsstyle["labelModal"]}>Boat Name</h5>
                <input
                  name="name"
                  type="text"
                  className={Detailsstyle["inputModal"]}
                  onChange={formik.handleChange}
                />
              </div>
           
              {/* <button type="button" className={style['btn btn-danger btn-block']} onClick={uploadFiles}>
                Upload
              </button> */}
            </div>

            <div className={Detailsstyle.form_input}>
              <h5 className={Detailsstyle["labelModal"]}>Boat Description</h5>
              <input
                name="description"
                type="text"
                onChange={formik.handleChange}
                className={Detailsstyle["inputModal"]}
              />
            </div>

            <div className={Detailsstyle.form_input}>
              <h5 className={Detailsstyle["labelModal"]}>Price per Hour</h5>

              <input
                name="price"
                type="number"
                className={Detailsstyle["inputModal"]}
                onChange={formik.handleChange}
              />
            </div>

            <div className={Detailsstyle.form_input}>
              <h5 className={Detailsstyle["labelModal"]}>Number of People</h5>
              <input
                name="number"
                type="number"
                className={Detailsstyle["inputModal"]}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className="form-group multi-preview"
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              {(fileArray || []).map((file) => (
                <div
                  style={{
                    width: "600px",
                    height: "100px",
                    margin: "10px",
                    border: "1px solid black",
                  }}
                  key={fileArray.index}
                >
                  <img
                    key={file.name}
                    style={{ width: "100%" }}
                    src={URL.createObjectURL(file)}
                    alt="..."
                  />
                </div>
              ))}
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* <div className="form-group">
              <input
                type="file"
                className="form-control"
                onChange={uploadMultipleFiles}
                multiple
              />
            </div> */}
                 <div className={style.form_input}>
                  <h5 className={style["labelModal"]}>Image:</h5>
                  <label className={style['labelModal']} htmlFor="img">
                  
                    <input
                      type="file"
                      id="img"
                      name="img"
                      onChange={uploadMultipleFiles}
                      multiple
                    />
                  </label>
                </div>

            {/* <div className={style.form_input2}>
                <label className={style['input']} htmlFor="img"> 
                <h5 className={style['labelModal']}>image:</h5>
                <input className={style['inputModal']} type="file" id="img" name="img"
                    onChange={uploadMultipleFiles}
                    multiple
                />
                </label>
              </div> */}
            {/* ////////////////// */}
            <div className="form-group"></div>
                  
            <button className={Detailsstyle['form_btn']}  type="submit" value={"Submit"} >save Changes</button>
          </form>
        </Modal>
      </div>
      <div className={style["boat-description"]}>
        <div className={style["container"]}>
          <div className={style["boat-description__content"]}>
            <div className={style["boat-description__image"]}>
              <div className="App">
                <Carousel breakPoints={breakPoints}>
                  {/* <Item><img style={{width: '100%'}} src={"../../../../3Nile-backend/uploads/24b8135e-54c4-496f-937f-f2e373acc0c4.jpg"} alt=''/></Item> */}

                  {boatDetails?.images?.map((imageUrl) => {
                    console.log(imageUrl);
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
            </div>
            <div className={style["boat-description__info_con"]}>
            <div  className={style["boat-description__info"]}>
              <h3>{boatDetails?.name}</h3>
             
              <h4>Price Per Hour : {boatDetails?.price}</h4>
              <p>{boatDetails?.description}</p>
              <div  className={style["boat-description__icons"]}>
              <i className="fa-solid fa-ship" />
              <i  className="fa-solid fa-sailboat" />
            <i  className="fa-solid fa-anchor" />
            <i className="fa-solid fa-ferry"/>
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


              {/* <h4 style={{ marginBottom: "10px" }}>
                Rates: */}
                {/* boatDetails.averageRating */}
                {/* <Rating rating={4} />
              </h4 > */}



              <h4 style={{marginBottom:'5px',fontSize:"28px"}}>
                Number Of People: <span>{boatDetails?.numberOfpeople} </span>
              </h4>
              <h4  style={{paddingTop:"8px"}}>
                Number OF Reviews: <span>{boatDetails?.totalReviews} </span>
              </h4>

              <h4  style={{paddingTop:"8px"}}>
                Boat Type : <span>{boatDetails?.type} </span>
              </h4>
              <div className={style["boatDetails_buts"]}>
              <button className={style["Delete_But"]} onClick={deleteBoat}>Delete This Boat</button>
              <button className={style["Edit_But"]} onClick={openEditBoatModal}>Edit</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default BoatDetials;
