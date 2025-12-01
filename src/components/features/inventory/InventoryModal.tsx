import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { inventoryStyles } from "@/styles/inventory.styles";
import { InventoryItem } from "@/types/inventory";
import CustomSelect from "@/components/ui/CustomSelect";
import { LastSizeService } from "@/services/lastSize.service";
import { LastNameService } from "@/services/lastName.service";

interface Option {value: string; label: string;}

interface Props {
  mode: 'create' | 'edit' | null;
  item: InventoryItem | null;
  departmentOptions: Option[];
  lastNameOptions: Option[];
  onClose: () => void;
  onSubmit: (data: Partial<InventoryItem>) => void;
}

export default function InventoryModal({ mode, item, departmentOptions, lastNameOptions, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control, watch } = useForm<InventoryItem>();
  
  // Dynamic Options State
  const [modelOptions, setModelOptions] = useState<Option[]>([]);
  const [sizeOptions, setSizeOptions] = useState<Option[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingSizes, setIsLoadingSizes] = useState(false);

  // Watch lastNameId change to trigger cascading fetch
  const selectedLastNameId = watch("lastNameId");

  // Fetch Models & Sizes when LastName changes
  useEffect(() => {
    const fetchDependencies = async () => {
        if (!selectedLastNameId) {
            setModelOptions([]);
            setSizeOptions([]);
            return;
        }

        setIsLoadingModels(true);
        setIsLoadingSizes(true);

        try {
            // Fetch Models linked to this LastName
            const models = await LastNameService.getModelsByLastName(selectedLastNameId);
            setModelOptions(models.map(m => ({ value: m.id!, label: m.modelName })));

            // Fetch Sizes belonging to this LastName
            const sizes = await LastSizeService.getAll(selectedLastNameId);
            setSizeOptions(sizes.map(s => ({ value: s.id!, label: s.sizeLabel })));

        } catch (error) {
            console.error("Failed to load dependency data", error);
        } finally {
            setIsLoadingModels(false);
            setIsLoadingSizes(false);
        }
    };

    fetchDependencies();
  }, [selectedLastNameId]);


  useEffect(() => {
    if (item && mode === 'edit') {
      setValue("departmentId", item.departmentId);
      setValue("lastNameId", item.lastNameId);
      setValue("lastModelId", item.lastModelId);
      setValue("lastSizeId", item.lastSizeId);
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
                
                {/* Department Selection */}
                <div className="mb-4">
                    <label className={inventoryStyles.modal.label}>Department</label>
                    <Controller name="departmentId" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={departmentOptions}
                              placeholder="Select Department"
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Last Name Selection */}
                    <div>
                        <label className={inventoryStyles.modal.label}>Last Name</label>
                        <Controller name="lastNameId" control={control} rules={{ required: true }}
                            render={({ field }) => (
                                <CustomSelect
                                  value={field.value}
                                  onChange={(val) => {
                                      field.onChange(val);
                                      setValue("lastModelId", "");
                                      setValue("lastSizeId", "");
                                  }}
                                  options={lastNameOptions}
                                  placeholder="Select Last Name"
                                />
                            )}
                        />
                    </div>

                    {/* Model Selection (New) */}
                    <div>
                        <label className={inventoryStyles.modal.label}>Model</label>
                        <Controller name="lastModelId" control={control} rules={{ required: true }}
                            render={({ field }) => (
                                <CustomSelect
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={modelOptions}
                                  placeholder={isLoadingModels ? "Loading..." : "Select Model"}
                                />
                            )}
                        />
                        {modelOptions.length === 0 && selectedLastNameId && !isLoadingModels && (
                            <p className="text-red-400 text-xs mt-1">No models linked to this Last Name.</p>
                        )}
                    </div>
                </div>

                {/* Size Selection */}
                <div className="mt-4">
                    <label className={inventoryStyles.modal.label}>Size</label>
                    <Controller name="lastSizeId" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={sizeOptions}
                              placeholder={isLoadingSizes ? "Loading" : "Select Size"}
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