import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { Axios } from "../../api";
import type { AxiosError } from "axios";

export default function Email() {
    const [errMessage, setErrMessage] = useState("");
    const navigate = useNavigate();
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IUser>();

      const handleForgotPasword: SubmitHandler<IUser> = (user) => {
        Axios.post("/auth/forgot-password", user)
            .then(() => {
                sessionStorage.setItem('email', user.email);
              navigate("verify-code");
          })
          .catch((err) => {
            const error = (err as AxiosError).response?.data as {
              message: string;
            };
              
            if (error) setErrMessage(error.message);
          });
      };
    
    return (
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Enter your email
          </h1>
        </div>
        <div className="">
          {errors && <p className="text-red-500">{errors.email?.message}</p>}
          {errMessage && <p className="text-red-500">{errMessage}</p>}
        </div>
        {/* Card */}
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-2xl backdrop-blur">
          <div className="h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />

          <form
            className="p-6 md:p-8 space-y-5"
            onSubmit={handleSubmit(handleForgotPasword)}
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

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-3 font-semibold text-slate-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ring-offset-slate-900 transition"
              >
                Send the code
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}