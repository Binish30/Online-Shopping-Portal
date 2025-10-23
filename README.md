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
  - Programming Language: Python 3.12+
  - Framework: Django 5.x
  - API: Django REST Framework
  - JSON Web Token Authentication: Simple JWT
  - Database: MySQL
  - Key Libraries: djangorestframework, djangorestframework-simplejwt, django-cors-headers, mysqlclient, stripe, weasyprint
## Frontend
  - Frontend Library: React 19
  - Build Tool & Development Server: Vite
  - Client-Side Routing: React Router DOM
  - Global State Management: React Context API
  - UI Component Library & Styling: Bootstrap 5 & react-bootstrap
  - Key Libraries: react, react-router-dom, @stripe/react-stripe-is, luicde-react, react-phone-number-input

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
- POST /api/password-reset/verify/ - User's verification to reset password.
- POST /api/password-reet/confirm/ - User's password change.

## Products
- GET /api/products/ - Lists all products.

## Banners
- GET /api/banners/ - Lists all active homepage banners.

## Orders & Payments
- POST /api/create-order/ - Creates a new order from the user's cart (requires auth).
- GET /api/my-orders/ - Gets the logged-in user's order history (requires auth).
- POST /api/orders/<id>/cancel/ - Cancels a pending order (requires auth).
- POST /api/create-payment-intent/ (Stripe) -  Initiating a Payment.
- GET /api/orders/<id>/ - Returns list of order based on id.
- GET /api/orders/<id>/invoice/ (PDF Download) - Invoice download after order is delivered.

# ✨ Future Enhancements

## User Profile Management 
- Create a dedicated "My Profile" page where users can update their first name, last name, and change their password.
- Implement a shipping address book, allowing users to save and manage multiple addresses.

## Product Reviews & Ratings
- Allow logged-in users to submit a star rating and a text review for products they have purchased.
- Display the average rating on product cards and show all reviews on the product detail page.

## Advance Features
- Inventory Management: Add a stock_quantity field to the Product model and decrease it when an order is placed. Prevent out-of-stock items from being purchased.
- Email Notifications: Integrate a service like SendGrid to send transactional emails for order confirmations and shipping updates.
- Advanced State Management: For even larger applications, the frontend state management could be refactored to use a more powerful library like Redux Toolkit.

# 🐛 Troubleshooting

## Common Issues
  1. ModuleNotFoundError (Backend): Your virtual environment is likely not active. Activate it (.\venv\Scripts\activate on Windows) and run pip install -r requirements.txt.
  2. Dependency Errors (Frontend): Run npm install in the frontend directory to ensure all packages are installed. If you see strange errors, deleting the node_modules folder and running npm install again is a reliable fix.
  3. CORS Errors on Live Site: Ensure your CORS_ALLOWED_ORIGINS environment variable on your backend host (PythonAnywhere/Render) exactly matches your frontend's Vercel URL (e.g., https://your-site.vercel.app), with no trailing slash.
  4. 404 Not Found on Refresh (Live Site): This means your frontend/vercel.json file is missing or misconfigured. It is required for a React Router application on Vercel.
  5. Static/Admin Files Not Loading on PythonAnywhere: Go to the "Web" tab on PythonAnywhere and ensure the "Static files" mappings are correct and then click the "Reload" button.
  6. 500 Internal Server Error: This is a backend crash. Check the server logs on your hosting provider (Render or PythonAnywhere) to see the full Python traceback and find the root cause.

Happy Shopping! 🛒
