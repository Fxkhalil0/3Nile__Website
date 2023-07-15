import React, { useRef } from 'react'
import { useState } from 'react';
import chat from './chat.png'
import style from './chat.module.css'
import { useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import { motion } from 'framer-motion'
import axios from 'axios';
import { formatTime, renderMessageTime } from '../../Services/functions';
import EmojiPicker from 'emoji-picker-react'; // Import the emoji picker component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socket = io('http://localhost:5000');

function Chat() {
  const { boatOwner } = useSelector(state => state.UserSlice)
  const { user } = useSelector(state => state.UserSlice)
  const [formDisplay, setFormDisplay] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [RecievedMessages, setRecievedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('aaa');
  const [inputMessage2, setInputMessage2] = useState('aaxx');
  const [valueAfterSubmit, setvalueAfterSubmit] = useState('');
  const [isReceived, setIsReceived] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [author, setAuthor] = useState(null);
  const [userMessageImg, setuserMessageImg] = useState(null);
  const [recieverName, setRecieverName] = useState(null);
  const [senderImg, setSenderImg] = useState(null);
  const [chatNow, setChatNow] = useState(true);
  const [chatName, setchatName] = useState('Chat With ');
  const [authorID, setAuthorId] = useState(null);
  const [recieverId, setrecieverId] = useState(null);
  const [chats, setChats] = useState([]);
  const messageSound = useRef(null);
  const [ActiveRoom, setActiveRoom] = useState(null);
  const [Comedroom, setComedRoom] = useState(null);


  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    console.log(emoji, "ddddddadas");
    const { native } = emoji.emoji;

    // Insert the selected emoji into the input field
    setSelectedEmoji(native);

    // Set focus back to the input field
    inputRef.current.focus();
    const emojiObject = {
      activeSkinTone: emoji.activeSkinTone,
      emoji: emoji.emoji,
      names: emoji.names[0],
      unified: emoji.unified,
      getImageUrl: function getImageUrl(emojiStyle) {
        // Function implementation for getting the image URL
      },
      // ... other properties and methods
    };

    const emojiSpan = document.getElementById("emojiSpan");

    setInputMessage((prevMessage) => prevMessage + "  " + emojiObject.emoji);
    setvalueAfterSubmit((prevMessage) => prevMessage + "  " + emojiObject.emoji);

  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const playSound = () => {
    if (messageSound.current) {
      messageSound.current.play();
    }
  };
  const toggleForm = () => {
    setFormDisplay(!formDisplay);
  };

  // // Send message
  // socket.emit('chat-message', roomId, message);

  // // Receive message
  // socket.on('chat-message', (message) => {
  //   // Handle the received message
  // });
  useEffect(() => {

    if (user || boatOwner) {
      setShowChat(true)
    }

    const id = Cookies.get("userId")
    if (id && user !== null) {
      setSenderImg(user.userData?.img)
      axios.get(`http://localhost:5000/user/userTrips/accepted/${id}`).then((res) => {
        setChats(res.data)

      })
      // console.log(id);
      // console.log("woork");
      socket.on('trip-request-accepted', (data) => {
        setSenderImg(user.userData?.img)
        axios.get(`http://localhost:5000/user/userTrips/accepted/${id}`).then((res) => {
          setChats(res.data)
        })

        // console.log(data);
        const { tripData, notification, chatRoomId, owner, userData } = data;
        if (tripData.clientId === id) {
          socket.emit('join_room', chatRoomId);
          setFormDisplay(!formDisplay);
          // console.log('Trip Request Accepted:', tripData);
          // console.log('Notification:', notification);
          // console.log('Chat Room ID:', chatRoomId);
          setRoomId(chatRoomId)
          setAuthor(userData[0]?.name)
          setAuthorId(userData[0]?._id)
          setuserMessageImg(owner[0]?.img)
          // console.log(userData,"userDatauserDatauserData");

          setChatNow(false)

        }



      });

      socket.on('Owner-finished-Trip', (data) => {
        axios.get(`http://localhost:5000/user/userTrips/accepted/${id}`).then((res) => {
          setChats(res?.data)

        })



      });
    }


  }, []);
  ;
  // console.log(chats,"cxzcxvvv");
  // Owner 
  useEffect(() => {

    const boatOwnerId = Cookies.get("boatOwnerId")
    // console.log(boatOwnerId);
    if (boatOwner !== null) {
      setSenderImg(boatOwner.boatOwnerData?.img)

      axios.get(`http://localhost:5000/boatOwner/getAllCurrentTrips/${boatOwnerId}`).then((res) => {
        // console.log(res?.data,"datdasdasaaaa");
        setChats(res?.data)

      })
      // console.log("owner Here");
      socket.on('trip-request-accepted', (data) => {
        axios.get(`http://localhost:5000/boatOwner/getAllCurrentTrips/${boatOwnerId}`).then((res) => {
          // console.log(res?.data,"datdasdasaaaa");
          setChats(res?.data)

        })
        // console.log(data);
        const { tripData, notification, chatRoomId, owner, userData } = data;
        // console.log(owner)
        if (owner[0]?._id === boatOwnerId) {
          setAuthor(owner[0]?.name)
          setAuthorId(owner[0]?._id)
          setuserMessageImg(userData[0]?.img)
          // console.log(userMessageImg);
          socket.emit('join_room', chatRoomId);
          console.log('Chat Room ID:', chatRoomId);
          setRoomId(chatRoomId)



        }

      });
      socket.on('Owner-finished-Trip', (data) => {
        axios.get(`http://localhost:5000/boatOwner/getAllCurrentTrips/${boatOwnerId}`).then((res) => {
          // console.log(res?.data,"datdasdasaaaa");
          setChats(res?.data)

        })



      });

    }
    // console.log(chats,"mc")

  }, []);

  useEffect(() => {
    const boatOwnerId = Cookies.get("boatOwnerId")
    const userId = Cookies.get("userId")

    let auth;
    socket.on('receive_message', (data) => {
      console.log(data.message, "messsage")
      setIsReceived(true)
      playSound();
      auth = data?.authorId
      if (user) {

        if (userId === data?.to) {
          let active = localStorage.getItem('activeChatId')
          if (active === data?.room) {
            console.log(data?.room === active, "resultAfterr");
            axios.get(`http://localhost:5000/user/userTrip/${active}`).then((res) => {
              setuserMessageImg(res.data.ownerData[0].img)
              setRecieverName(res.data.ownerData[0].name)
              setUserMessages(res?.data?.userTrip?.userMessages)
              setRecievedMessages(res?.data?.userTrip?.boatOwnerMessages)
              setrecieverId(res.data.ownerData[0]._id)
            })
            console.log(data?.message, "data.message")
            console.log("DAta Was Reseeeved to user")
          }
          else {
            setComedRoom(data?.room)

          }
        }
      }

      else if (boatOwner) {

        if (boatOwnerId === data.to) {
          let active = localStorage.getItem('activeChatId')
          if (active === data.room) {
            axios.get(`http://localhost:5000/user/userTrip/${active}`).then((res) => {
              setUserMessages(res?.data?.userTrip?.boatOwnerMessages)
              setRecievedMessages(res?.data?.userTrip?.userMessages)
            })

            // setRecievedMessages((prevState) => [...prevState, {message:data.message,time:data.time}]);
          }
        }
        console.log("DAta Was Reseeeved to Owner")
      }
      //  axios.get(`http://localhost:5000/user/userTripData/${data?.room}`).then((res) =>{
      //    console.log(res.data,"userTripData")
      //    console.log(auth,"authhh")
      //     if(boatOwnerId!==null && auth===res.data.clientId){
      //       console.log("matched")
      //       setUserMessages(res?.data?.boatOwnerMessages)
      //       setRecievedMessages(res?.data?.userMessages)

      //     }

      //   })

      // if(user){
      //   axios.get(`http://localhost:5000/user/userTrip/${data?.room}`).then((res)=>{
      //     setuserMessageImg(res.data.ownerData[0].img)
      //     setRecieverName(res.data.ownerData[0].name)
      //     // setUserMessages(res?.data?.userTrip?.userMessages)
      //     // setRecievedMessages((prevState) => [...prevState, data.message])
      //   })

      //   // setSenderImg(user.userData?.img)
      //   // setAuthor(user.userData?.name)
      //   // setAuthorId(user.userData?._id)

      // }
      // else if (boatOwner){

      // axios.get(`http://localhost:5000/user/userInfo/${auth}`).then((res)=>{
      //   setuserMessageImg(res?.data?.img)
      // setRecieverName(res?.data?.name)
      // })
      // axios.get(`http://localhost:5000/user/userTrip/${data?.room}`).then((res)=>{
      //   setUserMessages(res?.data?.userTrip?.boatOwnerMessages)
      //   setRecievedMessages(res?.data?.userTrip?.userMessages)
      // })

      //   // setSenderImg(boatOwner?.boatOwnerData?.img)

      //   // setAuthor(boatOwner?.boatOwnerData?.name)
      //   // setAuthorId(boatOwner?.boatOwnerData?._id)


      // }









      // User In Room Or Not ,Then Fetch Messages ,
      // counter 
      // heree  + user online or offline 
      // if(user!=null){
      //   axios.get(`http://localhost:5000/user/userTrip/${data?.room}`).then((res)=>{

      //     setUserMessages(res?.data?.userTrip?.userMessages)
      //     setRecievedMessages(res?.data?.userTrip?.boatOwnerMessages)
      //   })

      // }
      // else if (boatOwner!=null){
      //   axios.get(`http://localhost:5000/user/userTrip/${data?.room}`).then((res)=>{
      //     setuserMessageImg(res.data.ownerData[0].img)
      //     setUserMessages(res?.data?.userTrip?.boatOwnerMessages)
      //     setRecievedMessages(res?.data?.userTrip?.userMessages)
      //   })
      // } 
    });
  }, [socket, roomId])

  const sendMessages = async () => {
    if (inputMessage !== "" && roomId !== "") {
      const messageData = {
        room: roomId,
        author: author,
        authorId: authorID,
        to: recieverId,
        message: inputMessage,
        time: new Date(Date.now())
      }
      setUserMessages((prevArray) => [...prevArray, messageData])
      axios.put(`http://localhost:5000/chatMessage`, {
        TripId: messageData.room,
        sender: authorID,
        message: messageData.message,
        time: messageData.time
      }).then((res) => {
      })

      await socket.emit('send_message', messageData)
    }

    // console.log(author);
    setInputMessage('')
    setShowEmojiPicker(false)
  }

  const [activeChatId, setActiveChatId] = useState(null);

  const handleChatClick = (item) => {
    localStorage.setItem('activeChatId', item?._id)
    setActiveChatId(item._id);
  };


  const chatRef = useRef(null);
  // useEffect(()=>{

  //   const handleDocumentClick = (event) => {
  //     if (chatRef.current && !chatRef.current.contains(event.target)) {
  //       setFormDisplay(false);
  //     }
  //   };

  //   document.addEventListener('click', handleDocumentClick);

  //   return () => {
  //     document.removeEventListener('click', handleDocumentClick);
  //   };
  // }, []);

  return (


    <>
      {
        showChat &&
        <>


          <div className={style["chat-popup"]} id="myForm" ref={chatRef}>
            <audio ref={messageSound} src={require('../../assets/message.mp3')} />


            <motion.img


              onClick={toggleForm}



              src={chat}



              className={style["chat-img"]} />
            {formDisplay && (



              <div className={style["chat-popup-content"]}>

                {
                  chats.length !== 0 ?


                    <>

                      {/* Form content goes here */}




                      <div className={style["chat_chat_container"]}>



                        <div className={style["chat_chat_left"]}>
                          {chats &&



                            chats?.map((item) => {
                              const isActive = activeChatId === item?._id; // Check if the item is the active chat room
                              const isRoomActive = isActive || (Comedroom === item?._id); // Check if the room is either active or has a new message
                              const shouldFlash = !isActive && (Comedroom === item?._id); // Check if the room is not active and has a new message
                              return <div
                                key={item._id}
                                className={`${style['chat_left-content']} ${isActive ? style['chat_left-content-active'] : ''} ${shouldFlash ? style['chat_left-content-flash'] : ''}`}


                                onClick={() => {
                                  setActiveRoom(item?._id)
                                  handleChatClick(item)
                                  socket.emit('join_room', item?._id);
                                  console.log("joined To ", item?._id);
                                  console.log("dcxzcczcxz ", item);
                                  setChatNow(false)
                                  setRoomId(item?._id)
                                  console.log(roomId, "AfterClick")
                                  setchatName(item?.boatId?.name)
                                  // 
                                  if (user) {
                                    axios.get(`http://localhost:5000/user/userTrip/${item?._id}`).then((res) => {
                                      setuserMessageImg(res.data.ownerData[0].img)
                                      setRecieverName(res.data.ownerData[0].name)
                                      setUserMessages(res?.data?.userTrip?.userMessages)
                                      setRecievedMessages(res?.data?.userTrip?.boatOwnerMessages)
                                      setrecieverId(res.data.ownerData[0]._id)
                                    })

                                    setSenderImg(user.userData?.img)
                                    setAuthor(user.userData?.name)
                                    setAuthorId(user.userData?._id)

                                  }
                                  else if (boatOwner) {

                                    axios.get(`http://localhost:5000/user//userInfo/${item?.clientId}`).then((res) => {
                                      setuserMessageImg(res?.data?.img)
                                      setRecieverName(res?.data?.name)
                                      setrecieverId(res?.data?._id)
                                    })
                                    axios.get(`http://localhost:5000/user/userTrip/${item?._id}`).then((res) => {
                                      setUserMessages(res?.data?.userTrip?.boatOwnerMessages)
                                      setRecievedMessages(res?.data?.userTrip?.userMessages)
                                    })

                                    setSenderImg(boatOwner?.boatOwnerData?.img)

                                    setAuthor(boatOwner?.boatOwnerData?.name)
                                    setAuthorId(boatOwner?.boatOwnerData?._id)


                                  }

                                }}
                              >
                                <div className={style["chat_chat_left-Trip"]}>

                                  <img className={style["chat-photo"]} src={`http://localhost:5000/${item?.boatId?.images[0]}`} alt='' />
                                  <div>
                                    <p>{item?.boatId?.name}</p>
                                    <p className={style["chat_chat_left-port-Details"]}> Port: {item?.boatId?.portName}</p>
                                  </div>

                                </div>
                                <div className={style["chat_chat_left-Trip-Details"]}>


                                  {/* <span>Trip time: {formatTime(item?.startTime)} To {formatTime(item?.endTime)}</span> */}
                                  {/* <p className={style["chat_chat_left-port-Details"]}> Port: {item?.boatId?.portName}</p> */}
                                </div>
                                <p className={style["sent"]}>{item.message}</p>


                              </div>

                            })

                          }


                        </div>





                        {/* right */}


                        <ScrollToBottom

                          mode='bottom'

                          className={style["chat_chat_right_conteeeent"]}
                          scrollToBottomClassName={style["scroll-to-bottom-button"]} // Add this line

                        >
                          <h1 className={style['chat_chat_right_Talking-With']}>
                            {
                              !chatNow &&
                              <span className={style['onlineUser']}></span>
                            }
                            {chatName}</h1>
                          <div className={style['chat_chat_right_concxzt']}>

                            <>

                              <div className={style["chat_chat_right"]}>
                                <div className={style["chat_chat_right_con"]}>





                                  <div className={style["chat_chat_left_conversation"]}>

                                    <div className={style["conv_one"]}>


                                      <div className={style["online"]} />

                                      {/* Owner Messages  */}
                                      <div className={style["p_flex_chat"]}>


                                        {
                                          RecievedMessages.map((item, index) => {
                                            return <div key={index} className={style["chat-content-left"]} style={{ width: "100px" }}>
                                              <>
                                                <div style={{ position: 'relative' }}>
                                                  <div className={style["chat-senderInfo"]}>

                                                    <img className={style["chat-photo"]} src={`http://localhost:5000/${userMessageImg}`} alt='' />
                                                    {/* <p className={style["senderInfo_name"]}>{recieverName}</p> */}
                                                    <div className={style["chat-Message-Content"]}>

                                                      <p className={style["chat-Message-message"]}>{item.message}</p>
                                                      <span className={style["chat-Message-Time"]}>{renderMessageTime(item.time)}</span>
                                                    </div>
                                                  </div>
                                                  <div className={style["online"]}></div>
                                                </div>




                                              </>
                                            </div>

                                          })
                                        }

                                      </div>
                                    </div>

                                    {/* User Messages */}
                                    <div className={style["conv_tow"]}>


                                      {
                                        userMessages?.map((item) => {
                                          return <div className={style["chat-content-Right"]} >
                                            <div className={style["chat-senderInfo_right"]}>

                                              <div className={style["chat-Message-Content_Right"]}>

                                                <p className={style["chat-Message-message_Right"]}>{item.message}</p>
                                                <span className={style["chat-Message-Time_Right"]}>{renderMessageTime(item.time)}</span>
                                              </div>
                                              <img className={style["chat-photo"]} src={`http://localhost:5000/${senderImg}`} alt='' />
                                              {/* <p className={style["senderInfo_name_Right"]}>{author}</p> */}
                                            </div>

                                          </div>

                                        })
                                      }
                                      {/* chatssss */}


                                    </div>

                                  </div>

                                        {/* Render the emoji picker */}
                                    {showEmojiPicker && (
                                      <EmojiPicker
                                      style={{width:'100%', height:'200px'}}
                                      
                                      onEmojiClick={handleEmojiSelect} />
                                    )}   
                                  <div className={style["footer-chat"]}>
                                    <span id="emojiSpan"></span>
                                    <input
                                      ref={inputRef}
                                      value={valueAfterSubmit}
                                      disabled={chatNow}
                                      onKeyPress={(event) => {
                                        event.key === "Enter" && sendMessages() && setvalueAfterSubmit('')

                                      }}


                                      // disabled


                                      onChange={(e) => {

                                        setvalueAfterSubmit(e.target.value)
                                        setInputMessage(e.target.value)
                                      }


                                      } type="text" className={style["write-message"]}
                                      placeholder={!chatNow ? "Type your message here" : " You Can't Send Message Now"}



                                      style={{ border: "none", outline: "none" }}

                                    />
                                    {
                                      ActiveRoom &&
                                      <i class="fa-sharp fa-regular fa-face-smile"
                                        style={{ color: "white", outline: "none" }}
                                        onClick={toggleEmojiPicker}

                                      ></i>
                                    }


                                 
                                    {
                                      valueAfterSubmit &&

                                      <i onClick={() => {




                                        sendMessages() && setvalueAfterSubmit('')





                                      }} className={`${style.icon} fa-regular fa-paper-plane  ${style.clickable}`} aria-hidden="true" />
                                    }


                                  </div>

                                </div>





                              </div>
                            </>
                          </div>
                        </ScrollToBottom>
                      </div>
                    </>

                    :
                    <>
                      <div className={style["chat-popup-content-No-Chat"]}>

                        <h1 className={style["chat-popup-content-No-Chat-content"]}>No Chats Yet !</h1>
                      </div>

                    </>
                }
              </div>






            )}


          </div>


        </>
      }

    </>


  )

}

export default Chat