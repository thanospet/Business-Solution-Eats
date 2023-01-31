import { React } from "react";
import classes from "./App.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/pages/Root";
import LandingPage from "./components/pages/LandingPage";
import AvailableStores from "./components/pages/AvailableStores";
import StoresDescription from "./components/pages/StoresDescription";
import ProductInfoModal from "./components/UI/ProductInfoModal";
import Modal from "./components/UI/Modal";
import ErrorPage from "./components/pages/Error";
import StoreDetails from "./components/pages/StoreDetails";
import CartContext from "./store/cart-context";
import CartProvider from "./store/CartProvider";
import CheckOutPage from "./components/pages/CheckOutPage";

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
      {
        path: "/check-out-page",
        element: <CheckOutPage />,
      },
      // {
      //   path: "/store-details/:storeId/:productId",
      //   element: <ProductInfoModal />,
      // },
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
