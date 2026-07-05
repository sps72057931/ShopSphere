# 🛍️ ShopSphere — Full-Stack MERN Ecommerce Website

A complete, production-ready ecommerce web application built with **MongoDB, Express.js, React (Vite), and Node.js**. Styled with **Tailwind CSS**, secured with **JWT authentication**, and supports **Cash on Delivery** as the only payment method.

---

## 📁 Project Structure

```
ShopSphere/
├── backend/                 # Node.js + Express API
│   ├── config/               # DB connection & file upload config
│   │   ├── db.js
│   │   └── upload.js
│   ├── controllers/          # Route logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/            # Auth guard & error handler
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/                 # Express routers
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── uploads/                # Local image storage (if not using Cloudinary)
│   ├── .env.example
│   ├── package.json
│   ├── seed.js                 # Sample data importer
│   └── server.js               # App entry point
│
└── frontend/                  # React + Vite client
    ├── src/
    │   ├── assets/
    │   ├── components/          # Reusable UI (Navbar, Footer, ProductCard, etc.)
    │   ├── context/              # AuthContext & CartContext (global state)
    │   ├── pages/                 # Route-level pages
    │   │   └── admin/              # Admin dashboard pages
    │   ├── services/               # Axios API calls
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Frontend       | React 18 + Vite + Tailwind CSS       |
| Backend        | Node.js + Express.js                 |
| Database       | MongoDB + Mongoose                   |
| Auth           | JWT + bcrypt.js                      |
| Image Upload   | Multer (local) or Cloudinary         |
| Payments       | Cash on Delivery only (no gateway)   |
| Notifications  | react-hot-toast                      |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js v18+ installed
- MongoDB installed locally OR a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- npm (comes with Node.js)

### 1. Clone / Extract the project
Unzip the project and open it in your code editor (e.g., VS Code).

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shopsphere
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
USE_CLOUDINARY=false
```

> 💡 If you don't have MongoDB installed locally, create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), then paste your connection string into `MONGO_URI`.

**Seed the database** with an admin user + 12 sample products:

```bash
npm run seed
```

This creates:
- Admin login: **admin@shopsphere.com** / **admin123**
- 12 sample products across 6 categories

**Start the backend server:**

```bash
npm run dev
```

The API will run at `http://localhost:5000`. Test it by visiting `http://localhost:5000/api/health`.

### 3. Frontend Setup

Open a **new terminal window**:

```bash
cd frontend
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

It should contain:

```
VITE_API_URL=http://localhost:5000/api
```

**Start the frontend dev server:**

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. 🎉

---

## 🔑 Default Login Credentials

| Role  | Email                  | Password   |
|-------|--------------------------|------------|
| Admin | admin@shopsphere.com     | admin123   |
| User  | Register your own account via the "Register" page |

---

## ✨ Features

### Customer-facing
- Modern responsive homepage (hero, categories, featured products, offers, footer)
- Product listing with search, category filter, price range filter, and sorting
- Product detail page with image gallery, quantity selector
- Cart with add/remove/increase/decrease quantity and live total calculation
- Checkout with shipping address form and **Cash on Delivery**
- Order history ("My Orders") and detailed order tracking with status timeline
- JWT-based Register / Login / Logout, protected routes
- Toast notifications for all key actions
- Mobile-friendly navigation with hamburger menu

### Admin Dashboard (`/admin`, requires admin role)
- Overview stats (total products, orders, revenue, pending orders)
- Add / Edit / Delete products (with image upload)
- View all orders and update order status:
  `Processing → Packed → Shipped → Out for Delivery → Delivered` (or `Cancelled`)

---

## 🖼️ Image Uploads

By default, uploaded images are stored **locally** on the server in `backend/uploads/` and served via `/uploads/<filename>`. No external service is required to run the project out of the box.

### To use Cloudinary instead:
1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. In `backend/.env`, set:
   ```
   USE_CLOUDINARY=true
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. Install the Cloudinary packages (already listed in `package.json`):
   ```bash
   npm install
   ```
4. Restart the backend server. New product images will now upload to Cloudinary automatically.

---

## 💳 Payment Method

This project **only supports Cash on Delivery (COD)**. There is no integration with Stripe, Razorpay, PayPal, or any other payment gateway, by design. The checkout flow simply collects a shipping address and places the order with `paymentMethod: "Cash on Delivery"`.

---

## 🌐 Deployment Guide

### Deploying the Backend (Render)

1. Push the `backend/` folder to a GitHub repository.
2. Go to [Render](https://render.com) → New → Web Service.
3. Connect your repo and select the `backend` folder as the root directory.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables in the Render dashboard (same as your `.env` file):
   - `MONGO_URI` (use MongoDB Atlas connection string)
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `CLIENT_URL` (your deployed frontend URL, e.g. `https://shopsphere.vercel.app`)
   - `NODE_ENV=production`
7. Deploy. Render will give you a live URL like `https://shopsphere-backend.onrender.com`.

> ⚠️ Note: Render's free tier uses ephemeral storage, so locally-uploaded images (`USE_CLOUDINARY=false`) will be lost on redeploy/restart. For production, switch to Cloudinary (see above).

### Deploying the Frontend (Vercel)

1. Push the `frontend/` folder to a GitHub repository (or the same repo, different directory).
2. Go to [Vercel](https://vercel.com) → New Project → Import your repo.
3. Set the **Root Directory** to `frontend`.
4. Framework Preset: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add environment variable:
   - `VITE_API_URL=https://shopsphere-backend.onrender.com/api` (your Render backend URL)
8. Deploy. Vercel will give you a live URL like `https://shopsphere.vercel.app`.

Finally, go back to Render and update `CLIENT_URL` to your Vercel URL, then redeploy the backend so CORS works correctly.

---

## 🧪 API Endpoints Reference

### Auth
| Method | Endpoint             | Access  | Description             |
|--------|----------------------|---------|--------------------------|
| POST   | /api/auth/register    | Public  | Register a new user      |
| POST   | /api/auth/login       | Public  | Login and get JWT token  |
| GET    | /api/auth/me          | Private | Get current user profile |
| PUT    | /api/auth/profile     | Private | Update profile / address |

### Products
| Method | Endpoint                | Access       | Description                          |
|--------|--------------------------|--------------|----------------------------------------|
| GET    | /api/products             | Public       | List products (search/filter/sort/page) |
| GET    | /api/products/featured    | Public       | Get featured products                  |
| GET    | /api/products/categories  | Public       | Get all distinct categories            |
| GET    | /api/products/:id         | Public       | Get single product                     |
| POST   | /api/products             | Admin only   | Create a product (multipart/form-data) |
| PUT    | /api/products/:id         | Admin only   | Update a product                       |
| DELETE | /api/products/:id         | Admin only   | Delete a product                       |

### Orders
| Method | Endpoint                | Access       | Description                     |
|--------|--------------------------|--------------|------------------------------------|
| POST   | /api/orders               | Private      | Place a new order (COD)           |
| GET    | /api/orders/myorders      | Private      | Get logged-in user's orders       |
| GET    | /api/orders/:id           | Private      | Get single order (owner or admin) |
| GET    | /api/orders               | Admin only   | Get all orders                    |
| PUT    | /api/orders/:id/status    | Admin only   | Update order status                |

---

## 🛠️ Customization Tips

- **Change brand colors:** edit `frontend/tailwind.config.js` (`colors.primary` / `colors.accent`)
- **Change shipping threshold/fee:** search for `999` and `49` in `backend/controllers/orderController.js` and `frontend/src/context/CartContext.jsx`
- **Add more order statuses:** update `ORDER_STATUSES` in `backend/models/Order.js` and `ORDER_STEPS` in `frontend/src/components/OrderStatus.jsx`
- **Add more categories:** update `CATEGORY_OPTIONS` in `frontend/src/pages/admin/AdminProductForm.jsx`

---

## 📄 License

This project is provided as-is for educational and personal/commercial use. Feel free to modify and extend it.

---

Built with ❤️ using the MERN stack.
