import React, { useRef } from 'react'
import { useState } from 'react';
import chat from './chat.png'
import style from './chat.module.css'
import { useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import {motion} from 'framer-motion'
import axios from 'axios';
import { formatTime, renderMessageTime } from '../../Services/functions';
const socket = io('http://localhost:5000');

function Chat() {
  const { boatOwner } = useSelector(state => state.UserSlice)
  const { user } = useSelector(state => state.UserSlice)
  const [formDisplay, setFormDisplay] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [RecievedMessages, setRecievedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(false);
  const [inputMessage2, setInputMessage2] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [author, setAuthor] = useState(null);
  const [userMessageImg, setuserMessageImg] = useState(null);
  const [chatNow, setChatNow] = useState(true);
  const [authorID, setAuthorId] = useState(null);
  const [chats, setChats] = useState([]);
  const  messageSound = useRef(null);
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
  const id =  Cookies.get("userId")
  if(id){
    axios.get(`http://localhost:5000/user/userTrips/accepted/${id}`).then((res)=>{
      setChats(res.data)

    })
    console.log(id);
    console.log("woork");
    socket.on('trip-request-accepted', (data) => {
      console.log(data);
      const { tripData, notification, chatRoomId ,owner,userData} = data;
      if(tripData.clientId===id){
        socket.emit('join_room', chatRoomId);
        setFormDisplay(!formDisplay);
        console.log('Trip Request Accepted:', tripData);
        console.log('Notification:', notification);
        console.log('Chat Room ID:', chatRoomId);
        setRoomId(chatRoomId)
        setAuthor(userData[0]?.name)
        setAuthorId(userData[0]?._id)
        setuserMessageImg(owner[0]?.img)
        console.log(userData,"userDatauserDatauserData");
        setUserMessages(tripData.userMessages)
        setRecievedMessages(tripData.boatOwnerMessages)
        setChatNow(false)

      }
      
    });

  
  }

  
}, []);
;
console.log(chats,"cxzcxvvv");
// Owner 
useEffect(() => {
  
  const boatOwnerId =  Cookies.get("boatOwnerId")
    console.log(boatOwnerId);
  if(boatOwnerId){
    axios.get(`http://localhost:5000/boatOwner/getAllCurrentTrips/${boatOwnerId}`).then((res)=>{
      console.log(res.data,"dataaaa");
      setChats(res.data)

    })
    console.log("owner Here");
    socket.on('trip-request-accepted', (data) => {
      // console.log(data);
      const { tripData, notification, chatRoomId ,owner,userData} = data;
      console.log(owner)
      if(owner[0]?._id===boatOwnerId){
        setAuthor(owner[0]?.name)
        setAuthorId(owner[0]?._id)
        setuserMessageImg(userData[0]?.img)
        console.log(userMessageImg);
        socket.emit('join_room', chatRoomId);
        console.log('Chat Room ID:', chatRoomId);
        setRoomId(chatRoomId)
        setUserMessages(tripData.boatOwnerMessages)
        setRecievedMessages(tripData.userMessages)

      
      }
      
    });
   
  }
  
}, []);

useEffect(()=>{
  socket.on('receive_message', (data) => {
    setIsReceived(true)
    playSound();
    console.log(data);
    setRecievedMessages((prevArray) => [...prevArray, data])

    });
},[socket ])

const sendMessages = async()=>{
  if(inputMessage !=="" && roomId !==""){
   const messageData = {
      room: roomId,
      author : author,
      message:inputMessage,
      time:new Date(Date.now())
    }
    setUserMessages((prevArray) => [...prevArray, messageData])
    axios.put(`http://localhost:5000/chatMessage`,{
      TripId:messageData.room,
      sender:authorID,
      message:messageData.message,
      time:messageData.time
    }).then((res)=>{
      console.log(res,"tttthjt");
    })  
    
    await socket.emit('send_message',messageData)
  }
  console.log(author);

}


  return (
  
<>
<div className={style["chat-popup"]} id="myForm">
<audio ref={messageSound}  src={require('../../assets/message.mp3')}/>


<motion.img 


onClick={toggleForm}



src={chat} 



className={style["chat-img"]} />
{formDisplay && (
        <div className={style["chat-popup-content"]}>
          {/* Form content goes here */}

       
         <div className={style["chat_chat_container"]}>
       


        



        {/* right */}
        <ScrollToBottom>
        <div className={style["chat_chat_right"]}>
        <div  className={style["chat_chat_right_con"]}>

        <div className={style["header-chat"]}>
            <i className="icon fa fa-user-o" aria-hidden="true" />
            <p className= {style["name"]}>Megan Leib</p>
            <i className="icon clickable fa fa-ellipsis-h right" style={{  marginLeft: "200px", color:"#515151",fontSize: "14pt",}} aria-hidden="true" />
          </div>
       

       
        <div  className={style["chat_chat_left_conversation"]}>
  
        <div className={style["conv_one"]}>
        
        
         <div  className={style["online"]} />
            
            {/* Owner Messages  */}
            <div className={style["p_flex_chat"]}>
           

            {
              RecievedMessages.map((item)=>{ 
                return  <div  style={{  width: "100px"}}>
                      <>
                      <div style={{position:'relative'}}>

                      <img className={style["chat-photo"]} src={`http://localhost:5000/${userMessageImg}`} alt=''/> 
                      <div className={style["online"]}></div>
                      </div>
                      <span>{renderMessageTime(item.time)}</span>
                      <p>{item.author}</p>
                    
                      <p >{item.message}</p>
                      </>
                      </div>

                  })
                }
              
              </div>
            </div>

              {/* User Messages */}
            <div className={style["conv_tow"]}>
              

                {
                  userMessages.map((item)=>{
                    return  <div className="name" style={{  width: "100px"}}>
                      <span>{renderMessageTime(item.time)}</span>
                      <p>{item.author}</p>
                      <p  className={style["sent"]}>{item.message}</p>
                      
                      
                      </div>
                    
                  })
                }
                {/* chatssss */}
                {
                  chats.map((item)=>{
                    return  <div
                      onClick={()=>{
                        socket.emit('join_room', item._id);
                        setUserMessages(item.userMessages)
                        console.log(userMessages,"dssdadasa");

                      }}  
                    className="name" style={{  width: "100px"}}>
                      <span>{item._id}</span>
                      <p>{item.boatId.name}</p>
                      {/* <p  className={style["sent"]}>{item.message}</p> */}
                      
                      
                      </div>
                    
                  })
                }
                
            </div>

        </div>
       

        <div  className= {style["footer-chat"]}>
        
        <input
        disabled={chatNow}
        onKeyPress={(event)=>{
          event.key==="Enter" && sendMessages()
        }}
        
        
            // disabled
         
      
        onChange={(e)=>
          
          setInputMessage(e.target.value)} type="text" className ={style["write-message"]}  
          
          placeholder={!chatNow ? "Type your message here" : " You Can't Send Message Now"}/>

        <i onClick={()=>{
          
         
            sendMessages()
              
            
       

     
         
        }} className={`${style.icon} fa-regular fa-paper-plane  ${style.clickable}`}  aria-hidden="true" />
      

      
      </div>
          </div>



          

        </div>
        </ScrollToBottom>
        </div>
      
      </div>
      )}


</div>

    

</>

   
  )
  
}

export default Chat