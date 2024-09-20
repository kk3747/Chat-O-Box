## Introduction
Name : Krishna Kant
Email : 3747krishna@gmail.com
University : Indian Institute of Technology , Patna
Dept : Computer Science and Engineering

## Overview
Chat-O-Box is a real-time messaging application inspired by WhatsApp, featuring user registration, text messaging, group chat functionality, and an AI-powered chatbot for user assistance. 

## System Design Document

### Architecture

The application follows a client-server architecture:

- **Frontend**: Built with React using Vite for a fast development experience.
- **Backend**: Built with Node.js and Express, handling REST API requests and WebSocket connections for real-time messaging.
- **Database**: MongoDB is used for storing user information and messages.

### Components

1. **Frontend**:
   - **Chat Component**: Displays chat messages and allows user input.
   - **User Authentication**: Handles user registration and login.
   - **Chatbot Integration**: Connects to the OpenAI API for chatbot responses.

2. **Backend**:
   - **User Management**: REST APIs for user registration and login.
   - **Message Management**: WebSocket for real-time message broadcasting and REST API for fetching messages.
   - **Chatbot API Integration**: Sends user messages to OpenAI for generating responses.

### Technology Stack

- **Frontend**:
  - React: For building the user interface.
  - Axios: For making HTTP requests to the backend and OpenAI API.
  
- **Backend**:
  - Node.js: Server-side JavaScript runtime.
  - Express: Web framework for building APIs.
  - Socket.io: Enables real-time communication between clients and the server.
  - Mongoose: ODM for MongoDB to simplify database interactions.
  - Bcrypt: For hashing passwords.
  - JWT: For user authentication.

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud instance)
- OpenAI API key (for chatbot functionality)