import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css'; // Ensure this is included

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Handle incoming messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off('message');
  }, []);

  // Register user
  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  // Log in user
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);
      setIsAuthenticated(true);
      fetchMessages(response.data.token);
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  // Fetch messages after login
  const fetchMessages = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/messages', {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Send message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { sender: username, content: newMessage };
      socket.emit('message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]); // Add the sent message to the UI
      setNewMessage('');
    }
  };

  // Handle back to login
  const handleBack = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setMessages([]);
    setToken('');
  };

  return (
    <div id="root">
      {!isAuthenticated ? (
        <div className="login-container">
          <h2>Welcome Back</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">Login</button>
          <button onClick={handleRegister} className="register-button">Register</button>
        </div>
      ) : (
        <>
          <div className="chat-header">
            <h2>Chat Room</h2>
            <button 
              onClick={handleBack} 
              style={{
                background: 'none',
                border: 'none',
                color: '#075e54',
                cursor: 'pointer',
                position: 'absolute',
                right: '10px',
                top: '10px',
                fontSize: '16px',
              }}
            >
              Back
            </button>
          </div>
          <div className="chat-title">Chat-O-Box</div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === username ? 'sent' : 'received'}`}
              >
                <strong>{message.sender}:</strong> {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>➤</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
