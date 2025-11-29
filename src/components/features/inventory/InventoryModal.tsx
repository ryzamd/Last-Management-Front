import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { inventoryStyles } from "@/styles/inventory.styles";
import { InventoryItem } from "@/types/inventory";
import CustomSelect from "@/components/ui/CustomSelect";

interface Option {value: string; label: string;}

interface Props {
  mode: 'create' | 'edit' | null;
  item: InventoryItem | null;
  locationOptions: Option[];
  lastNameOptions: Option[];
  sizeOptions: Option[];
  onClose: () => void;
  onSubmit: (data: Partial<InventoryItem>) => void;
}

export default function InventoryModal({ mode, item, locationOptions, lastNameOptions, sizeOptions, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<InventoryItem>();

  useEffect(() => {
    if (item && mode === 'edit') {
      setValue("lastNameId", item.lastNameId);
      setValue("lastSizeId", item.lastSizeId);
      setValue("locationId", item.locationId);
      setValue("quantityGood", item.quantityGood);
      setValue("quantityDamaged", item.quantityDamaged);
      setValue("quantityReserved", item.quantityReserved);
    } else {
      reset({
        quantityGood: 0,
        quantityDamaged: 0,
        quantityReserved: 0
      });
    }
  }, [item, mode, setValue, reset]);

  if (!mode) return null;

  const title = mode === 'create' ? "Add Inventory Stock" : "Adjust Stock Levels";

  return (
    <div className={inventoryStyles.modal.overlay}>
      <div className={inventoryStyles.modal.container}>
        <div className={inventoryStyles.modal.header}>
          <h2 className={inventoryStyles.modal.title}>{title}</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={inventoryStyles.modal.content}>
          <form id="inventory-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className={inventoryStyles.modal.groupContainer}>
                <h3 className={inventoryStyles.modal.groupTitle('emerald')}>Item Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={inventoryStyles.modal.label}>Last Name (Item)</label>
                        <Controller name="lastNameId" control={control} rules={{ required: true }}
                            render={({ field }) => (
                                <CustomSelect
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={lastNameOptions}
                                  placeholder="Select Item"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className={inventoryStyles.modal.label}>Size</label>
                        <Controller name="lastSizeId" control={control} rules={{ required: true }}
                            render={({ field }) => (
                                <CustomSelect
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={sizeOptions}
                                  placeholder="Select Size"
                                />
                            )}
                        />
                    </div>
                </div>

                <div>
                    <label className={inventoryStyles.modal.label}>Location</label>
                    <Controller name="locationId" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={locationOptions}
                              placeholder="Select Warehouse Location"
                            />
                        )}
                    />
                </div>
            </div>

            <div className={inventoryStyles.modal.groupContainer}>
                <h3 className={inventoryStyles.modal.groupTitle('blue')}>Stock Quantities</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className={inventoryStyles.modal.label}>Good</label>
                        <input readOnly type="number" {...register("quantityGood", { min: 0 })} className={inventoryStyles.modal.input} />
                    </div>
                    <div>
                        <label className={inventoryStyles.modal.label}>Damaged</label>
                        <input readOnly type="number" {...register("quantityDamaged", { min: 0 })} className={inventoryStyles.modal.input} />
                    </div>
                    <div>
                        <label className={inventoryStyles.modal.label}>Reserved</label>
                        <input readOnly type="number" {...register("quantityReserved", { min: 0 })} className={inventoryStyles.modal.input} />
                    </div>
                </div>
            </div>

          </form>
        </div>

        <div className={inventoryStyles.modal.footer}>
          <button onClick={onClose} className={inventoryStyles.modal.cancelBtn}>Cancel</button>
          <button form="inventory-form" type="submit" className={inventoryStyles.modal.confirmBtn}>
            {mode === 'create' ? "Save Stock" : "Update Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}