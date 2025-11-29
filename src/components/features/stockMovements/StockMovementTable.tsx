import { StockMovementDto } from '@/services/stockMovement.service';
import { stockMovementStyles as styles } from '@/styles/stockMovement.styles';
import { FaEye } from "react-icons/fa6";

interface Props {data: StockMovementDto[]; onView: (item: StockMovementDto) => void;}

export default function StockMovementTable({ data, onView }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.table.container}>
        <div className={styles.table.empty}>No movement history found.</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={styles.table.container}>
      <div className={styles.table.wrapper}>
        <table className={styles.table.element}>
          <thead className={styles.table.thead}>
            <tr>
              <th className={styles.table.thDate}>Time</th>
              <th className={styles.table.thType}>Type</th>
              <th className={styles.table.thItem}>Item / Size</th>
              <th className={styles.table.thQty}>Qty</th>
              <th className={styles.table.thLocation}>Location Flow</th>
              <th className={styles.table.thUser}>User</th>
              <th className={styles.table.thAction}></th>
            </tr>
          </thead>
          <tbody className={styles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} onClick={() => onView(item)} className={styles.table.tr}>
                <td className={styles.table.tdDate}>{formatDate(item.createdAt)}</td>
                <td className={styles.table.td}>
                  <span className={styles.table.badge(item.movementType)}>
                    {item.movementType}
                  </span>
                </td>
                <td className={styles.table.td}>
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-bold font-grotesk">{item.lastCode || "Unknown Code"}</span>
                        <span className="text-space-400 text-xs font-mono">{item.sizeLabel || "Unknown Size"}</span>
                    </div>
                </td>
                <td className={`${styles.table.tdNumber} ${item.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.quantity > 0 ? '+' : ''}{item.quantity}
                </td>
                <td className={styles.table.td}>
                    <div className="flex flex-col gap-1">
                        {item.toLocationName ? (
                            <span className="text-emerald-300 text-xs flex items-center gap-1">
                                <span className="text-emerald-500/50 uppercase text-[10px] font-bold">To:</span>
                                {item.toLocationName}
                            </span>
                        ) : null}
                        
                        {item.fromLocationName ? (
                            <span className="text-red-300 text-xs flex items-center gap-1">
                                <span className="text-red-500/50 uppercase text-[10px] font-bold">From:</span>
                                {item.fromLocationName}
                            </span>
                        ) : null}
                        
                        {!item.toLocationId && !item.fromLocationId && (
                            <span className="text-space-500 text-xs italic">External Adjustment</span>
                        )}
                    </div>
                </td>
                <td className={styles.table.td}>{item.createdBy || "System"}</td>
                <td className={styles.table.td}>
                    <button className={styles.table.actionBtn}>
                        <FaEye />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}