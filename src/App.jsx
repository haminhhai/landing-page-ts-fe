import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import ChooseCard from "./features/coupon";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "choose-card",
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
