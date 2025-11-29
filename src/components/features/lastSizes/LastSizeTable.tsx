import { FaPen, FaTrashCan } from "react-icons/fa6";
import { LastSize } from "@/services/lastSize.service";
import { lastSizeStyles } from "@/styles/lastSize.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: LastSize[];
  isAdmin: boolean;
  onEdit: (item: LastSize, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function LastSizeTable({ data, isAdmin, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return (
      <div className={lastSizeStyles.table.container}>
        <div className={lastSizeStyles.table.empty}>No sizes found.</div>
      </div>
    );
  }

  return (
    <div className={lastSizeStyles.table.container}>
      <div className={lastSizeStyles.table.wrapper}>
        <table className={lastSizeStyles.table.element}>
          <thead className={lastSizeStyles.table.thead}>
            <tr>
              <th className={lastSizeStyles.table.thLabel}>Label</th>
              <th className={lastSizeStyles.table.thReplacement}>Replacement</th>
              <th className={lastSizeStyles.table.thStatus}>Status</th>
              {isAdmin && <th className={lastSizeStyles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={lastSizeStyles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={lastSizeStyles.table.tr}>
                <td className={lastSizeStyles.table.tdHighlight}>Size {item.sizeLabel}</td>
                <td className={lastSizeStyles.table.td}>{item.replacementSizeLabel || "-"}</td>
                <td className={lastSizeStyles.table.tdCenter}>
                  <StatusBadge status={item.status} />
                </td>
                {isAdmin && (
                  <td className={lastSizeStyles.table.td}>
                    <div className={lastSizeStyles.table.actions}>
                      <button onClick={(e) => onEdit(item, e)} className={lastSizeStyles.table.actionBtn('edit')}>
                        <FaPen />
                      </button>
                      <button onClick={(e) => onDelete(item.id!, e)} className={lastSizeStyles.table.actionBtn('delete')}>
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