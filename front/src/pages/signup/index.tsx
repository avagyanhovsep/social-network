import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { Axios } from "../../api";
import type { AxiosError } from "axios";

export default function Signup() {
    const [showPw, setShowPw] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const {register, handleSubmit, formState: { errors }} = useForm<IUser>();

    const handleSignup: SubmitHandler<IUser> = (user) => {
        Axios.post("/auth/signup", user).then(() => {
            setMessage("");
            navigate("/signin");
        }).catch((err) => {
            const error = (err as AxiosError).response?.data as { message: string };

            if (error) {
                setMessage(error.message);
            }
        });
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-slate-400">
            Join in seconds. No credit card required.
          </p>
        </div>
        
        {/* Error Area */}
        <div>
          {errors.firstName && (<p className="text-red-500 m-2">{errors.firstName.message}</p>)}
          {message && <p className="text-red-500 m-2">{message}</p>}
        </div>
        
        {/* Card */}
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-2xl backdrop-blur">
          {/* Top border accent */}
          <div className="h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />

          <form className="p-6 md:p-8" onSubmit={handleSubmit(handleSignup)}>
            {/* Name grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-slate-200"
                >
                  First name
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
                        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    autoComplete="given-name"
                    className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-3"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-slate-200"
                >
                  Last name
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
                        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-3"
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-200"
              >
                Username
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
                      d="M4 8h16M4 12h10M4 16h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-3"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Use letters, numbers, underscores. 3–20 chars.
              </p>
            </div>

            {/* Email */}
            <div className="mt-4">
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
                  autoComplete="email"
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-3"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
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
                  {...register("password")}
                  type={showPw ? "text" : "password"}
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500 text-slate-100 py-3 pl-10 pr-12"
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
              <p className="mt-1 text-xs text-slate-400">
                Use 8+ chars with a mix of letters, numbers, and symbols.
              </p>
            </div>

            {/* Submit */}
            <div className="mt-6">
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
                Sign up
              </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
