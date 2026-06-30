

# 📚 BookNest – Online Book Store

BookNest is a modern and responsive online bookstore web application developed using PHP, MySQL, Bootstrap, HTML, CSS, and JavaScript. The project provides a complete e-commerce experience for buying books with separate user and admin functionalities.

## ✨ Features

### 👤 User Module
- User Registration & Login
- Secure Authentication
- Forgot Password
- User Dashboard
- Browse Books
- Search & Filter Books
- Book Details
- Shopping Cart
- Checkout
- Order History
- User Profile
- Responsive Design

### 👨‍💼 Admin Module
- Admin Login
- Dashboard
- Manage Books
- Manage Users
- Manage Orders
- Analytics Overview

## 🛠️ Technologies Used

- PHP
- MySQL
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Bootstrap Icons

## 📂 Project Structure

```
BookNest/
│── admin/
│── css/
│── js/
│── images/
│── includes/
│── login.php
│── register.php
│── forgot_password.php
│── reset_password.php
│── logout.php
│── auth.php
│── dashboard.php
│── books.php
│── cart.php
│── checkout.php
│── profile.php
│── index.php
```

## 🚀 Installation

1. Download or clone the repository.
2. Copy the project folder into the `htdocs` directory (XAMPP).
3. Start Apache and MySQL from the XAMPP Control Panel.
4. Create a MySQL database named `booknest`.
5. Import the SQL file into the database.
6. Update the database connection in `includes/db.php`.
7. Open your browser and visit:

```
http://localhost/BookNest/
```

## 🔐 Default Admin Login

```
Email: admin@booknest.com
Password: admin123
```

> Change the default password after the first login for better security.

## 📸 Screenshots

- Home Page
- Login
- Register
- Books
- Cart
- Checkout
- User Dashboard
- Admin Dashboard

## 📈 Future Enhancements

- Online Payment Gateway
- Wishlist
- Book Reviews & Ratings
- Order Tracking
- Email Notifications
- AI Book Recommendations

## 👩‍💻 Developer

**Kavya Chukkala**

---

⭐ If you like this project, consider giving it a star!
# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.
