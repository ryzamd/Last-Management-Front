import { FaPen, FaTrashCan } from "react-icons/fa6";
import { Customer } from "@/types/customer";
import { customerStyles } from "@/styles/customer.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: Customer[];
  isAdmin: boolean;
  onEdit: (c: Customer, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onView: (c: Customer) => void;
}

export default function CustomerTable({ data, isAdmin, onEdit, onDelete, onView }: Props) {
  if (data.length === 0) {
    return (
      <div className={customerStyles.table.container}>
        <div className={customerStyles.table.empty}>No customers found.</div>
      </div>
    );
  }

  return (
    <div className={customerStyles.table.container}>
      <div className={customerStyles.table.wrapper}>
        <table className={customerStyles.table.element}>
          <thead className={customerStyles.table.thead}>
            <tr>
              <th className={customerStyles.table.thName}>Customer Name</th>
              
              <th className={customerStyles.table.thStatus(isAdmin)}>Status</th>
              
              {isAdmin && <th className={customerStyles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={customerStyles.table.tbody}>
            {data.map((customer) => (
              <tr key={customer.id} onClick={() => onView(customer)} className={customerStyles.table.tr}>
                <td className={customerStyles.table.td}>
                  <span className="font-bold text-white font-grotesk text-base">{customer.customerName}</span>
                </td>
                <td className={customerStyles.table.td}>
                  <StatusBadge status={customer.status} />
                </td>
                {isAdmin && (
                  <td className={customerStyles.table.td}>
                    <div className={customerStyles.table.actions}>
                      <button onClick={(e) => onEdit(customer, e)} className={customerStyles.table.actionBtn('edit')}>
                        <FaPen />
                      </button>
                      <button onClick={(e) => onDelete(customer.id, e)} className={customerStyles.table.actionBtn('delete')}>
                        <FaTrashCan />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}