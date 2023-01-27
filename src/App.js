import { React } from "react";
import classes from "./App.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/pages/Root";
import LandingPage from "./components/pages/LandingPage";
import AvailableStores from "./components/pages/AvailableStores";
import StoresDescription from "./components/pages/StoresDescription";
import Modal from "./components/UI/Modal";
import ErrorPage from "./components/pages/Error";
import StoreDetails from "./components/pages/StoreDetails";
import CartContext from "./store/cart-context";
import CartProvider from "./store/CartProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/available-stores/:postal", element: <AvailableStores /> },
      { path: "/stores-description", element: <StoresDescription /> },
      {
        path: "/store-details/:storeId",
        element: <StoreDetails />,
      },
      { path: "/store-details/:storeId/:productId", element: <Modal /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
