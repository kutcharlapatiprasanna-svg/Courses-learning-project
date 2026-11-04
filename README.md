# Skillora – Online Course Application

<p align="center">
  <strong>A React-based online learning platform for discovering courses and managing learning experiences.</strong>
</p>

<p align="center">
  <a href="https://courses-learning-project-bqee.vercel.app/"><strong>🚀 View Live Application</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=323330" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Project status" />
</p>

---

## 📌 Overview

**Skillora** is an online course application developed using React. It provides a platform where users can explore courses, view course details, register, activate their accounts, and access learning-related features.

The application includes separate experiences for learners and administrators. Learners can manage their profiles and explore learning activities, while administrators can access course, user, order, notification, and analytics management features.

The frontend communicates with an externally hosted API through Axios and direct HTTP requests. This repository contains the React frontend application; backend implementation is maintained separately.

## ✨ Features

### 👤 Authentication and User Management
- User registration with name, email, and password.
- Account activation using a six-digit verification code.
- Login and logout functionality.
- Authentication state management using Context API.
- Token-based API requests through Axios interceptors.
- Protected routes and role-aware navigation.

### 📚 Courses and Learning
- Browse and explore available courses.
- View course details and course content.
- Search and filter marketplace courses.
- Access the learner area through My Learning.
- View learning progress, certificates, purchases, and wishlist sections.
- Explore course reviews and learning-related features.

### 🛠️ Admin Management
- Admin dashboard and analytics.
- User management and role updates.
- Create, edit, and delete general courses.
- Manage marketplace courses and course statuses.
- View orders and enrollment information.
- Manage instructors, categories, and coupons.
- Access notification and site-layout management screens.

### 🧑‍💻 Profile Management
- View and update profile information.
- Upload and update profile pictures.
- Display account details.
- Maintain profile information across application pages.

### 📱 Responsive Design
- Responsive layouts for desktop, tablet, and mobile.
- Reusable React components.
- Consistent styling across application pages.

> **Access-control note:** Frontend route protection improves navigation and user experience. Actual authentication validation and authorization must also be enforced by the backend API.

---

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| JavaScript (ES6+) | Application logic |
| React Router DOM 7 | Routing and navigation |
| Vite 8 | Development server and build tool |
| Axios | API integration and HTTP requests |
| Context API | Global state management |
| React Hot Toast | User notifications |
| CSS | Styling and responsive layouts |
| CSS Modules | Component-level styling |
| ESLint 10 | Code quality and linting |
| Vercel | Application deployment |

---

## 📂 Project Structure

```text
src/
├── api/
│   ├── axiosInstance.js
│   └── interceptors.js
│
├── app/
│
├── assets/
│
├── components/
│   ├── admin/
│   └── common/
│
├── context/
│   ├── AuthContext.jsx
│   └── LmsAdminContext.jsx
│
├── hooks/
│   └── useAuth.js
│
├── pages/
│   ├── auth/
│   ├── home/
│   ├── Courses/
│   ├── marketplace/
│   ├── profile/
│   └── admin/
│       └── lms/
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│
├── state-mgmt/
│   └── CourseContext.jsx
│
├── styles/
│
├── main.jsx
├── utils.js
└── Spinner.jsx

public/
index.html
package.json
package-lock.json
vite.config.js
vercel.json
```

### Important Files

| File | Responsibility |
|---|---|
| `main.jsx` | Application entry point and providers |
| `AppRoutes.jsx` | Application route configuration |
| `AuthContext.jsx` | Authentication and user state |
| `CourseContext.jsx` | General course state management |
| `LmsAdminContext.jsx` | LMS administrator state management |
| `axiosInstance.js` | Shared API configuration |
| `interceptors.js` | Authentication headers and request handling |
| `ProtectedRoute.jsx` | Protected route handling |
| `services/` | API service functions |

---

## 🔄 Application Workflow

### 1. Registration and Account Activation

1. The user opens the registration page.
2. Enters their name, email, and password.
3. The frontend sends the registration request to the API.
4. On successful registration, activation details are passed to the activation page through React Router navigation state.
5. The user enters the six-digit activation code.
6. The frontend submits the activation request.
7. After successful activation, the user is redirected to the login page.

### 2. Login and Authentication

1. The user enters their email and password.
2. The frontend sends the login request to the API.
3. The API returns authentication details.
4. The application stores the token and user information in local storage and authentication context.
5. Axios interceptors attach the token to subsequent API requests.
6. Users are redirected according to their role and requested route.

### 3. Course Management

1. Users browse available courses.
2. The application retrieves course information from the API.
3. Course details and content are displayed.
4. Administrators can create, update, and delete general courses.
5. LMS administrators can manage marketplace courses and related resources.

### 4. Profile Management

1. Users open profile settings.
2. They can update their account information.
3. They can select and upload a profile picture.
4. The frontend submits the updated information to the profile API.

---

## 🔐 Authentication and Authorization

The application uses Context API to share authentication information across components.

Key implementation details:

- `AuthProvider` manages the authentication state.
- `useAuth` provides access to authentication context.
- Login stores the token and user information.
- Logout clears the stored authentication data.
- Axios request interceptors attach the authentication token when available.
- `ProtectedRoute` restricts access to selected routes.
- Admin routes check for the `admin` or `administrator` role.

**Important:** Client-side role checks are not a security boundary. The backend must independently validate tokens and permissions for protected API operations.

---

## 🌐 API Integration

The frontend communicates with an external API for authentication, courses, profiles, and LMS functionality.

The shared Axios configuration supports an optional `VITE_API_BASE_URL` environment variable.

### General API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/activate-user` | Activate an account |
| POST | `/auth/login` | User login |
| GET | `/auth/get-all-user-dashboard` | Retrieve dashboard users |
| PUT | `/auth/update-user-roles` | Update user roles |
| DELETE | `/auth/delete-user/:id` | Delete a user |
| PUT | `/auth/update-user-info` | Update profile details |
| PUT | `/auth/update-user-profile-picture` | Update profile picture |
| POST | `/course/create-course` | Create a course |
| GET | `/course/get-courses` | Retrieve courses |
| GET | `/course/get-course/:id` | Retrieve course details |
| PUT | `/course/edit-course/:id` | Update a course |
| DELETE | `/course/delete-course/:id` | Delete a course |

### LMS API Endpoints

The LMS API helpers also define endpoints for:

- Marketplace home and course listings.
- Course search and course details.
- Categories and curriculum.
- Learner enrollments and progress.
- Wishlist and course reviews.
- Certificates and downloads.
- Instructor courses and analytics.
- LMS administrator analytics and course management.
- Orders, coupons, and payment-related operations.

The full endpoint list is maintained in the frontend API service modules.

> **Note:** These endpoint descriptions document frontend API integration. They do not guarantee that every endpoint is currently available on the external backend.

---

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- Access to the configured external API for live authentication and data.

### Clone the Repository

```bash
git clone https://github.com/kutcharlapatiprasanna-svg/Courses-learning-project.git

cd Courses-learning-project
```

### Install Dependencies

```bash
npm ci
```

### Start the Development Server

```bash
npm run dev
```

Open the local application:

```text
http://localhost:5177
```

### Create a Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root when you need to override the API base URL.

```env
VITE_API_BASE_URL=https://mockapi-mauve.vercel.app/api/v1
```

Restart the development server after changing environment variables.

**Security:** Never store backend secrets, private API keys, or payment secret keys in frontend environment variables. Variables prefixed with `VITE_` are exposed to browser code.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy using the configured GitHub Pages script |

---

## 🚧 Future Improvements

- Add automated unit and integration tests.
- Improve API error handling and loading states.
- Centralize all API requests through the shared Axios client.
- Strengthen backend authorization and token validation.
- Complete and test the payment checkout integration.
- Improve accessibility and cross-browser testing.
- Add application screenshots and a deployment guide.

---

## 🚀 Live Deployment

The application is deployed using Vercel.

**Live Application:**  
https://courses-learning-project-bqee.vercel.app/

---

## 👨‍💻 Author

**Prasanna**

GitHub: [kutcharlapatiprasanna-svg](https://github.com/kutcharlapatiprasanna-svg)

---

<p align="center">
  <strong>Thank you for visiting Skillora!</strong>
</p>
