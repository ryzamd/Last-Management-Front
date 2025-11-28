import { FaUserAstronaut, FaLock, FaXmark } from "react-icons/fa6";
import { UseFormReturn } from "react-hook-form";
import { LoginRequest } from "@/types/auth";
import { loginStyles } from "@/styles/auth.styles";

interface LoginModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string;
  form: UseFormReturn<LoginRequest>;
  onSubmit: (data: LoginRequest) => Promise<void>;
}

export default function LoginModalView({isOpen, onClose, isLoading, error, form: { register, handleSubmit }, onSubmit}: LoginModalViewProps) {
  if (!isOpen) return null;

  return (
    <div className={loginStyles.overlay}>
      <div className={loginStyles.container}>
        {/* Header */}
        <div className={loginStyles.header.wrapper}>
          <h2 className={loginStyles.header.title}>
            <FaUserAstronaut className="text-space-300" />
            Admin Access
          </h2>
          <button onClick={onClose} className={loginStyles.header.closeBtn}>
            <FaXmark size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className={loginStyles.form.wrapper}>
          {error && <div className={loginStyles.form.errorBox}>{error}</div>}

          <div className={loginStyles.form.inputGroup}>
            <div className={loginStyles.form.inputWrapper}>
              <FaUserAstronaut className={loginStyles.form.inputIcon} />
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder="Username"
                className={loginStyles.form.inputField}
                autoComplete="off"
              />
            </div>
            
            <div className={loginStyles.form.inputWrapper}>
              <FaLock className={loginStyles.form.inputIcon} />
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className={loginStyles.form.inputField}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={loginStyles.form.submitBtn(isLoading)}
          >
            {isLoading ? "Verifying Credentials" : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}