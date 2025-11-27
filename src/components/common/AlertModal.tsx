import { FaTriangleExclamation } from "react-icons/fa6";
import { customerStyles } from "@/styles/customer.styles";

interface AlertModalProps {message: string | null; onClose: () => void}

export default function AlertModal({ message, onClose }: AlertModalProps) {
  if (!message) return null;

  return (
    <div className={customerStyles.modal.overlay}>
      <div className="bg-space-900 rounded-2xl border border-red-500/50 p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
            <FaTriangleExclamation size={24} />
          </div>
          <h3 className="text-xl font-phudu font-bold text-white">Action Failed</h3>
          <p className="text-sm font-mono text-space-300">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}