import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Axios } from "../../api";
import type { AxiosError } from "axios";

export default function AccountConfirmation() {
    const [errMessage, setErrMessage] = useState("");
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputs = useRef<HTMLInputElement[]>([]);
    const navigate = useNavigate();

    const {handleSubmit, formState: { errors }} = useForm<IUser>();

    const handleChange = (val: string, i: number) => {
          if (!/^\d?$/.test(val)) return;

          const next = [...code];
          next[i] = val;
          setCode(next);
          setErrMessage("");

          if (val && i < 5) inputs.current[i + 1]?.focus();
    };

    const handlePaste = (
          e: React.ClipboardEvent<HTMLInputElement>,
          i: number
        ) => {
          e.preventDefault();
          const txt = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);
          if (!txt) return;

          const next = [...code];
          for (let k = 0; k < txt.length && i + k < 6; k++) {
            next[i + k] = txt[k];
          }
          setCode(next);

          const firstEmpty = next.findIndex((d) => d === "");
          inputs.current[firstEmpty === -1 ? 5 : firstEmpty]?.focus();
    };

    const handleKeyDown = (
          e: React.KeyboardEvent<HTMLInputElement>,
          i: number
        ) => {
          const key = e.key;

          if (key === "Backspace") {
            if (code[i]) {
              // clear current and stay
              const next = [...code];
              next[i] = "";
              setCode(next);
            } else if (i > 0) {
              // move left and clear previous
              inputs.current[i - 1]?.focus();
              const next = [...code];
              next[i - 1] = "";
              setCode(next);
            }
            setErrMessage("");
            return;
          }

          if (key === "ArrowLeft" && i > 0) {
            inputs.current[i - 1]?.focus();
          }
          if (key === "ArrowRight" && i < 5) {
            inputs.current[i + 1]?.focus();
          }
    };


    const handleSignupVerification : SubmitHandler <IUser> = () => {
        if (code.some((d) => d === "")) {
            setErrMessage("Please enter all 6 digits.");
            return;
        }

        const email = sessionStorage.getItem('email');

        const fullCode = code.join("");
        Axios.post("/auth/verify", { signinCode: fullCode, email })
            .then(() => {
                sessionStorage.removeItem('email');
            navigate("/signin");
          })
          .catch((err) => {
            const error = (err as AxiosError).response?.data as {
              message: string;
            };

            if (error) setErrMessage(error.message);
          });
    }

    return (
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Enter the code
          </h1>
          <p className="mt-2 text-slate-400">
            Please check your email, we sent you a code
          </p>
        </div>

        <div>
          {errors && <p className="text-red-500">{errors.email?.message}</p>}
          {errMessage && <p className="text-red-500">{errMessage}</p>}
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-2xl backdrop-blur">
          <div className="h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />

          <form
            className="p-6 md:p-8 space-y-5"
            onSubmit={handleSubmit(handleSignupVerification)}
          >
            <div className="flex justify-center gap-3">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el!)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={(e) => handlePaste(e, i)}
                  className="w-12 h-14 text-center text-2xl rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 font-mono"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-3 font-semibold text-slate-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ring-offset-slate-900 transition"
                disabled={code.some((d) => d === "")}
              >
                Verify
              </button>
            </div>

          </form>
        </div>
      </div>
    );
}