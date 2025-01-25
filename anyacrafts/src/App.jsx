// src/App.jsx
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import MainPage from "./main/MainPage";
import LoginPage from "./LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import { UserProvider } from "./components/UserContext";
import CartPage from "./pages/CartPage";
import { FireCMS } from "@firecms/core";  // Import FireCMS
import { firecmsconfig } from "./components/firecmsconfig";  // Import your FireCMS config

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LoginPage />} /> {/* Login page as default */}
        <Route path="login" element={<LoginPage />} /> {/* Login route */}
        <Route path="main-page" element={<MainPage />} /> {/* Main page */}
        <Route path="forgot-password" element={<ForgotPassword />} /> {/* Forgot password */}
        <Route path="cart-page" element={<CartPage />} />
        <Route path="user-profile" element={<UserProfile />} /> {/* User profile */}
        <Route path="admin" element={<FireCMS {...firecmsconfig} />} /> {/* Admin dashboard */}
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
