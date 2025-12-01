import { FaPen, FaTrashCan, FaLink } from "react-icons/fa6";
import { LastModel } from "@/types/lastModel";
import { lastModelStyles as styles } from "@/styles/lastModel.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: LastModel[];
  isAdmin: boolean;
  onEdit: (item: LastModel, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onAssociate: (item: LastModel, e: React.MouseEvent) => void;
}

export default function LastModelTable({ data, isAdmin, onEdit, onDelete, onAssociate }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.table.container}>
        <div className={styles.table.empty}>No Models found.</div>
      </div>
    );
  }

  return (
    <div className={styles.table.container}>
      <div className={styles.table.wrapper}>
        <table className={styles.table.element}>
          <thead className={styles.table.thead}>
            <tr>
              <th className={styles.table.thName}>Model Name</th>
              <th className={styles.table.thDesc}>Description</th>
              <th className={styles.table.thStatus}>Status</th>
              {isAdmin && <th className={styles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={styles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={styles.table.tr}>
                <td className={styles.table.tdHighlight}>{item.modelName}</td>
                <td className={styles.table.td}>{item.description || "-"}</td>
                <td className={styles.table.tdCenter}>
                  <StatusBadge status={item.status} />
                </td>
                {isAdmin && (
                  <td className={styles.table.td}>
                    <div className={styles.table.actions}>
                      <button
                        onClick={(e) => onAssociate(item, e)}
                        className={styles.table.actionBtn('link')}
                        title="Link LastNames"
                      >
                        <FaLink />
                      </button>
                      <button onClick={(e) => onEdit(item, e)} className={styles.table.actionBtn('edit')}>
                        <FaPen />
                      </button>
                      <button onClick={(e) => onDelete(item.id!, e)} className={styles.table.actionBtn('delete')}>
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