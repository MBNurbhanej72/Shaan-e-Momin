import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import LoginOtp from "../pages/LoginOtp";
import SignUpOtp from "../pages/SignUpOtp";

export const Routing = createBrowserRouter([
  {
    path: "/", element: <ProtectedRoute />, children: [
      { path: "", element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "user-setting", element: <Settings /> },
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "login-otp", element: <LoginOtp /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signup-otp", element: <SignUpOtp /> },
]);