# Admin Panel OTP Auth (Next.js)

This is a demo Admin Panel built with Next.js, featuring OTP-based authentication for admin login, protected dashboard routes, and user management.  
**Authentication and user data are mocked for assignment/demo purposes.**

---

## Features

- **Admin Login with OTP**
  - Login page at `/admin/login`
  - Only allows contact number `7710957578`
  - Sends OTP via API (mocked)
  - Verifies OTP (default: `7710`)
  - Stores token in `localStorage` on successful login

- **Protected Admin Dashboard**
  - Dashboard at `/admin/dashboard`
  - Only accessible with a valid token
  - Lists all users (mock data)
  - Each user links to a detail page

- **User Detail Page**
  - Dynamic route `/admin/users/[id]`
  - Shows detailed info for each user
  - Protected by token

- **Token Management**
  - Token stored in `localStorage` under key `admin_token`
  - All API calls require token
  - Handles token expiration by redirecting to login

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/admin-panel-otp-auth.git
cd admin-panel-otp-auth/project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

### Admin Login

1. Go to `/admin/login`
2. Enter contact number: `7710957578`
3. Click "Send OTP"
4. Enter OTP: `7710`
5. On success, you are redirected to the dashboard

### Dashboard

- View all users
- Click a user to see their details

### User Details

- Protected route
- Shows user info if authenticated

---

## Project Structure

```
/app
  /admin
    /login         # Admin login page
    /dashboard     # Admin dashboard (protected)
    /users/[id]    # User detail page (protected)
  /components      # Reusable UI components
/lib
  auth.js          # Auth logic, token management, mock API
```

---

## Mock Data & Auth

- **Only contact number `7710957578` and OTP `7710` are accepted**
- Token is a random string, stored in `localStorage` as `admin_token`
- User data is mocked in `/lib/auth.js`

---


