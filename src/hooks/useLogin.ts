import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginRequest } from "@/types/auth";

interface UseLoginReturn {
  form: UseFormReturn<LoginRequest>;
  isLoading: boolean;
  error: string;
  handleLogin: (data: LoginRequest) => Promise<void>;
}

export const useLogin = (onSuccess?: () => void): UseLoginReturn => {
  const { login } = useAuthStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginRequest>();

  const handleLogin = async (data: LoginRequest) => {
    setIsLoading(true);
    setError("");
    
    try {
      const user = await AuthService.login(data);
      login(user);
      form.reset();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, error, handleLogin };
};