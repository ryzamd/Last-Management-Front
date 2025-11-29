import { FaTrashCan } from "react-icons/fa6";
import { Department } from "@/services/department.service";
import { departmentStyles as styles } from "@/styles/department.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: Department[];
  isAdmin: boolean;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function DepartmentTable({ data, isAdmin, onDelete }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.table.container}>
        <div className={styles.table.empty}>No departments found.</div>
      </div>
    );
  }

  return (
    <div className={styles.table.container}>
      <div className={styles.table.wrapper}>
        <table className={styles.table.element}>
          <thead className={styles.table.thead}>
            <tr>
              <th className={styles.table.thName}>Department Name</th>
              <th className={styles.table.thStatus}>Status</th>
              {isAdmin && <th className={styles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={styles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={styles.table.tr}>
                <td className={styles.table.tdHighlight}>{item.departmentName}</td>
                <td className={styles.table.tdCenter}>
                  <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />
                </td>
                {isAdmin && (
                  <td className={styles.table.td}>
                    <div className={styles.table.actions}>
                      <button onClick={(e) => onDelete(item.id!, e)} className={styles.table.actionBtn}>
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