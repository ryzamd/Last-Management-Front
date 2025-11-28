import { FaPen, FaTrashCan } from "react-icons/fa6";
import { Location } from "@/types/location";
import { locationStyles } from "@/styles/location.styles";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  data: Location[];
  isAdmin: boolean;
  onEdit: (item: Location, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function LocationTable({ data, isAdmin, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return (
      <div className={locationStyles.table.container}>
        <div className={locationStyles.table.empty}>No locations found.</div>
      </div>
    );
  }

  return (
    <div className={locationStyles.table.container}>
      <div className={locationStyles.table.wrapper}>
        <table className={locationStyles.table.element}>
          <thead className={locationStyles.table.thead}>
            <tr>
              <th className={locationStyles.table.thCode}>Code</th>
              <th className={locationStyles.table.thName}>Name</th>
              <th className={locationStyles.table.thType}>Type</th>
              <th className={locationStyles.table.thStatus}>Status</th>
              {isAdmin && <th className={locationStyles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={locationStyles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={locationStyles.table.tr}>
                <td className={locationStyles.table.td}>
                  <span className="font-bold text-white font-grotesk">{item.locationCode}</span>
                </td>
                <td className={locationStyles.table.td}>{item.locationName}</td>
                <td className={locationStyles.table.td}>{item.locationType}</td>
                <td className={locationStyles.table.tdCenter}>
                  <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />
                </td>
                {isAdmin && (
                  <td className={locationStyles.table.td}>
                    <div className={locationStyles.table.actions}>
                      <button onClick={(e) => onEdit(item, e)} className={locationStyles.table.actionBtn('edit')}>
                        <FaPen />
                      </button>
                      <button onClick={(e) => onDelete(item.id, e)} className={locationStyles.table.actionBtn('delete')}>
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