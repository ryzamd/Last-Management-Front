import { PurchaseOrder } from "@/types/purchaseOrder";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import { FaXmark, FaCheck, FaBan, FaFileSignature, FaSpinner } from "react-icons/fa6";

interface Props {
  isOpen: boolean;
  order: PurchaseOrder | null;
  isAdmin: boolean;
  isProcessing: boolean;
  isLoadingData?: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onDeny: (id: string) => void;
}

export default function PurchaseOrderModal({ isOpen, order, isAdmin, isProcessing, isLoadingData, onClose, onConfirm, onDeny }: Props) {
  if (!isOpen || !order) return null;

  const isPending = order.status === 'Pending';

  return (
    <div className={styles.detailModal.overlay}>
      <div className={styles.detailModal.container}>
        {/* Header */}
        <div className={styles.detailModal.header}>
          <h2 className={styles.detailModal.title}>
            <FaFileSignature className="text-space-400"/>
            Order Details: <span className="text-emerald-400 ml-2">{order.orderNumber}</span>
          </h2>
          <button onClick={onClose} className="text-space-500 hover:text-white transition-colors">
            <FaXmark size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.detailModal.content}>
          {/* Info Grid */}
          <div className={styles.detailModal.infoGrid}>
            <div className={styles.detailModal.infoItem}>
              <div className={styles.detailModal.infoLabel}>Requested By</div>
              <div className={styles.detailModal.infoValue}>{order.requestedBy}</div>
            </div>
            <div className={styles.detailModal.infoItem}>
              <div className={styles.detailModal.infoLabel}>Department</div>
              <div className={styles.detailModal.infoValue}>{order.department}</div>
            </div>
            <div className={styles.detailModal.infoItem}>
              <div className={styles.detailModal.infoLabel}>Target Location</div>
              <div className={styles.detailModal.infoValue}>{order.departmentName || "N/A"}</div>
            </div>
            <div className={styles.detailModal.infoItem}>
              <div className={styles.detailModal.infoLabel}>Status</div>
              <div>
                <span className={styles.tableContainer.statusBadge(order.status)}>{order.status}</span>
              </div>
            </div>
            {order.status !== 'Pending' && (
                <div className={`${styles.detailModal.infoItem} col-span-2`}>
                    <div className={styles.detailModal.infoLabel}>Reviewed By</div>
                    <div className={styles.detailModal.infoValue}>
                        {order.reviewedBy} at {order.reviewedAt ? new Date(order.reviewedAt).toLocaleString() : ''}
                    </div>
                </div>
            )}
            {order.denyReason && (
                <div className={`${styles.detailModal.infoItem} col-span-4 bg-red-900/20 p-2 rounded border border-red-900/50`}>
                    <div className="text-xs font-bold text-red-400 uppercase">Deny Reason</div>
                    <div className="text-sm font-mono text-red-200">{order.denyReason}</div>
                </div>
            )}
          </div>

          {/* Items Table */}
          <div>
            <div className="flex items-center gap-2 mb-2 pl-1">
                <h3 className="text-white font-bold font-grotesk uppercase text-sm">Request Items</h3>
                {isLoadingData && <FaSpinner className="animate-spin text-emerald-400 text-xs" />}
            </div>
            
            <div className="rounded-lg border border-space-800 overflow-hidden min-h-[100px] relative">
                {isLoadingData && (
                    <div className="absolute inset-0 bg-space-900/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <span className="text-space-300 text-xs font-mono animate-pulse">Fetching details...</span>
                    </div>
                )}

                <table className={styles.detailModal.itemsTable}>
                <thead className={styles.detailModal.itemsThead}>
                    <tr>
                    <th className={styles.detailModal.itemsTh}>Code</th>
                    <th className={styles.detailModal.itemsTh}>Model</th>
                    <th className={styles.detailModal.itemsTh}>Size</th>
                    <th className={`${styles.detailModal.itemsTh} text-right`}>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item: any, idx: number) => (
                    <tr key={idx}>
                        <td className={`${styles.detailModal.itemsTd} font-bold text-white`}>{item.lastCode || "-"}</td>
                        <td className={styles.detailModal.itemsTd}>{item.modelName || "-"}</td>
                        <td className={styles.detailModal.itemsTd}>{item.sizeLabel || "-"}</td>
                        <td className={`${styles.detailModal.itemsTd} text-right font-bold text-emerald-400`}>{item.quantityRequested}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.detailModal.footer}>
          <button onClick={onClose} className={styles.detailModal.btnSecondary}>
            Close
          </button>
          
          {isAdmin && isPending && (
            <>
              <button
                onClick={() => onDeny(order.id)}
                disabled={isProcessing || isLoadingData}
                className={`${styles.detailModal.btnDanger} disabled:opacity-50`}
              >
                <FaBan className="inline mr-2" /> Deny
              </button>
              <button
                onClick={() => onConfirm(order.id)}
                disabled={isProcessing || isLoadingData}
                className={`${styles.detailModal.btnPrimary} disabled:opacity-50`}
              >
                <FaCheck className="inline mr-2" /> Confirm Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}