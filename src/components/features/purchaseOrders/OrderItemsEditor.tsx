// Refactor OrderItemsEditor: Mỗi dòng phải chọn LastName -> Model -> Size

import { useState, useEffect } from "react";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import { PurchaseOrderItemDto } from "@/types/purchaseOrder";
import CustomSelect from "@/components/ui/CustomSelect";
import { LastNameService } from "@/services/lastName.service";
import { LastSizeService } from "@/services/lastSize.service";

interface Props {
  lastNames: { value: string; label: string; code: string }[];
  items: PurchaseOrderItemDto[];
  onAdd: (item: PurchaseOrderItemDto) => void;
  onRemove: (index: number) => void;
}

interface Option { value: string; label: string; }

export default function OrderItemsEditor({ lastNames, items, onAdd, onRemove }: Props) {
  const [selectedLastId, setSelectedLastId] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  // Cascading Options
  const [modelOptions, setModelOptions] = useState<Option[]>([]);
  const [sizeOptions, setSizeOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dependencies when LastName changes
  useEffect(() => {
    const fetchDependencies = async () => {
        if (!selectedLastId) {
            setModelOptions([]);
            setSizeOptions([]);
            return;
        }

        setIsLoading(true);
        try {
            const [models, sizes] = await Promise.all([
                LastNameService.getModelsByLastName(selectedLastId),
                LastSizeService.getAll(selectedLastId)
            ]);

            setModelOptions(models.map(m => ({ value: m.id!, label: m.modelName })));
            setSizeOptions(sizes.map(s => ({ value: s.id!, label: s.sizeLabel })));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Reset dependent fields when LastName changes
    setSelectedModelId("");
    setSelectedSizeId("");
    
    fetchDependencies();
  }, [selectedLastId]);

  const handleAdd = () => {
    if (!selectedLastId || !selectedModelId || !selectedSizeId || quantity <= 0) return;

    const lastNameObj = lastNames.find(l => l.value === selectedLastId);
    const modelObj = modelOptions.find(m => m.value === selectedModelId);
    const sizeObj = sizeOptions.find(s => s.value === selectedSizeId);

    onAdd({
      lastNameId: selectedLastId,
      lastModelId: selectedModelId,
      lastSizeId: selectedSizeId,
      quantityRequested: quantity,
      lastCode: lastNameObj?.code,
      modelName: modelObj?.label,
      sizeLabel: sizeObj?.label
    });

    setSelectedSizeId("");
    setQuantity(1);
  };

  return (
    <div className={styles.itemsEditor.container}>
      <div className={styles.itemsEditor.inputRow}>
        
        <div className="col-span-12 md:col-span-3">
          <label className={styles.inputGroup.label}>Last Name</label>
          <div className="mt-2">
            <CustomSelect
              value={selectedLastId}
              onChange={setSelectedLastId}
              options={lastNames}
              placeholder="Select Item"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-3">
          <label className={styles.inputGroup.label}>Model</label>
          <div className="mt-2">
            <CustomSelect
              value={selectedModelId}
              onChange={setSelectedModelId}
              options={modelOptions}
              placeholder={isLoading ? "..." : "Select Model"}
            />
          </div>
        </div>
        
        <div className="col-span-6 md:col-span-2">
          <label className={styles.inputGroup.label}>Size</label>
          <div className="mt-2">
            <CustomSelect
              value={selectedSizeId}
              onChange={setSelectedSizeId}
              options={sizeOptions}
              placeholder={isLoading ? "..." : "Size"}
            />
          </div>
        </div>
        
        <div className="col-span-6 md:col-span-2">
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
        
        <div className="col-span-12 md:col-span-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedLastId || !selectedModelId || !selectedSizeId || quantity <= 0}
            className={styles.itemsEditor.addBtn}
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <div className={styles.itemsTable.wrapper}>
        <table className={styles.itemsTable.table}>
          <thead className={styles.itemsTable.thead}>
            <tr>
              <th className={styles.itemsTable.th}>No.</th>
              <th className={styles.itemsTable.th}>Item Code</th>
              <th className={styles.itemsTable.th}>Model</th>
              <th className={styles.itemsTable.th}>Size</th>
              <th className={styles.itemsTable.thRight}>Quantity</th>
              <th className={styles.itemsTable.thRight}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.itemsTable.tbody}>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.itemsTable.empty}>
                  No items added. Use the form above to add items.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={`${item.lastNameId}-${item.lastModelId}-${item.lastSizeId}-${index}`} className={styles.itemsTable.tr}>
                  <td className={styles.itemsTable.td}>{index + 1}</td>
                  <td className={styles.itemsTable.tdHighlight}>{item.lastCode || "Unknown"}</td>
                  <td className={styles.itemsTable.td}>{item.modelName || "-"}</td>
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