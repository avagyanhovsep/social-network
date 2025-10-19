import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { Axios } from "../../api";
import type { AxiosError } from "axios";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();

  const handleSigin: SubmitHandler<IUser> = (user) => {
    Axios.post("/auth/signin", user).then(() => {
        setMessage('');
        navigate("/profile");
    }).catch((err) => {
        const error = (err as AxiosError).response?.data as { message: string };

        if (error) {
          setMessage(error.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-400">
            Sign in to continue to your account.
          </p>
        </div>
        <div className="">
          {errors && <p className="text-red-500">{errors.email?.message}</p>}
          {message && <p className="text-red-500">{message}</p>}
        </div>
        {/* Card */}
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-2xl backdrop-blur">
          <div className="h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />

          <form
            className="p-6 md:p-8 space-y-5"
            onSubmit={handleSubmit(handleSigin)}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6h16v12H4z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-3"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="10"
                      width="18"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 10V8a5 5 0 0 1 10 0v2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  {...register("password")}
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPw ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 3l18 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.58 10.58a3 3 0 0 0 4.24 4.24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.88 5.09A10.77 10.77 0 0 1 12 5c6 0 10 6 10 6a15.43 15.43 0 0 1-4.12 4.58M6.61 6.61A15.57 15.57 0 0 0 2 11s4 6 10 6a10.77 10.77 0 0 0 2.12-.21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end text-sm">
              <Link
                to="#"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-3 font-semibold text-slate-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ring-offset-slate-900 transition"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Log in
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <Link
                to="/"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
