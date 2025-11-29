import { PurchaseOrder } from "@/types/purchaseOrder";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import { FaEye } from "react-icons/fa6";

interface Props {
  data: PurchaseOrder[];
  onView: (order: PurchaseOrder) => void;
}

export default function PurchaseOrderTable({ data, onView }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.tableContainer.wrapper}>
        <div className="p-12 text-center text-space-500 font-mono italic">No purchase orders found.</div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer.wrapper}>
      <table className={styles.tableContainer.table}>
        <thead className={styles.tableContainer.thead}>
          <tr>
            <th className={styles.tableContainer.th}>Order No.</th>
            <th className={styles.tableContainer.th}>Requested By</th>
            <th className={styles.tableContainer.th}>Department</th>
            <th className={styles.tableContainer.th}>Location</th>
            <th className={styles.tableContainer.th}>Date</th>
            <th className={styles.tableContainer.th}>Status</th>
            <th className={`${styles.tableContainer.th} text-right`}>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tableContainer.tbody}>
          {data.map((order) => (
            <tr key={order.id} onClick={() => onView(order)} className={styles.tableContainer.tr}>
              <td className={styles.tableContainer.tdBold}>{order.orderNumber}</td>
              <td className={styles.tableContainer.td}>{order.requestedBy}</td>
              <td className={styles.tableContainer.td}>{order.department}</td>
              <td className={styles.tableContainer.td}>{order.locationName || "N/A"}</td>
              <td className={styles.tableContainer.td}>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className={styles.tableContainer.td}>
                <span className={styles.tableContainer.statusBadge(order.status)}>
                  {order.status}
                </span>
              </td>
              <td className={`${styles.tableContainer.td} text-right`}>
                <button onClick={(e) => { e.stopPropagation(); onView(order); }} className={styles.tableContainer.actionBtn}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}