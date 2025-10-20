import type { IUser } from "../../../../types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Axios } from "../../../../api";
import { useState } from "react";
import type { AxiosError } from "axios";

export const ChangeEmail = () => {
    const [errMessage, setErrMessage] = useState("");
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: {errors}, reset} = useForm<IUser>();
    

    const changeEmail: SubmitHandler<IUser> = (user) => {
        Axios.patch("/auth/profile/settings/change-email", user)
        .then(response => {
            setErrMessage('')
            setMessage(response.data.message);
            reset()
        })
        .catch(err => {
            const error = (err as AxiosError).response?.data as { message: string };
            setMessage('');
            if (error) 
                setErrMessage(error.message);
        })
    }

  return (
    <div className="flex w-full bg-gray-950 py-6">
      <div className="w-full  rounded-3xl py-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold text-white">Change Email</h1>

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
        <form className="space-y-5" onSubmit={handleSubmit(changeEmail)}>
          <div>
            <label
              htmlFor="currentEmail"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Current Email
            </label>
            <input
              id="currentEmail"
              type="email"
              {...register("currentEmail")}
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          <div>
            <label
              htmlFor="newEmail"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              New Email
            </label>
            <input
              id="newEmail"
              type="email"
              {...register("newEmail")}
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};
