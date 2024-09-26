import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import ChooseCard from "./features/choose-card";
import FormRegister from "./features/form-register";
import Message from "features/message";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <FormRegister />,
        },
        {
          path: "/choose-card",
          element: <ChooseCard />,
        },
        {
          path: "message",
          element: <Message />,
        }
      ]
    },
  ]);
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
