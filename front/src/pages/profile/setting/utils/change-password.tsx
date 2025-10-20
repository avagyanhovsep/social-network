import type { IUser } from "../../../../types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Axios } from "../../../../api";
import type { AxiosError } from "axios";

export const ChangePassword = () => {
    const [showPw, setShowPw] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUser>();
    

    const changePassword: SubmitHandler <IUser> = (data) => {
        Axios.patch("/auth/profile/settings/change-password", data)
        .then(response => {
            setErrMessage("");
            setMessage(response.data.message);
            reset()
        })
        .catch(err => {
            const error = (err as AxiosError).response?.data as { message: string };
            setMessage("");
            if (error) 
                setErrMessage(error.message);
        })
    }
  return (
    <div className="flex w-full bg-gray-950 py-6">
      <div className="w-full rounded-3xl py-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold text-white">Change Password</h1>
        <div>
          {(errMessage || message || errors.email?.message) && (
            <p
              className={
                errMessage
                  ? "text-red-500"
                  : message
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {errMessage || message || errors.email?.message}
            </p>
          )}
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(changePassword)}>
          <div>
            <label
              htmlFor="currentemail"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="currentemail"
              type="email"
              {...register("currentemail")}
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-slate-200"
            >
              New Password
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
                id="newPassword"
                type={showPw ? "text" : "password"}
                {...register("newPassword")}
                className="pl-10 pr-12 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
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

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
