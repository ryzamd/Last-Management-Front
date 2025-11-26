"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserAstronaut, FaLock, FaXmark } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthService } from "@/services/auth.service";
import clsx from "clsx";

interface LoginModalProps {isOpen: boolean; onClose: () => void}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuthStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");
    try {
        // TODO: Switch to AuthService.login(data) when API is ready
        // Using mockLogin for demonstration
        const user = await AuthService.mockLogin(data);
        login(user);
        reset();
        onClose();
    } catch (err) {
        setError("Invalid username or password");
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-space-500 bg-space-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-space-800/50 border-b border-space-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaUserAstronaut className="text-space-300" />
            Admin Access
          </h2>
          <button onClick={onClose} className="text-space-300 hover:text-white transition-colors">
            <FaXmark size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-200 bg-red-900/50 border border-red-500 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <FaUserAstronaut className="absolute left-3 top-3 text-space-500 group-focus-within:text-space-300 transition-colors" />
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder="Username"
                className="w-full bg-space-900/50 border border-space-500 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-space-500 focus:outline-none focus:border-space-300 focus:ring-1 focus:ring-space-300 transition-all"
              />
            </div>
            
            <div className="relative group">
              <FaLock className="absolute left-3 top-3 text-space-500 group-focus-within:text-space-300 transition-colors" />
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full bg-space-900/50 border border-space-500 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-space-500 focus:outline-none focus:border-space-300 focus:ring-1 focus:ring-space-300 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={clsx(
              "w-full py-3 rounded-xl font-bold text-space-900 transition-all",
              isLoading ? "bg-space-500 cursor-not-allowed" : "bg-gradient-to-r from-space-300 to-space-500 hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}