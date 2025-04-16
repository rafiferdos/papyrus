# Papyrus

## 🌎 Overview

**Papyrus** is an e-commerce platform for stationery products. It allows users to browse a wide range of stationery items, add them to cart, and make secure payments. Users can manage their profiles and view order history, while admins can manage products, orders, and users. Papyrus aims to provide a smooth and efficient online stationery shopping experience.

---

## 💻 Technologies Used

- **🟦 TypeScript**
- **🟢 Node.js**
- **🚀 Express.js**
- **🍃 MongoDB with Mongoose**

---

## ⭐ Features & Roles 🚀🎯📌

### 👥 User Roles

### 🔧 Admin Roles & Permissions

- ➕ Add new stationery products
- 📝 Update existing product details
- ❌ Delete products 
- 📦 Approve and update order status:
  - `Pending`, `Processing`, `Paid`, `Shipped`, etc.
- 👥 View all users
- ✅ Activate or ❌ Deactivate user accounts
- 📊 Manage and track user orders

### 🙋‍♂️ User Roles & Permissions

- 🔐 Register and log in to their account
- 🛍️ Browse and view all available stationery products
- 🛒 Add products to cart and manage cart items
- 💳 Checkout and make payments using **ShurjoPay**
- 📦 Place orders and track order status
- 👤 View and update profile information (name, address, etc.)
- 📜 View order history

---

### 🔐 Authentication & Authorization

- **🆔 Authentication**: Users must log in to perform write, update, and delete operations.
- **🔑 Authorization**: Admin and User roles are differentiated and secured.

---

## Models

### 👤 User Model

- `name`: `string` – The full name of the user.
- `email`: `string` – The email address of the user, used for authentication and communication.
- `password`: `string` – The password for the user, securely stored.
- `role`: `"admin" | "user"` – The role of the user, determining their access level. Default is `"user"`.
- `isDeactivate`: `boolean` – A flag indicating whether the user is blocked or not. Default is `false`.
- `createdAt`: `Date` – The timestamp when the user was created.
- `updatedAt`: `Date` – The timestamp of the last update to the user.

### 📦 Product Model

- `name`: `string` – The name of the stationery product.
- `image`: `string` – URL or path to the product image.
- `brand`: `string` – The brand or manufacturer of the product.
- `price`: `number` – The selling price of the product.
- `category`: `string` – The product category. Can be one of:
  - `'Writing Instruments'`
  - `'Paper Products'`
  - `'Art Supplies'`
  - `'Educational'`
- `description`: `string` – A short description of the product.
- `quantity`: `number` – The available stock quantity of the product.
- `inStock`: `boolean` – Flag indicating if the product is currently in stock.
- `isDeleted`: `boolean` – Flag for soft deletion (true if the product is hidden or removed logically).

---

## 🔗 API Endpoints

### 🔐 Authentication 🔏🔑

#### 1️⃣ 🆕 Register User

- **📩 POST** `/api/auth/register`
- **Description**: Registers a new user with the platform.
- **Request Body**:
  ```json
  {
    "name": "user",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:

  - Success (201):

  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "statusCode": 201,
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

  - Failure (400):

  ```json
  {
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
  }

  ```

#### 2️⃣ 🔑 Login User

- **📩 POST** `/api/auth/login`
- **Description**: Authenticates a user with their email and password and generates a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:

  - Success (200):

  ```json
  {
    "success": true,
    "message": "Login successful",
    "statusCode": 200,
    "data": {
      "token": "string"
    }
  }
  ```

  - Failure (401):

  ```json
  {
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
  }

  ```

### 📝 Product Management 🖋️📖🗂️

#### 1️⃣ 🆕 Add Product

- **📩 POST** `/api/product`
- **Description**: Allows a logged-in admin to add a product by providing following content.
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "image": "Image URL",
    "brand": "Brand/Manufacture name of Product",
    "price": "Price of Product",
    "category": "Product Category",
    "description": "Product Description",
    "quantity": "Product Quantity"
  }
  ```
- **Response**:
  - Success (201):
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "statusCode": 201,
    "data": {"Product Data"}
  }
  ```

#### 2️⃣ ✏️ Update Product

- **📩 PATCH** `/api/product/:id`
- **Description**: Allows a logged-in Admin to update Product by its ID.
- **Request Header**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Updated Product Name",
    "content": "Updated content."
  }
  ```
- **Response**:
  - Success (200):
  ```json
  {
    "success": true,
    "message": "Product updated successfully",
    "statusCode": 200,
    "data": {"Update Product Data"}
  }
  ```

#### 3️⃣ ❌ Delete Product

- **📩 DELETE** `/api/product/:id`
- **Description**: Allows a logged-in admin to delete product by its ID.
- **Request Header**: `Authorization: Bearer <token>`
- **Response**:
  - Success (200):
  ```json
  {
    "success": true,
    "message": "Product deleted successfully",
    "statusCode": 200
  }
  ```

#### 4️⃣📜 Get All Product (Public)

- **📩 GET** `/api/product/:id`
- **Description**: Allows everyone to see products.

  🔍 Query Parameters:

- `search`: 🔎 Search product by 📝 name or 📜 content.
- `sortBy`: 📊 Sort product by fields like createdAt.
- `filter`: 🎯 Filter product by 👤 author ID.
- **Response**:
  - Success (200):
  ```json
  {
    "success": true,
    "message": "product retrieved successfully",
    "statusCode": 200,
    "data": ["All Products Data"]
  }
  ```

## 👑 Admin Actions

#### 1️⃣ 🚫 Deactivate User

- **📩 PATCH** `/api/admin/user/:userId/deactivate`
- **Description**: Allows an admin to block a user by updating the `isDeactivate` property to `true`.
- **Request Header**: `Authorization: Bearer <admin_token>`
- **Response**:
  - Success (200):
  ```json
  {
    "success": true,
    "message": "User blocked successfully",
    "statusCode": 200
  }
  ```

#### 2️⃣ 📦 Update Order Status

- **📩 PATCH** `/api/order/:orderId/status`
- **Description**: Allows an admin to approve order and update status.
- **Request Header**: `Authorization: Bearer <admin_token>`
- **Response**:

  - Success (200):

  ```json
  {
    "success": true,
    "message": "Order updated successfully",
    "statusCode": 200
  }
  ```

  ***

## ⚠️ Error Handling

### 🛑 Common Error Response Format

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": { "details": "Additional error details, if applicable" },
  "stack": "error stack trace, if available"
}
```

### 🚨 Types of Errors Handled

- ⚡ Zod Validation Error (`ZOD_ERROR`): Invalid data inputs.
- ❓ Not Found Error (`NOT_FOUND_ERROR`): Missing resources.
- 🚫 Validation Error (`VALIDATION_ERROR`): Incorrect/missing fields.
- 🔑 Authentication Error (`AUTH_ERROR`): Invalid login/token.
- 🔒 Authorization Error (`AUTHORIZATION_ERROR`): Insufficient permissions.
- 🔥 Internal Server Error (`INTERNAL_SERVER_ERROR`): Unexpected server issues.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository:

```python
git clone https://papyrus-client.vercel.app/
```

### 2️⃣ Change to papyrus directory and Install npm::

```bash
cd papyrus;
npm install;
```

### 2️⃣ Start the 🚀 Papyrus:

```python
npm run start
```

## 🔐 Admin login crediential:

```bash
Email: admin@gmail.com
Password: 123456
```

## 🔗 Necessary Links:

1. **Live Links**: https://papyrus-client.vercel.app/
2. **Github Link**: https://github.com/rafiferdos/papyrus.git