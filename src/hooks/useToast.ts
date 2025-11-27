import { useToastStore } from '@/store/useToastStore';

export const useToast = () => {
  const { addToast, removeToast } = useToastStore();

  const toast = {
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
    remove: (id: string) => removeToast(id),
  };

  return toast;
};