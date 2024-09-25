import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import ChooseCard from "./features/choose-card";
import FormRegister from "./features/form-register";

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
        }
      ]
    },
  ]);
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
