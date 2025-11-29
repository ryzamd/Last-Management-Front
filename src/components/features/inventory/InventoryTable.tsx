import { FaPen, FaRightLeft } from "react-icons/fa6";
import { InventoryItem } from "@/types/inventory";
import { inventoryStyles } from "@/styles/inventory.styles";
import { MouseEvent } from "react";

interface Props {
  data: InventoryItem[];
  isAdmin: boolean;
  onEdit: (item: InventoryItem, e: React.MouseEvent) => void;
  onAdjust: (item: InventoryItem, e: React.MouseEvent) => void;
}

export default function InventoryTable({ data, isAdmin, onEdit, onAdjust }: Props) {
  if (data.length === 0) {
    return (
      <div className={inventoryStyles.table.container}>
        <div className={inventoryStyles.table.empty}>No inventory items found.</div>
      </div>
    );
  }

  return (
    <div className={inventoryStyles.table.container}>
      <div className={inventoryStyles.table.wrapper}>
        <table className={inventoryStyles.table.element}>
          <thead className={inventoryStyles.table.thead}>
            <tr>
              <th className={inventoryStyles.table.thSku}>Code (Last)</th>
              <th className={inventoryStyles.table.thSku}>Size</th>
              <th className={inventoryStyles.table.thName}>Location</th>
              <th className={inventoryStyles.table.thQty}>Good</th>
              <th className={inventoryStyles.table.thQty}>Damaged</th>
              <th className={inventoryStyles.table.thQty}>Reserved</th>
              {isAdmin && <th className={inventoryStyles.table.thAction}>Actions</th>}
            </tr>
          </thead>
          <tbody className={inventoryStyles.table.tbody}>
            {data.map((item) => (
              <tr key={item.id} className={inventoryStyles.table.tr}>
                <td className={inventoryStyles.table.td}>
                  <span className="font-bold text-white font-grotesk">{item.lastCode || "N/A"}</span>
                </td>
                <td className={inventoryStyles.table.td}>{item.sizeLabel || "N/A"}</td>
                <td className={inventoryStyles.table.td}>{item.locationName || "N/A"}</td>
                
                <td className={inventoryStyles.table.tdNumber}>
                    <span className="text-emerald-400 font-bold">{item.quantityGood}</span>
                </td>
                <td className={inventoryStyles.table.tdNumber}>
                    <span className={item.quantityDamaged > 0 ? "text-red-400" : "text-space-500"}>
                        {item.quantityDamaged}
                    </span>
                </td>
                <td className={inventoryStyles.table.tdNumber}>
                    <span className={item.quantityReserved > 0 ? "text-amber-400" : "text-space-500"}>
                        {item.quantityReserved}
                    </span>
                </td>

                {isAdmin && (
                  <td className={inventoryStyles.table.td}>
                    <div className={inventoryStyles.table.actions}>
                      {/* Edit Button (For changing Location/Metadata, not Qty) */}
                      <button 
                        onClick={(e) => onEdit(item, e)} 
                        className={inventoryStyles.table.actionBtn('edit')}
                        title="Edit Item Details"
                      >
                        <FaPen />
                      </button>
                      
                      {/* Adjust Button (For changing Quantity with Audit) */}
                      <button 
                        onClick={(e) => onAdjust(item, e)} 
                        className="p-2 rounded-lg transition-colors text-amber-400 hover:bg-amber-500/20"
                        title="Adjust Stock Level"
                      >
                        <FaRightLeft />
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