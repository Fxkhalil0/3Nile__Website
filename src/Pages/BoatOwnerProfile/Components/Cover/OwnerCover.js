import React, { useEffect, useState } from "react";

import axios from "axios";
import style from "./cover.module.css";
import coverphoto from "../../Components/Cover/1673626899928.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
// import To USer React Modal
import Modal from "react-modal";
import succ from './succsses.png'
import error from './error.png'
import Autocomplete from "@mui/material/Autocomplete";
import Detailsstyle from "../../../BoatDetials/BoatDetials.module.css";

// import Formik
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOwnerBoats, ownerUpdateCover } from "../../../../redux/slices/UserSlice";
import { Formik, Form, Field } from "formik";
import { ownerUpdateInfo } from "../../../../redux/slices/UserSlice";
// Socket -->> Owner
import { Alert } from '@mui/material';
import Loader from '../../../../Components/SplashComponent/Splash'
import io from "socket.io-client";
import { motion } from "framer-motion"
const socket = io("http://localhost:5000");

const options = [
  "El-MahKama",
  "Kfc-AbbasFarid",
  "El-Mahatta",
  "El-Kornish-ElGded",
];
function OwnerCover() {
  const { loading } = useSelector((state) => state.UserSlice);
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

  // Succussfull Modal
  const [succussfullmodalOpen, setSuccussfullmodal] = React.useState(false);

  function openSuccussfullModal() {
    setSuccussfullmodal(true);
  }
  function closeSuccussfullmodal() {
    setSuccussfullmodal(false);
  }
  // Succussfull Modal End
  // Succussfull Modal
  const [succussfullAddedOpen, setSuccussfullAdded] = React.useState(false);

  function openSuccussfullAdded() {
    setSuccussfullAdded(true);
  }
  function closeSuccussfullAdded() {
    setSuccussfullAdded(false);
  }
  // Succussfull Modal End


  // Boat Owner Listen

  const dispatch = useDispatch();
  const { boatOwner } = useSelector((state) => state.UserSlice);
  const [boatOwnerState, setBoatOwnerState] = useState(boatOwner.boatOwnerData);
  let subtitle;
  let image = [];
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [CoverOpen, setCoverOpen] = React.useState(false);
  const [addBoatmodalIsOpen, setaAddBoatIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [imageUpload, setimageUpload] = React.useState("");

  useEffect(() => {
    setBoatOwnerState(boatOwner.boatOwnerData)
    dispatch(getOwnerBoats(boatOwnerState._id));

    // Socket Owner Listen
    socket.on("You-Got-New-Trip-Request", (data) => {
      console.log(data);
    });
    socket.on("User-Cancel-Trip", (data) => {
      console.log(data);
    });
    socket.on("User-Finish-Trip", (data) => {
      console.log(data);
    });
    // Swvl Listening
    socket.on("Swvl-booked", (data) => {
      console.log(data);
    });
  }, [boatOwner.boatOwnerData]);

  useEffect(() => {


  }, [])
  const uploadMultipleFiles = (e) => {
    // e.preventDefault();
    const files = e.target.files;

    // Calculate the total number of files including the new ones
    const totalFiles = fileArray.length + files.length;

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

  function openModal() {
    setIsOpen(true);
  }

  function openAddBoatModal() {
    setaAddBoatIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeAddBoatModal() {
    setaAddBoatIsOpen(false);
  }



  // Edit Cover Photo :
  function closeCoverModal() {
    setCoverOpen(false);
  }
  function openCoverModal() {
    setCoverOpen(true);
  }


  // Error  Modal 
  const [errorModalOpen, seterrorModal] = React.useState(false);
  const [message, SetMessage] = useState("")

  function openErrorModal() {
    seterrorModal(true);
  }
  function closeErrorModal() {
    seterrorModal(false);
  }
  // Error  Modal End

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
      boatOwnerId: "",
      name: "",
      description: "",
      price: "",
      portName: "",
      type: "",
      number: 0,
      images: [],
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("portName", values.portName);
      formData.append("type", values.type);
      formData.append("number", values.number);
      formData.append("boatOwnerId", boatOwner.boatOwnerData._id);

      // Upload Images For Boat

      for (let i = 0; i < imageUpload.length; i++) {
        formData.append("images", imageUpload[i]);
      }

      axios
        .post("http://localhost:5000/boatOwner/addBoat", formData)
        .then((res) =>

          dispatch(getOwnerBoats(boatOwner.boatOwnerData._id)).then(() => {
            closeAddBoatModal()
            openSuccussfullAdded()
            setTimeout(() => {
              closeSuccussfullAdded()
            }, 1500)
          })
        )
        .catch((err) => console.log(err));
    },
    onChange: (value) => {
      console.log(value);
    },
    validationSchema: Schema,
  });

  // Edit Informations

  const initialValue = {
    name: "",
    phone: "",
    address: "",
    img: null,
  };
  const handleImage = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("img", file);
  };
  const handle = async (values, { setSubmitting }) => {
    console.log(values, "TEST");
    const boatOwnerId = boatOwner.boatOwnerData._id;

    const formDataa = new FormData();
    formDataa.append("name", values.name);
    formDataa.append("phone", values.phone);
    formDataa.append("address", values.address);
    formDataa.append("img", values.img);

    dispatch(ownerUpdateInfo({ boatOwnerId: boatOwnerId, ...values })).then(
      (res) => {
        console.log(res, "Updated");
        setBoatOwnerState(res.payload.boatOwnerData);
        closeModal();
        openSuccussfullModal()
        setTimeout(() => {
          closeSuccussfullmodal()
        }, 1500)
      }
    );

    setSubmitting(false);
  };
  // Cover Edit : 
  const CoverinitialValue = {

    img: null,
  };
  const handleCoverImage = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("img", file);
  };
  const handleCover = async (values, { setSubmitting }) => {
    console.log(values, "TEST");
    console.log(boatOwner.boatOwnerData._id);
    const boatOwnerId = boatOwner.boatOwnerData._id;

    const formDataa = new FormData();
    formDataa.append("img", values.img);
    console.log(formDataa);
    dispatch(ownerUpdateCover({ boatOwnerId: boatOwnerId, ...values })).then(
      (res) => {
        if (res.payload.data.status === 200) {
          closeCoverModal();
          openSuccussfullModal()
          console.log(res.payload.data.data.boatOwnerData, "rdsaee.")
          setBoatOwnerState(res.payload.data.data.boatOwnerData);
          console.log(boatOwnerState, "boatOwnerState")

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

  // Edit Informatiosn End
  return (
    <>


      {/* Succussfull Modal  */}

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
          onRequestClose={closeAddBoatModal}
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
   <div className={style["succussfull_massage"]}> Your Data Has been Updated</div> 
    </div>

         

        </Modal>
      </div>


      {/* Succussfull Modal End */}



      {/* Added Modal  */}

      <div>


        <Modal
          isOpen={succussfullAddedOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeAddBoatModal}
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
   <div className={style["succussfull_massage"]}> Your Boat Added Succussfully</div> 
    </div>

         

        </Modal>
      </div>

      {/* Edit Cover  */}


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
            className={style["titleModal"]}
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
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
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

      {/* Edit Cover End */}

      {/*  Added Modal End */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className={style["content"]}
          contentLabel="Example Modal"
        >
          <div className={style.discModal}>
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className={style["titleModal"]}
            >
              Edit Information
            </h2>
            <CloseIcon
              onClick={closeModal}
              className={style["closeModal"]}
            ></CloseIcon>
            <hr />
          </div>
          {/* <div className={style['titleModal']}>Edit Information:</div> */}
          <Formik initialValues={initialValue} onSubmit={handle}>
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className={style.form_input}>
                  <label className={style['labelModal']} htmlFor="name">Name:</label>
                  <Field className={style['inputModal']} type="text" id="name" name="name" required />
                </div>
                <div className={style.form_input}>
                  <label className={style['labelModal']} htmlFor="phone">Phone:</label>
                  <Field className={style['inputModal']} type="tel" id="phone" name="phone" required />
                </div>
                <div className={style.form_input}>
                  <label className={style['labelModal']} htmlFor="address">Address:</label>
                  <Field
                    className={style['inputModal']}
                    type="text"
                    id="address"
                    name="address"
                    minLength="5"
                    maxLength="50"
                    required
                  />
                </div>

                <div className={style.form_input}>
                  <h5 className={style["labelModal"]}>Image:</h5>
                  <label className={style['labelModal']} htmlFor="img">
                  
                    <input
                      type="file"
                      id="img"
                      name="img"
                      onChange={(event) => handleImage(event, setFieldValue)}
                    />
                  </label>
                </div>
                <div className={style['form_btn_container']}>
                  <button className={style['form_btn']} type="submit" disabled={isSubmitting}>
                    save changes
                  </button>
                  <button className={style['form_btn']} type="submit" disabled={isSubmitting} onClick={closeModal}>
                    cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
      {/* Add Boat Modal  */}

      <div>
        <Modal
          isOpen={addBoatmodalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeAddBoatModal}
          className={style["content2"]}
          contentLabel="Example Modal"
        >
          <div className={style.discModal}>
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className={style["titleModal"]}
            >
              Add Boat
            </h2>
            <CloseIcon
              onClick={closeAddBoatModal}
              className={style["closeModal"]}
            ></CloseIcon>
            <hr />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={style["form_group"]}>
              <div className={style.form_input}>
                <h5 className={style["labelModal"]}>Boat Name</h5>
                <input
                  name="name"
                  type="text"
                  className={style["inputModal"]}
                  onChange={formik.handleChange}
                />
              </div>

              {/* <button type="button" className={style['btn btn-danger btn-block']} onClick={uploadFiles}>
                Upload
              </button> */}
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Boat Description</h5>
              <input
                name="description"
                type="text"
                onChange={formik.handleChange}
                className={style["inputModal"]}
              />
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Price per Hour</h5>

              <input
                name="price"
                type="number"
                className={style["inputModal"]}
                onChange={formik.handleChange}
              />
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Number of People</h5>
              <input
                name="number"
                type="number"
                className={style["inputModal"]}
                onChange={formik.handleChange}
              />
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Port</h5>
              <select
                name="portName"
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
              <h5 className={style["labelModal"]}>Type</h5>
              <select
                name="type"
                className={style["inputModal"]}
                onChange={formik.handleChange}
              >
                <option value="">Select Typet</option>
                <option value="Houseboat">Houseboat</option>
                <option value="Felucca">Felucca</option>
                <option value="Dahabiya">Dahabiya</option>
                <option value="swvl">swvl</option>
                <option value="shera3">shera3</option>
              </select>
            </div>

            <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Images</h5>
            </div>

            <div className="form-group multi-preview"
              style={{ width: "100%", display: "flex", flexDirection: "row" }}>
              {(fileArray || []).map((file) => (
                <div style={{
                  width: "600px",
                  height: "100px",
                  margin: "10px",
                  border: "1px solid black",
                }} key={fileArray.index}>
                  <img key={file.name} style={{ width: "100%" }} src={URL.createObjectURL(file)} alt="..." />
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="upload-file" className="file-label">
                <input type="file" id="upload-file" className="input-file" onChange={uploadMultipleFiles} multiple style={{left: '50px'}} />
              </label>
            </div>
            {/* <div className={style.form_input}>
              <h5 className={style["labelModal"]}>Images</h5>
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
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                onChange={uploadMultipleFiles}
                multiple
              />
            </div> */}
            <div className={style['form_btn_container']}>
              <button className={style['form_btn']} type="submit" onClick={closeAddBoatModal}>
                cancel
              </button>
              <button className={style['form_btn']} type="submit" value={"Submit"}>Add</button>
            </div>
          </form>
        </Modal>
      </div>

      {/* Add Boat Modal  End*/}

      <section>
        <div className={style["profile"]}>
          <div className={style["container"]}>
            <div className={style["profile-content"]}>
              <div className={style["profile-header"]}>
                <div className={style["prodile-cover-container"]}>
                  <div className={style["profile-cover"]}>
                    <img
                      src={`http://localhost:5000/${boatOwnerState?.coverImg}`}
                      alt=""
                    />
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
                      <button
                        type="button"
                        className={style["image-button-show"]}
                      >
                        <img
                          src={`http://localhost:5000/${boatOwnerState?.img}`}
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={style["edit-Icon"]}>
                  <i className={style["fa-solid fa-pencil fa-xl"]} />
                </div>
              </div>
              <div className={style["user-info"]}>
                <div className={style["user-name"]}>
                  <div className={style["name"]}>
                    <h1>{boatOwnerState.name}</h1>
                  </div>
                  <div className={style["title"]}>{boatOwnerState?.email}</div>
                  <div className={style["address"]}>
                    {boatOwnerState.address}
                  </div>
                  <div className={style["address"]}>{boatOwnerState?.phone}</div>
                  {/* <div className={style["address"]}>{boatOwner.boatOwnerData.createdAt}</div> */}
                </div>
                <div className={style["user-info-buttons"]}>
                  <div className={style["first-button"]}>
                    <button onClick={openAddBoatModal}>Add Boat</button>
                  </div>
                  <div className={style["second-button"]}>
                    <button onClick={openModal}>Edit Your Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OwnerCover;
