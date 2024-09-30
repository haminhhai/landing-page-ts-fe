import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import FormRegister from "./features/form-register";
import NotFound from "features/not-found";
import LoginPage from "features/login";
import AdminLayout from "layout/AdminLayout";
import AdminPage from "features/admin";
import { ConfigProvider } from "antd";
import ChooseCard from "features/choose-card";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <ChooseCard />,
        },
      ]
    },
    {
      path: '/login',
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
      ]
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);
  return (
    <ConfigProvider form={{
      validateMessages: {
        required: 'Trường này là bắt buộc!',
      }
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
