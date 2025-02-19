# E-commerce Backend API

An Express.js backend API for an e-commerce platform with product management, user authentication, and search functionality.

## Features

- User authentication (register/login) with JWT
- Product management (CRUD operations)
- Image upload support for products
- Product search with fuzzy matching
- MongoDB integration

## Setup

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Start the development server

```sh
npm run dev
```

## Folder Structure

```
ecommerce-backend/
│── src/                        # Main source code
│   ├── constants/              # Store contants
│   ├── controllers/            # Route controllers
│   │   ├── authController.ts
│   │   ├── favoriteController.ts
│   │   ├── productController.ts
│   │   ├── searchController.ts
│   ├── interfaces/             # Interfaces and types
│   │   ├── document.ts         # Interfaces for mongoose models
│   ├── lib/                    # Mongoose schemas/models
│   │   ├── db.ts               # Mongoose and MongoDB initialization
│   ├── routes/                 # Express route handlers
│   ├── middlewares/            # Custom middleware
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   ├── uploadMiddleware.ts
│   ├── models/                 # Mogoose models
│   │   ├── Product.ts
│   │   ├── ProductImage.ts
│   │   ├── User.ts
├── ├── routes/                  # Routes
│   │   ├── authRoutes.ts
│   │   ├── favoriteRoute.ts
│   │   ├── favoriteRoute.ts
│   │   ├── productRoute.ts
│   │   ├── searchRoute.ts
│   ├── utils/                  # Utility functions/helpers
│   │   ├── deleteFile.ts
│   │   ├── generateToken.ts
│   │   ├── hashPassword.ts
│   ├── app.ts                  # Express app initialization
│   ├── main.ts                 # Server entry point
│── uploads/                    # Store file uploads
│── .env                        # Environment variables
│── env.sample                  # Sample environment variables file
│── .gitignore                  # Git ignore file
│── package.json                # Dependencies & scripts
│── tsconfig.json               # TypeScript configuration (if using TS)
│── README.md                   # Project documentation
```

