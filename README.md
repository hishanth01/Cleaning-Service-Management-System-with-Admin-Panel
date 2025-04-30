# Cleaning Service Management Web Application

This is a full-stack web application for managing cleaning service bookings. It includes a React frontend and a Node.js/Express backend with MongoDB for data storage.

## Features

- User registration and login
- Admin login
- Add and manage cleaning services
- Book cleaning services with date/time and address
- View, edit, and cancel bookings (user and admin panels)
- Responsive UI with React

## Project Structure

- `cleaningservice/` - React frontend application
- `backend/` - Node.js/Express backend API
- `backend/src/models/` - Mongoose models for users and bookings
- `backend/src/routes/` - Express routes for users, bookings, and admin
- `cleaningservice/src/components/` - React components including booking lists and services
- `cleaningservice/src/pages/` - React pages for login, registration, dashboard, booking form

## Prerequisites

- Node.js and npm installed
- MongoDB database (MongoDB Atlas recommended)
- Git installed

## Setup and Run Locally

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set your MongoDB connection string in the code or use environment variables.

4. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `cleaningservice` directory:
   ```
   cd cleaningservice
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

4. The frontend will be available at `http://localhost:3000`.

## Deployment

### Frontend

- Deploy the React app on Vercel by connecting your GitHub repository.
- Set the build command to `npm run build` and output directory to `build`.
- Update API URLs in the frontend to point to your deployed backend.

### Backend

- Deploy the backend on Heroku, Render, or Railway.
- Set environment variables for your MongoDB connection string.
- Ensure the backend is accessible publicly for the frontend to consume.

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/signin` - User login
- `POST /bookings` - Add a new booking
- `GET /bookings` - Get all bookings
- `PUT /bookings/:id` - Update a booking
- `DELETE /bookings/:id` - Delete a booking
- `GET /admin/getservice` - Get list of services (admin)

## Notes

- Passwords are stored in plain text (for demo purposes). Use hashing for production.
- Ensure CORS is configured properly for frontend-backend communication.
- User sessions are managed via sessionStorage in the frontend.

## Contact

For any questions or issues, please contact the developer.

---
