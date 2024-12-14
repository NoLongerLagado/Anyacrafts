// App.jsx
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import MainPage from './main/MainPage';
import LoginPage from './LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import { UserProvider } from './components/UserContext';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} /> {/* temporarily as main user first view */}
        <Route path="login" element={<LoginPage />} /> {/* login */}
        <Route path="forgot-password" element={<ForgotPassword />} />
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
