import { useState } from "react";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import { PurchaseOrderItemDto } from "@/types/purchaseOrder";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  lastNames: { value: string; label: string; code: string }[];
  sizes: { value: string; label: string }[];
  items: PurchaseOrderItemDto[];
  onAdd: (item: PurchaseOrderItemDto) => void;
  onRemove: (index: number) => void;
}

export default function OrderItemsEditor({ lastNames, sizes, items, onAdd, onRemove }: Props) {
  const [selectedLastId, setSelectedLastId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    if (!selectedLastId || !selectedSizeId || quantity <= 0) return;

    const lastNameObj = lastNames.find(l => l.value === selectedLastId);
    const sizeObj = sizes.find(s => s.value === selectedSizeId);

    onAdd({
      lastNameId: selectedLastId,
      lastSizeId: selectedSizeId,
      quantityRequested: quantity,
      lastCode: lastNameObj?.code,
      sizeLabel: sizeObj?.label
    });

    setSelectedLastId("");
    setSelectedSizeId("");
    setQuantity(1);
  };

  return (
    <div className={styles.itemsEditor.container}>
      {/* Input Row */}
      <div className={styles.itemsEditor.inputRow}>
        <div className={styles.itemsEditor.colName}>
          <label className={styles.inputGroup.label}>Item (Last Name)</label>
          <div className="mt-2">
            <CustomSelect
              value={selectedLastId}
              onChange={setSelectedLastId}
              options={lastNames}
              placeholder="Select Item"
            />
          </div>
        </div>
        
        <div className={styles.itemsEditor.colSize}>
          <label className={styles.inputGroup.label}>Size</label>
          <div className="mt-2">
            <CustomSelect
              value={selectedSizeId}
              onChange={setSelectedSizeId}
              options={sizes}
              placeholder="Size"
            />
          </div>
        </div>
        
        <div className={styles.itemsEditor.colQty}>
          <label className={styles.inputGroup.label}>Qty</label>
          <div className="mt-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className={styles.inputGroup.input}
            />
          </div>
        </div>
        
        <div className={styles.itemsEditor.colBtn}>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedLastId || !selectedSizeId || quantity <= 0}
            className={styles.itemsEditor.addBtn}
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Table Display */}
      <div className={styles.itemsTable.wrapper}>
        <table className={styles.itemsTable.table}>
          <thead className={styles.itemsTable.thead}>
            <tr>
              <th className={styles.itemsTable.th}>No.</th>
              <th className={styles.itemsTable.th}>Item Code</th>
              <th className={styles.itemsTable.th}>Size</th>
              <th className={styles.itemsTable.thRight}>Quantity</th>
              <th className={styles.itemsTable.thRight}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.itemsTable.tbody}>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.itemsTable.empty}>
                  No items added. Use the form above to add items.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={`${item.lastNameId}-${item.lastSizeId}-${index}`} className={styles.itemsTable.tr}>
                  <td className={styles.itemsTable.td}>{index + 1}</td>
                  <td className={styles.itemsTable.tdHighlight}>{item.lastCode || "Unknown"}</td>
                  <td className={styles.itemsTable.td}>{item.sizeLabel || "N/A"}</td>
                  <td className={`${styles.itemsTable.tdRight} text-emerald-400 font-bold`}>
                    {item.quantityRequested}
                  </td>
                  <td className={styles.itemsTable.tdRight}>
                    <button
                      onClick={() => onRemove(index)}
                      className={styles.itemsTable.removeBtn}
                      title="Remove Item"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}