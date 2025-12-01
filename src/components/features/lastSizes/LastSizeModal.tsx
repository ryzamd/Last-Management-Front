import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { lastSizeStyles } from "@/styles/lastSize.styles";
import CustomSelect from "@/components/ui/CustomSelect";
import { LastNameService } from "@/services/lastName.service";
import { LastSize } from "@/types/lastSize";

interface Option {value: string; label: string;}

interface Props {
  mode: 'create' | 'edit' | null;
  item: LastSize | null;
  sizeOptions: Option[];
  onClose: () => void;
  onSubmit: (data: Partial<LastSize>) => void;
}

export default function LastSizeModal({ mode, item, sizeOptions, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<LastSize>();
  const [lastNameOptions, setLastNameOptions] = useState<Option[]>([]);
  const [isLoadingNames, setIsLoadingNames] = useState(false);

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const filteredSizeOptions = item ? sizeOptions.filter(opt => opt.value !== item.id) : sizeOptions;

  // Load LastName options
  useEffect(() => {
    const fetchLastNames = async () => {
        setIsLoadingNames(true);
        try {
            const result = await LastNameService.getAll(1, 100, undefined, 'Active');
            setLastNameOptions(result.items.map(l => ({ value: l.id, label: `${l.lastCode} (${l.article})` })));
        } catch (error) {
            console.error("Failed to load last names", error);
        } finally {
            setIsLoadingNames(false);
        }
    };
    
    if (mode) fetchLastNames();
  }, [mode]);

  useEffect(() => {
    if (item && mode === 'edit') {
      setValue("sizeLabel", item.sizeLabel);
      setValue("sizeValue", item.sizeValue);
      setValue("status", item.status);
      setValue("replacementSizeId", item.replacementSizeId);
      setValue("lastNameId", item.lastNameId);
    } else {
      reset({ status: 'Active' });
    }
  }, [item, mode, setValue, reset]);

  if (!mode) return null;

  const title = mode === 'create' ? "New Size" : "Edit Size";

  return (
    <div className={lastSizeStyles.modal.overlay}>
      <div className={lastSizeStyles.modal.container}>
        <div className={lastSizeStyles.modal.header}>
          <h2 className={lastSizeStyles.modal.title}>{title}</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={lastSizeStyles.modal.content}>
          <form id="size-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div>
                <label className={lastSizeStyles.modal.label}>Last Name (Item)</label>
                <Controller name="lastNameId" control={control} rules={{ required: true }}
                    render={({ field }) => (
                        <CustomSelect
                          value={field.value}
                          onChange={field.onChange}
                          options={lastNameOptions}
                          placeholder={isLoadingNames ? "Loading..." : "Select Last Name"}
                        />
                    )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={lastSizeStyles.modal.label}>Size Label</label>
                    <input {...register("sizeLabel", { required: true })} className={lastSizeStyles.modal.input} placeholder="e.g. US 9" />
                </div>
                <div>
                    <label className={lastSizeStyles.modal.label}>Numeric Value</label>
                    <input type="number" step="0.1" {...register("sizeValue", { required: true, valueAsNumber: true })} className={lastSizeStyles.modal.input} placeholder="e.g. 9.0" />
                </div>
            </div>

            <div>
                <label className={lastSizeStyles.modal.label}>Replacement Size (Optional)</label>
                <Controller name="replacementSizeId" control={control}
                    render={({ field }) => (
                        <CustomSelect
                          value={field.value || ""}
                          onChange={field.onChange}
                          options={filteredSizeOptions}
                          placeholder="Select Replacement Size"
                        />
                    )}
                />
                <p className="text-xs text-space-500 mt-1 italic">Used for suggesting alternatives if out of stock.</p>
            </div>

            <div>
                <label className={lastSizeStyles.modal.label}>Status</label>
                <Controller name="status" control={control}
                    render={({ field }) => (
                        <CustomSelect value={field.value} onChange={field.onChange} options={statusOptions} />
                    )}
                />
            </div>

          </form>
        </div>

        <div className={lastSizeStyles.modal.footer}>
          <button onClick={onClose} className={lastSizeStyles.modal.cancelBtn}>Cancel</button>
          <button form="size-form" type="submit" className={lastSizeStyles.modal.confirmBtn}>
            {mode === 'create' ? "Create Size" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}