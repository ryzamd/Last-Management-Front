import { useEffect } from 'react';
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation, FaXmark } from 'react-icons/fa6';
import { ToastMessage } from '@/store/useToastStore';
import clsx from 'clsx';

interface ToastProps {toast: ToastMessage; onClose: (id: string) => void}

const icons = {
  success: FaCircleCheck,
  error: FaCircleExclamation,
  info: FaCircleInfo,
  warning: FaTriangleExclamation,
};

const styles = {
  success: "bg-emerald-900/90 border-emerald-500/50 text-emerald-200",
  error: "bg-red-900/90 border-red-500/50 text-red-200",
  info: "bg-blue-900/90 border-blue-500/50 text-blue-200",
  warning: "bg-amber-900/90 border-amber-500/50 text-amber-200",
};

export default function Toast({ toast, onClose }: ToastProps) {
  const Icon = icons[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <div
      className={clsx(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-md min-w-[300px] max-w-md animate-in slide-in-from-right-full duration-300 pointer-events-auto",
        styles[toast.type]
      )}
    >
      <Icon className="mt-0.5 text-lg shrink-0" />
      <div className="flex-1 text-sm font-mono">{toast.message}</div>
      <button onClick={() => onClose(toast.id)} className="text-white/50 hover:text-white transition-colors">
        <FaXmark />
      </button>
    </div>
  );
}