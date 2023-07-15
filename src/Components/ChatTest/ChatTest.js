import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ userId, boatOwnerId, tripId }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io();

    // Set the socket state variable
    setSocket(newSocket);

    // Emit 'chat-request' event when the user books a trip
    newSocket.emit('chat-request', { userId, boatOwnerId, tripId });

    // Listen for 'chat-started' event from the server
    newSocket.on('chat-started', ({ userId, boatOwnerId, tripId }) => {
      console.log(`Chat started between user ${userId} and boat owner ${boatOwnerId} about trip ${tripId}`);
    });

    // Listen for 'chat-message' event from the server
    newSocket.on('chat-message', ({ userId, boatOwnerId, tripId, message }) => {
      console.log(`Received message from ${userId === newSocket.id ? 'boat owner' : 'user'}: ${message}`);

      // Add the message to the chat history
      setChatHistory((prevChatHistory) => [...prevChatHistory, { sender: userId === newSocket.id ? 'boat owner' : 'user', message }]);
    });

    return () => {
      // Disconnect from the WebSocket server when the component unmounts
      newSocket.disconnect();
    };
  }, [userId, boatOwnerId, tripId]);

  const sendMessage = (event) => {
    event.preventDefault();

    // Emit 'chat-message' event to the server
    socket.emit('chat-message', { userId, boatOwnerId, tripId, message });

    // Add the message to the chat history
    setChatHistory((prevChatHistory) => [...prevChatHistory, { sender: 'user', message }]);

    // Clear the input field
    setMessage('');
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  if (!socket) {
    return <div>Loading chat...</div>;
  }

  return (
    <div>
      <ul>
        {chatHistory.map((chat, index) => (
          <li key={index}>
            <strong>{chat.sender}: </strong>
            {chat.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;