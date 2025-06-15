# Realtime Auth & Socket App

A full-stack web application featuring JWT-based authentication, rate limiting with Redis, encrypted socket communication, and Dockerized architecture using Node.js, React, MongoDB, and Redis.

## Features
-  User Signup & Login (JWT Auth)
-  Rate Limiting: 10 requests per minute (Redis)
-  Realtime communication with encrypted Socket.IO messages
-  AES-256 encryption/decryption for sockets
-  MongoDB for data storage (Dockerized)
-  Fully Dockerized (Frontend + Backend + MongoDB + Redis)
-  Built with Vite + React + TypeScript

## Project Structure
  client/..  # React frontend
  server/..  # Express backend
  docker-compose.yml
  README.md

## How to Run Locally
- Docker + Docker Compose installed
- Clone this repo:
- Start the app
-  // docker-compose up --build
-  Frontend: http://localhost:5173
-  Backend: http://localhost:5000

## API Endpoints
- POST	==>  /api/auth/signup	   ==>Register a new user
- POST	==> /api/auth/login	     ==>Login existing user
- GET	  ==> /api/user/me	       ==>Get current user (JWT)

