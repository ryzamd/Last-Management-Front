import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { FaXmark, FaPlus, FaMinus } from "react-icons/fa6";
import { inventoryStyles } from "@/styles/inventory.styles";
import { InventoryItem } from "@/types/inventory";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  isOpen: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onSubmit: (id: string, quantityChange: number, type: string, reason: string) => void;
  isSubmitting?: boolean;
}

interface AdjustForm {
  mode: 'add' | 'remove';
  quantity: number;
  movementType: string;
  reason: string;
}

export default function AdjustStockModal({ isOpen, item, onClose, onSubmit, isSubmitting }: Props) {
  const { register, handleSubmit, reset, control, watch, setValue } = useForm<AdjustForm>({
    defaultValues: {
      mode: 'add',
      quantity: 1,
      movementType: 'Adjustment',
      reason: ''
    }
  });

  const mode = watch('mode');

  useEffect(() => {
    if (isOpen) {
      reset({
        mode: 'add',
        quantity: 1,
        movementType: 'Adjustment',
        reason: ''
      });
    }
  }, [isOpen, reset]);

  if (!isOpen || !item) return null;

  const typeOptions = [
    { value: "Adjustment", label: "General Adjustment" },
    { value: "Damage", label: "Damage" },
    { value: "Reserve", label: "Reserve" },
    { value: "Return", label: "Return" },
    { value: "Found", label: "Found Inventory" },
  ];

  const onFormSubmit = (data: AdjustForm) => {
    const change = data.mode === 'add' ? data.quantity : -data.quantity;
    onSubmit(item.id!, change, data.movementType, data.reason);
  };

  return (
    <div className={inventoryStyles.modal.overlay}>
      <div className={inventoryStyles.modal.container}>
        <div className={inventoryStyles.modal.header}>
          <h2 className={inventoryStyles.modal.title}>
            Adjust Stock Level
          </h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={inventoryStyles.modal.content}>
          
          {/* Info Banner */}
          <div className="bg-space-800/50 p-4 rounded-lg border border-space-800 mb-6 flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <span className="text-xs text-space-500 font-bold uppercase">Item</span>
                <span className="text-white font-bold font-grotesk">{item.lastCode}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-xs text-space-500 font-bold uppercase">Size</span>
                <span className="text-white font-mono">{item.sizeLabel}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-space-800 mt-2">
                <span className="text-xs text-space-500 font-bold uppercase">Current Good Stock</span>
                <span className="text-emerald-400 font-mono font-bold text-lg">{item.quantityGood}</span>
            </div>
          </div>

          <form id="adjust-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            
            {/* Mode Selection */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setValue('mode', 'add')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-bold transition-all ${
                        mode === 'add'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-space-900 border-space-700 text-space-500 hover:border-space-500'
                    }`}
                >
                    <FaPlus /> Add Stock
                </button>
                <button
                    type="button"
                    onClick={() => setValue('mode', 'remove')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-bold transition-all ${
                        mode === 'remove'
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-space-900 border-space-700 text-space-500 hover:border-space-500'
                    }`}
                >
                    <FaMinus /> Remove Stock
                </button>
            </div>

            {/* Quantity & Type */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={inventoryStyles.modal.label}>Quantity</label>
                    <input
                        type="number"
                        {...register("quantity", { required: true, min: 1 })}
                        className={inventoryStyles.modal.input}
                        autoFocus
                    />
                </div>
                <div>
                    <label className={inventoryStyles.modal.label}>Adjustment Type</label>
                    <Controller name="movementType" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect value={field.value} onChange={field.onChange} options={typeOptions} />
                        )}
                    />
                </div>
            </div>

            {/* Reason */}
            <div>
                <label className={inventoryStyles.modal.label}>Reason / Note</label>
                <textarea
                    {...register("reason", { required: "Reason is required for audit trail" })}
                    className={`${inventoryStyles.modal.input} h-24 resize-none`}
                    placeholder="e.g. Found during monthly audit..."
                />
            </div>

          </form>
        </div>

        <div className={inventoryStyles.modal.footer}>
          <button onClick={onClose} className={inventoryStyles.modal.cancelBtn} disabled={isSubmitting}>Cancel</button>
          <button
            form="adjust-form"
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-bold text-white transition-all shadow-lg ${
                mode === 'add' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20'
            }`}
          >
            {isSubmitting ? "Processing..." : (mode === 'add' ? "Add Stock" : "Remove Stock")}
          </button>
        </div>
      </div>
    </div>
  );
}