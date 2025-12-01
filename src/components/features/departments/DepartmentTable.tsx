import { FaPen, FaTrashCan } from "react-icons/fa6";
import { Department } from "@/types/department";
import { departmentStyles as styles } from "@/styles/department.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: Department[];
  isAdmin: boolean;
  onEdit: (item: Department, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function DepartmentTable({ data, isAdmin, onEdit, onDelete }: Props) {
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
              <th className="px-6 py-4 font-bold w-[15%]">Code</th>
              <th className="px-6 py-4 font-bold w-[35%]">Name</th>
              <th className="px-6 py-4 font-bold w-[20%]">Type</th>
              <th className="px-6 py-4 font-bold w-[15%] text-center">Status</th>
              {isAdmin && <th className="px-6 py-4 font-bold text-right w-[15%]">Actions</th>}
            </tr>
          </thead>
          <tbody className={styles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={styles.table.tr}>
                <td className={styles.table.td}>
                  <span className="font-bold text-white font-grotesk">{item.departmentCode}</span>
                </td>
                <td className={styles.table.tdHighlight}>{item.departmentName}</td>
                <td className={styles.table.td}>{item.departmentType}</td>
                <td className={styles.table.tdCenter}>
                  <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />
                </td>
                {isAdmin && (
                  <td className={styles.table.td}>
                    <div className={styles.table.actions}>
                      <button onClick={(e) => onEdit(item, e)} className={styles.table.actionBtn('edit')}>
                        <FaPen />
                      </button>
                      <button onClick={(e) => onDelete(item.id, e)} className={styles.table.actionBtn('delete')}>
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