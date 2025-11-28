import { FaPen, FaTrashCan } from "react-icons/fa6";
import { LastName } from "@/types/lastName";
import { lastNameStyles } from "@/styles/lastName.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: LastName[];
  isAdmin: boolean;
  onEdit: (item: LastName, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function LastNameTable({ data, isAdmin, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return (
      <div className={lastNameStyles.table.container}>
        <div className={lastNameStyles.table.empty}>No Last Names found.</div>
      </div>
    );
  }

  return (
    <div className={lastNameStyles.table.container}>
      <div className={lastNameStyles.table.wrapper}>
        <table className={lastNameStyles.table.element}>
          <thead className={lastNameStyles.table.thead}>
            <tr>
              <th className={lastNameStyles.table.thCode}>Code</th>
              <th className={lastNameStyles.table.thType}>Type</th>
              <th className={lastNameStyles.table.thArticle}>Article</th>
              <th className={lastNameStyles.table.thCustomer}>Customer</th>
              <th className={lastNameStyles.table.thStatus}>Status</th>
              {isAdmin && <th className={lastNameStyles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={lastNameStyles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={lastNameStyles.table.tr}>
                <td className={lastNameStyles.table.tdHighlight}>{item.lastCode}</td>
                <td className={lastNameStyles.table.td}>{item.lastType}</td>
                <td className={lastNameStyles.table.td}>{item.article}</td>
                <td className={lastNameStyles.table.td}>{item.customerName || "N/A"}</td>
                <td className={lastNameStyles.table.tdCenter}>
                  <StatusBadge status={item.lastStatus} />
                </td>
                {isAdmin && (
                  <td className={lastNameStyles.table.td}>
                    <div className={lastNameStyles.table.actions}>
                      <button onClick={(e) => onEdit(item, e)} className={lastNameStyles.table.actionBtn('edit')}>
                        <FaPen />
                      </button>
                      <button onClick={(e) => onDelete(item.id, e)} className={lastNameStyles.table.actionBtn('delete')}>
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