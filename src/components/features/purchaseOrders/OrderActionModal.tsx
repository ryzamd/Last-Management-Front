import { useState } from "react";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import { FaCheck, FaBan, FaTriangleExclamation } from "react-icons/fa6";

interface Props {
  isOpen: boolean;
  type: 'confirm' | 'deny' | null;
  onClose: () => void;
  onSubmit: (reason?: string) => void;
  isProcessing: boolean;
}

export default function OrderActionModal({ isOpen, type, onClose, onSubmit, isProcessing }: Props) {
  const [reason, setReason] = useState("");

  if (!isOpen || !type) return null;

  const isConfirm = type === 'confirm';

  const handleSubmit = () => {
    onSubmit(reason);
    setReason(""); // Reset reason after submit
  };

  return (
    <div className={styles.actionModal.overlay}>
      <div className={styles.actionModal.container}>
        
        {/* Icon & Title */}
        <div className="text-center">
          <div className={styles.actionModal.iconBox(type)}>
            {isConfirm ? <FaCheck className="text-3xl" /> : <FaBan className="text-3xl" />}
          </div>
          <h3 className={styles.actionModal.title}>
            {isConfirm ? "Confirm Order" : "Deny Order"}
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className={styles.actionModal.message}>
            {isConfirm
              ? "Are you sure you want to confirm this order? Inventory stocks will be updated automatically." 
              : "You are about to deny this order. Please provide a reason for the requester."}
          </p>

          {!isConfirm && (
            <div>
              <textarea
                className={styles.actionModal.textarea}
                placeholder="Enter reason for denial..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                autoFocus
              />
              {reason.trim().length === 0 && (
                <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                  <FaTriangleExclamation /> Reason is required
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actionModal.actions}>
          <button onClick={onClose} className={styles.actionModal.btnCancel} disabled={isProcessing}> Cancel </button>
          
          <button onClick={handleSubmit} disabled={isProcessing || (!isConfirm && !reason.trim())} className={isConfirm ? styles.actionModal.btnConfirm : styles.actionModal.btnDeny}>
            {isProcessing ? "Processing..." : (isConfirm ? "Yes, Confirm" : "Deny Order")}
          </button>
        </div>

      </div>
    </div>
  );
}