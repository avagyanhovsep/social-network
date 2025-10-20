import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "../../api";
import type { IUser } from "../../types";

const links = [
  { to: "/profile", label: "Profile" },
  { to: "/profile/settings", label: "Settings" },
  { to: "/profile/followers", label: "Followers" },
  { to: "/profile/followings", label: "Followings" },
  { to: "/profile/feed", label: "Feed" },
  { to: "/profile/posts", label: "Posts" },
  { to: "/profile/requests", label: "Requests" },
  { to: "/signin", label: "Logout" },
];

export default function AuthLayout() {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get<{ user: IUser }>("/auth/user")
      .then((response) => {
        setAccount(response.data.user);
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  const base =
    "px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200";
  const active = "bg-blue-600 text-white";
  const inactive = "text-gray-300 hover:text-white hover:bg-gray-700";

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    account && (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-14 items-center justify-between">
              {/* Brand */}
              <NavLink
                to="/feed"
                className="text-lg font-semibold tracking-tight text-white"
                onClick={() => setOpen(false)}
              >
                social<span className="text-blue-500">/network</span>
              </NavLink>

              {/* Desktop menu */}
              <div className="hidden gap-1 md:flex">
                {links.map((l) =>
                  l.label === "Logout" ? (
                    <button
                      key={l.to}
                      onClick={handleLogout}
                      className={`${base} bg-red-600 text-white hover:bg-red-500`}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      end
                      className={({ isActive }) =>
                        `${base} ${isActive ? active : inactive}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  )
                )}
              </div>

              {/* Mobile toggle */}
              <button
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-800 md:hidden"
                onClick={() => setOpen((v) => !v)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile menu */}
            {open && (
              <div className="grid gap-2 pb-3 md:hidden">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `w-full ${base} ${isActive ? active : inactive}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet context={{ account }} />
        </div>
      </div>
    )
  );
}
