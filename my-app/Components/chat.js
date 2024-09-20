import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  // Function to send a message
  const sendMessage = (message) => {
    setMessages((prev) => [...prev, { sender: 'User', content: message }]);
    setInput('');
    
    // Call the chatbot function
    getChatbotResponse(message);
  };

  // Function to get a response from the chatbot
  const getChatbotResponse = async (message) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo', // or the model you are using
        messages: [{ role: 'user', content: message }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'Chatbot', content: botMessage }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-title">Chat-O-Box</h1>
        <button className="back-button">Back</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'User' ? 'sent' : 'received'}`}>
            <span>{msg.sender}: {msg.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => sendMessage(input)}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
