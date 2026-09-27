# MERN Product Management

This is a full-stack Product Management System built using the MERN stack.

## Features

- User Registration
- User Login
- JWT Authentication
- Access Token and Refresh Token
- Logout
- Protected Routes
- Admin Authorization
- Add Products
- View Products
- Edit Products
- Delete Products
- Product Image Upload
- Form Validation
- MongoDB Database

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Express Validator
- Multer
- ImageKit
- bcrypt

## Authentication

The project uses JWT authentication with access and refresh tokens.

There are two roles:

- **User:** Can view products
- **Admin:** Can add, edit and delete products

## Product Management

Admin can:

- Add a new product
- Upload product image
- Update product details
- Delete products

Users can view the available products.

## API Routes

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `DELETE /api/auth/logout`
- `GET /api/auth/me`

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` 
- `PUT /api/products/:id` — Admin only
- `DELETE /api/products/:id` — Admin only

## Environment Variables

Create a `.env` file inside the Server folder.

Required variables include:

- `MONGODB_URI`
- `ACCESS_SECRET_KEY`
- `REFRESH_SECRET_KEY`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`

The `.env` file is not included in the GitHub repository for security reasons.

cd Server
npm install
npm run dev
