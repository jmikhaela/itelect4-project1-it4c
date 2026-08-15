import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/UserProfilePage";
import SessionsPage from "./pages/SessionsPage";
import SessionDetailsPage from "./pages/SessionDetailsPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      {/* Login */}
      <Route
        path="/login"
        element={<LoginPage />}
      />


      {/* =========================
          PROTECTED ROUTES
      ========================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          {/* Home */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Tutors */}
          <Route
            path="/users"
            element={<UsersPage />}
          />

          {/* Tutor Profile */}
          <Route
            path="/users/:id"
            element={<UserProfilePage />}
          />

          {/* Sessions */}
          <Route
            path="/sessions"
            element={<SessionsPage />}
          />

          {/* Session Details */}
          <Route
            path="/sessions/:id"
            element={<SessionDetailsPage />}
          />

          {/* Bookings */}
          <Route
            path="/bookings"
            element={<BookingsPage />}
          />

        </Route>
      </Route>


      {/* =========================
          UNKNOWN URL
      ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;