# Product Management System

This is a full-stack Product Management System made as an assignment.

## Features

* User registration and login
* JWT authentication
* Access token and refresh token
* User logout
* Protected routes
* Admin authorization
* Add products
* View products
* Edit products
* Delete products
* Product image upload
* Form validation

## Tech Used

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Express Validator
* Multer
* ImageKit
* bcrypt

## Authentication

The project uses JWT for authentication.

There are two roles:

* **User:** Can view products
* **Admin:** Can add, edit and delete products


Create a `.env` file in the backend and add the required MongoDB, JWT and ImageKit credentials.

## API

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/refresh-token`
* `DELETE /api/auth/logout`
* `GET /api/auth/me`

### Products

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products` 
* `PUT /api/products/:id` — Admin only
* `DELETE /api/products/:id` — Admin only

## Note

This project was created as part of a backend/full-stack development assignment.
