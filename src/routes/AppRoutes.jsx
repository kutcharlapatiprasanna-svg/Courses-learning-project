
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Public pages
import Home from "../pages/home/Home.jsx";
import Course from "../pages/courses/Course.jsx";

// Authentication pages
import Register from "../pages/auth/Register.jsx";
import ActivateUser from "../pages/auth/ActivateUser.jsx";
import Login from "../pages/auth/Login.jsx";

// Admin dashboard pages
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminDashboardHome from "../pages/admin/AdminDashboardHome.jsx";
import GetAllUsers from "../pages/admin/GetAllUsers.jsx";
import UpdateUser from "../pages/admin/UpdateUser.jsx";
import CreateCourse from "../pages/admin/CreateCourse.jsx";
import AllCourses from "../pages/admin/AllCourses.jsx";
import Orders from "../pages/admin/Orders.jsx";
import Notifications from "../pages/admin/Notifications.jsx";
import Analytics from "../pages/admin/Analytics.jsx";
import SiteLayout from "../pages/admin/SiteLayout.jsx";

// LMS pages
import LmsLayout from "../pages/admin/lms/LmsLayout.jsx";
import LmsHome from "../pages/admin/lms/LmsHome.jsx";
import LmsCourseDetail from "../pages/admin/lms/LmsCourseDeatils.jsx";
import LmsLearning from "../pages/admin/lms/LmsLearning.jsx";
import LmsLecture from "../pages/admin/lms/LmsLecture.jsx";
import LmsInstructor from "../pages/admin/lms/LmsInstructer.jsx";
import LmsAdmin from "../pages/admin/LmsAdmin.jsx";

// LMS Admin Context
import { LmsAdminProvider } from "../context/LmsAdminContext.jsx";

export default function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC WEBSITE */}

        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Course />} />

        {/* COURSE DETAILS */}
        {/* Course.jsx navigates to /courses/:id */}

        <Route
          path="/courses/:id"
          element={<LmsCourseDetail />}
        />

        {/* AUTHENTICATION */}

        <Route element={<PublicRoute />}>
          <Route
            path="/auth/register"
            element={<Register />}
          />

          <Route
            path="/auth/activate"
            element={<ActivateUser />}
          />

          <Route
            path="/auth/login"
            element={<Login />}
          />
        </Route>

        {/* LMS MARKETPLACE */}

        <Route path="/lms" element={<LmsLayout />}>
          <Route index element={<LmsHome />} />

          {/* LMS COURSE DETAILS */}

          <Route
            path="course/:courseId"
            element={<LmsCourseDetail />}
          />

          {/* LMS LECTURE */}

          <Route
            path="course/:courseId/lecture/:lectureId"
            element={<LmsLecture />}
          />

          {/* MY LEARNING */}

          <Route
            path="learning"
            element={<LmsLearning />}
          />

          {/* INSTRUCTOR */}

          <Route
            path="instructor"
            element={<LmsInstructor />}
          />

          {/* LMS ADMIN */}

          <Route
            path="admin"
            element={
              <LmsAdminProvider>
                <LmsAdmin />
              </LmsAdminProvider>
            }
          />
        </Route>

        {/* ADMIN DASHBOARD */}

        <Route element={<ProtectedRoute adminOnly />}>
          <Route
            path="/admin/admin-dashboard"
            element={<AdminDashboard />}
          >
            <Route
              index
              element={<AdminDashboardHome />}
            />

            <Route
              path="all-users"
              element={<GetAllUsers />}
            />

            <Route
              path="update-user"
              element={<UpdateUser />}
            />

            <Route
              path="create-course"
              element={<CreateCourse />}
            />

            <Route
              path="courses"
              element={<AllCourses />}
            />

            <Route
              path="orders"
              element={<Orders />}
            />

            <Route
              path="notifications"
              element={<Notifications />}
            />

            <Route
              path="analytics"
              element={<Analytics />}
            />

            <Route
              path="layout"
              element={<SiteLayout />}
            />
          </Route>
        </Route>

        {/* PAGE NOT FOUND */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}
