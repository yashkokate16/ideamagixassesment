# IdeaMagix Assessment

A full-stack MERN application developed as part of the IdeaMagix technical assessment.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- HTTP-only Cookies
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Features

- User registration and login
- JWT-based authentication
- Access and refresh tokens
- HTTP-only authentication cookies
- Protected routes
- Role-based access
- Admin dashboard
- Instructor management
- Course management
- Lecture management
- REST APIs
- MongoDB integration

## User Roles

### Admin
- Login
- Access the admin dashboard
- View instructors
- Manage courses
- Manage lectures

### Instructor
Instructor access is restricted to the features assigned to the instructor role.

## Project Structure

```text
project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── state/
│   │   └── services/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Environment Variables

### Backend

Create a `.env` file inside the server directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLIENT_URL=http://localhost:5173
```

### Frontend

Create a `.env` file inside the client directory:

```env
VITE_SERVER_URL=http://localhost:3000
```

For production:

```env
VITE_SERVER_URL=https://ideamagixassesment-eslz.vercel.app
```

**Never commit `.env` files or secret keys to GitHub.**

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

## Authentication

The application uses JWT authentication.

After successful login:

- Access token is stored in an HTTP-only cookie.
- Refresh token is stored in an HTTP-only cookie.
- Protected APIs verify authentication.
- Production cookies use secure cross-site settings.
- Frontend API requests send credentials.

## API Routes

### Authentication

```text
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
```

### Admin - Instructors

```text
GET /admin/instructors
```

### Admin - Courses

```text
/admin/courses
```

### Lectures

```text
/lectures
```

## Deployment

### Backend

The backend is deployed on Vercel:

```text
https://ideamagixassesment-eslz.vercel.app
```

### Frontend

The frontend is deployed on Vercel.

Production frontend environment variable:

```env
VITE_SERVER_URL=https://ideamagixassesment-eslz.vercel.app
```

Production backend environment variables should include:

```env
NODE_ENV=production
CLIENT_URL=https://your-vercel-domain.vercel.app
```

Make sure MongoDB Atlas allows the deployed backend to connect.

## Important

- Do not expose JWT secrets or database credentials.
- Add `.env` to `.gitignore`.
- Set `NODE_ENV=production` on Render.
- Set the correct Vercel frontend URL as `CLIENT_URL`.
- Set the Vercel backend URL as `VITE_SERVER_URL`.

## Author

**Yash Kokate**

MERN Stack Developer
