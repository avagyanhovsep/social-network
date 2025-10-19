import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/signup/index.tsx";
import Signin from "./pages/signin/index.tsx";
import "./index.css";
import Profile from "./pages/profile/index.tsx";

const router = createBrowserRouter([
  { path: "", element: <Signup /> },
  { path: "signin", element: <Signin /> },
  { path: "profile", element: <Profile /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
