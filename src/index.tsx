import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Iphone } from "./screens/Iphone";
import { ClientHome } from "./screens/ClientHome";
import { RestaurantProducts } from "./screens/RestaurantProducts";
import { Cart } from "./screens/Cart";
import { POS } from "./screens/POS";
import { RestaurantManagement } from "./screens/RestaurantManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Iphone />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/client/home",
    element: <ClientHome />,
  },
  {
    path: "/restaurant/:restaurantId/products",
    element: <RestaurantProducts />,
  },
  {
    path: "/restaurant/:restaurantId/manage",
    element: <RestaurantManagement />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/pos",
    element: <POS />,
  },
]);

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);