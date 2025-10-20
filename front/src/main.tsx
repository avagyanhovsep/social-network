import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/signup/signup.tsx";
import Signin from "./pages/signin/index.tsx";
import "./index.css";
import AuthLayout from "./pages/profile/layout.tsx";
import Profile from "./pages/profile/index.tsx";
import Settings from "./pages/profile/setting/index.tsx";
import ResetPassword from "./pages/forgot-password/reset-password.tsx";
import ForgotPasswordLayout from "./pages/forgot-password/index.tsx";
import Email from "./pages/forgot-password/email.tsx";
import Verify from "./pages/forgot-password/verify.tsx";
import AccountConfirmation from "./pages/signup/account-confirmation.tsx";
import SignupLayout from "./pages/signup/index.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <SignupLayout />,
    children: [
      { path: "", element: <Signup /> },
      { path: "/confirm-your-account", element: <AccountConfirmation /> },
    ],
  },
  { path: "signin", element: <Signin /> },
  {
    path: "profile",
    element: <AuthLayout />,
    children: [
      { path: "", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordLayout />,
    children: [
      { path: "", element: <Email /> },
      { path: "verify-code", element: <Verify /> },
      { path: "reset", element: <ResetPassword /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
