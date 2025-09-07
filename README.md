# Online Shopping Portal (SHOPPER)

A modern, full-stack e-commerce application built with Django REST Framework (backend) and React (frontend). 
This platform provides a seamless shopping experience with dynamic product browsing, secure user authentication with admin approval, and comprehensive order management.

# 🚀 Features
- User Authentication & Authorization
  - Secure user registration with an Admin Approval workflow.
  - JWT-based user login and logout.
  - Dynamically updated UI based on user's authentication state.
  - Password hashing and protected API endpoints.

- Product Catalog
  - Dynamic product listings fetched from the backend.
  - Product details page with descriptions managed from the admin panel.
  - Multi-level category and subcategory browsing (e.g., Clothes -> Men).
  - Dynamic, admin-managed homepage carousel for featured content.

- Search & Discovery
  - Navbar search bar with autocomplete/suggestion functionality.
  - Category-specific product filtering.
  - Sort functionality on category pages (Latest, Price Low-to-High, Price High-to-Low).

- Shopping Cart & Checkout
  - Persistent shopping cart that works for both guests and logged-in users.
  - Full cart management on the cart page (increment, decrement, remove items).
  - Secure checkout process that captures customer shipping information.

- Order Management
  - Users can view their complete order history on a dedicated "My Orders" page.
  - Users can track their order status (Pending, Shipped, etc.).
  - Users can cancel their own orders if the status is "Pending".

- Admin Dashboard
  - Full CRUD (Create, Read, Update, Delete) functionality for Products.
  - Full CRUD functionality for homepage Banners/Carousel Slides.
  - User management, including the ability to approve or deactivate new user registrations.
  - Order management, including the ability to view order details and update order status.
  - Ability to create limited-permission Staff Accounts.


# 🛠️ Tech Stack
## Backend
  - Python 3.12+ - Programming Language
  - Django 5.x - Web Framework
  - Django REST Framework - API Development
  - Simple JWT - JSON Web Token Authentication
  - MySQL - Relational Database
  - django-cors-headers - Cross-Origin Resource Sharing Management
## Frontend
  - React 19 - Frontend Library
  - Vite - Build Tool & Development Server
  - React Router DOM - Client-Side Routing
  - React Context API - Global State Management
  - Bootstrap 5 & react-bootstrap - UI Component Library & Styling
  - lucide-react - Icon Library

## Project Structure

Below is the structure of the project:

```
Fractal-Project/
├── backend/                 # Django REST API
│   ├── ecommerce/          # Main Django project settings
│   ├── users/              # App for User Authentication
│   ├── products/           # App for Product models & API
│   ├── orders/             # App for Order models & API
│   ├── site_settings/      # App for Banners, etc.
│   └── requirements.txt    # Python dependencies
│
├── frontend/                # React Vite Application
│   ├── public/             # Static assets (images, banners)
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components (Navbar, Item, Hero)
│   │   ├── pages/          # Page components (Home, Checkout, MyOrders)
│   │   └── context/        # React Context (ShopContext)
│   └── package.json        # Node.js dependencies
│
└── .gitignore               # Top-level gitignore for the monorepo
```

# 🚀 Getting Started
## Prerequisites
  - Python (v3.8+)
  - Node.js (v20.19+ or v22.12+)
  - npm (v10+)
  - Git
  - MySQL Server

## Backend Setup

1. Navigate to the backend directory:
     ```bash
     cd backend

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database:
  In your MySQL client, create a new database:
    ```
    CREATE DATABASE ecommerce_db;
    ```
  - Open backend/ecommerce/settings.py and update the DATABASES dictionary with your MySQL credentials.

5. Run migrations:
    ```
    python manage.py migrate
    ```

6. Create an administrator account:
    ```bash
    python manage.py createsuperuser
    ```

7. Start the development server:
    ```bash
    python manage.py runserver
    ```
  - The backend will be available at http://localhost:8000.

## Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
  
2. Install dependencies:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run dev
- The frontend will be available at http://localhost:5173.

# 📱 API Endpoints
## Authentication
- POST /api/signup/ - User registration.
- POST /api/login/ - User login, returns JWT.

## Products
- GET /api/products/ - Lists all products.

## Banners
- GET /api/banners/ - Lists all active homepage banners.

## Orders
- POST /api/create-order/ - Creates a new order from the user's cart (requires auth).
- GET /api/my-orders/ - Gets the logged-in user's order history (requires auth).
- POST /api/orders/<id>/cancel/ - Cancels a pending order (requires auth).

# ✨ Future Enhancements
## Payment Integration 
- Integrate a payment gateway like Stripe or Razorpay.

## User Profile Management 
- Create a dedicated dashboard for users to update their profile details and manage a shipping address book.

## Product Reviews 
- Allow users to leave reviews and ratings for products.

## Deployment
- Prepare and deploy the application to a cloud service like AWS, Heroku, or DigitalOcean.

# 🐛 Troubleshooting

## Common Issues
  1. Module not found errors: Make sure all dependencies are installed
  2. Database errors: Run migrations with python manage.py migrate
  3. CORS issues: Ensure Django CORS settings are configured

Happy Shopping! 🛒
