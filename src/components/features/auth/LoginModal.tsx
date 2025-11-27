"use client";

import { useLogin } from "@/hooks/useLogin";
import LoginModalView from "./LoginModalView";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModalContainer({ isOpen, onClose }: LoginModalProps) {
  const { form, isLoading, error, handleLogin } = useLogin(onClose);

  return (
    <LoginModalView
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      error={error}
      form={form}
      onSubmit={handleLogin}
    />
  );
}