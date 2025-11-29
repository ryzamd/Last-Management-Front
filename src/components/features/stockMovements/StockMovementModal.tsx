import { FaXmark, FaRightLeft, FaBox, FaMapLocationDot, FaUserTag } from "react-icons/fa6";
import { stockMovementStyles as styles } from "@/styles/stockMovement.styles";
import { StockMovementDto } from "@/services/stockMovement.service";

interface Props {isOpen: boolean; movement: StockMovementDto | null; onClose: () => void; isLoading: boolean;}

export default function StockMovementModal({ isOpen, movement, onClose, isLoading }: Props) {
  if (!isOpen || !movement) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString('en-GB', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  return (
    <div className={styles.modal.overlay}>
      <div className={styles.modal.container}>
        {/* Header */}
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>
            <FaRightLeft className="text-emerald-500" />
            Transaction Details
          </h2>
          <button onClick={onClose} className="text-space-500 hover:text-white transition-colors">
            <FaXmark size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.modal.content}>
          {isLoading ? (
            <div className="text-center py-10 text-space-500 font-mono animate-pulse">Loading details...</div>
          ) : (
            <div className="space-y-6">
                
                {/* General Info */}
                <div className={styles.modal.infoGroup}>
                    <h3 className={styles.modal.groupTitle}>General Information</h3>
                    <div className={styles.modal.infoGrid}>
                        <div className={styles.modal.infoItem}>
                            <span className={styles.modal.label}>Transaction ID</span>
                            <span className={styles.modal.value}>{movement.id}</span>
                        </div>
                        <div className={styles.modal.infoItem}>
                            <span className={styles.modal.label}>Date & Time</span>
                            <span className={styles.modal.value}>{formatDate(movement.createdAt)}</span>
                        </div>
                        <div className={styles.modal.infoItem}>
                            <span className={styles.modal.label}>Type</span>
                            <div><span className={styles.table.badge(movement.movementType)}>{movement.movementType}</span></div>
                        </div>
                        <div className={styles.modal.infoItem}>
                            <span className={styles.modal.label}>Quantity</span>
                            <span className={`${styles.modal.valueQuantity} text-xl font-bold ${movement.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className={styles.modal.infoGroup}>
                    <h3 className={styles.modal.groupTitle}>Product Details</h3>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-200 rounded-lg text-emerald-500">
                            <FaBox size={20} />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className={styles.modal.infoItem}>
                                <span className={styles.modal.label}>Item Code (Last)</span>
                                <span className={styles.modal.valueHighlight}>{movement.lastCode || movement.lastNameId}</span>
                            </div>
                            <div className={styles.modal.infoItem}>
                                <span className={styles.modal.label}>Size</span>
                                <span className={styles.modal.value}>{movement.sizeLabel || movement.lastSizeId}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Flow */}
                <div className={styles.modal.infoGroup}>
                    <h3 className={styles.modal.groupTitle}>Movement Flow</h3>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-200 rounded-lg text-blue-400">
                            <FaMapLocationDot size={20} />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className={styles.modal.infoItem}>
                                <span className={styles.modal.label}>From Location</span>
                                <span className={movement.fromLocationId ? "text-red-300 font-mono text-sm font-bold" : "text-space-600 font-mono text-sm italic"}>
                                    {movement.fromLocationName || movement.fromLocationId || "External"}
                                </span>
                            </div>
                            <div className={styles.modal.infoItem}>
                                <span className={styles.modal.label}>To Location</span>
                                <span className={movement.toLocationId ? "text-emerald-300 font-mono text-sm font-bold" : "text-space-600 font-mono text-sm italic"}>
                                    {movement.toLocationName || movement.toLocationId || "External"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audit Info */}
                <div className={styles.modal.infoGroup}>
                    <h3 className={styles.modal.groupTitle}>Audit Trail</h3>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-200 rounded-lg text-purple-400">
                            <FaUserTag size={20} />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className={styles.modal.infoItem}>
                                <span className={styles.modal.label}>Performed By</span>
                                <span className={styles.modal.value}>{movement.createdBy || "System"}</span>
                            </div>
                            <div className={styles.modal.infoItem}>
                                <span className={styles.modal.label}>Reference No.</span>
                                <span className={styles.modal.value}>{movement.referenceNumber || "N/A"}</span>
                            </div>
                            <div className={`${styles.modal.infoItem} col-span-2`}>
                                <span className={styles.modal.label}>Reason / Note</span>
                                <span className="text-sm font-mono text-space-300 italic">
                                    {movement.reason || "No additional notes provided."}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.modal.btnClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}