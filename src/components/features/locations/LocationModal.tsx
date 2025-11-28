import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { locationStyles } from "@/styles/location.styles";
import { Location } from "@/types/location";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  mode: 'create' | 'edit' | null;
  item: Location | null;
  onClose: () => void;
  onSubmit: (data: Partial<Location>) => void;
}

export default function LocationModal({ mode, item, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<Location>();

  const typeOptions = [
    { value: "Production", label: "Production" },
    { value: "Development", label: "Development" },
    { value: "Quality", label: "Quality" },
    { value: "Storage", label: "Storage" },
  ];

  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  useEffect(() => {
    if (item && mode === 'edit') {
      setValue("locationCode", item.locationCode);
      setValue("locationName", item.locationName);
      setValue("locationType", item.locationType);
      setValue("isActive", item.isActive);
    } else {
      reset({ isActive: true, locationType: 'Storage' });
    }
  }, [item, mode, setValue, reset]);

  if (!mode) return null;

  const title = mode === 'create' ? "New Location" : "Edit Location";

  // Wrapper for submit to handle boolean conversion if needed from Select
  const onFormSubmit = (data: any) => {
    // CustomSelect returns string, convert back to boolean for isActive if necessary
    // In this case, Controller handles value, but if CustomSelect returns string "true"/"false", we parse it.
    // However, CustomSelect accepts string value. We should ensure the value passed to onChange is handled correctly.
    // Here we assume CustomSelect for boolean uses string "true"/"false".
    const processedData = {
        ...data,
        isActive: data.isActive === "true" || data.isActive === true
    };
    onSubmit(processedData);
  };

  return (
    <div className={locationStyles.modal.overlay}>
      <div className={locationStyles.modal.container}>
        <div className={locationStyles.modal.header}>
          <h2 className={locationStyles.modal.title}>{title}</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={locationStyles.modal.content}>
          <form id="location-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
                <label className={locationStyles.modal.label}>Location Code</label>
                <input {...register("locationCode", { required: true })} className={locationStyles.modal.input} placeholder="e.g. WH-01" />
            </div>
            
            <div>
                <label className={locationStyles.modal.label}>Location Name</label>
                <input {...register("locationName", { required: true })} className={locationStyles.modal.input} placeholder="e.g. Main Warehouse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={locationStyles.modal.label}>Type</label>
                    <Controller name="locationType" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect value={field.value} onChange={field.onChange} options={typeOptions} />
                        )}
                    />
                </div>
                <div>
                    <label className={locationStyles.modal.label}>Status</label>
                    <Controller name="isActive" control={control}
                        render={({ field }) => (
                            <CustomSelect 
                                value={String(field.value)}
                                onChange={(val) => field.onChange(val === 'true')}
                                options={statusOptions}
                            />
                        )}
                    />
                </div>
            </div>
          </form>
        </div>

        <div className={locationStyles.modal.footer}>
          <button onClick={onClose} className={locationStyles.modal.cancelBtn}>Cancel</button>
          <button form="location-form" type="submit" className={locationStyles.modal.confirmBtn}>
            {mode === 'create' ? "Create Location" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}