import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { departmentStyles as styles } from "@/styles/department.styles";
import { Department } from "@/types/department";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  mode: 'create' | 'edit' | null;
  item: Department | null;
  onClose: () => void;
  onSubmit: (data: Partial<Department>) => void;
}

export default function DepartmentModal({ mode, item, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<Department>();

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
      setValue("departmentCode", item.departmentCode);
      setValue("departmentName", item.departmentName);
      setValue("departmentType", item.departmentType);
      setValue("isActive", item.isActive);
    } else {
      reset({ isActive: true, departmentType: 'Storage' });
    }
  }, [item, mode, setValue, reset]);

  if (!mode) return null;

  const title = mode === 'create' ? "New Department" : "Edit Department";

  const onFormSubmit = (data: any) => {
    const processedData = {
        ...data,
        isActive: data.isActive === "true" || data.isActive === true
    };
    onSubmit(processedData);
  };

  return (
    <div className={styles.modal.overlay}>
      <div className={styles.modal.container}>
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>{title}</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={styles.modal.content}>
          <form id="dept-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
                <label className={styles.modal.label}>Department Code</label>
                <input {...register("departmentCode", { required: true })} className={styles.modal.input} placeholder="e.g. PROD-01" />
            </div>
            
            <div>
                <label className={styles.modal.label}>Department Name</label>
                <input {...register("departmentName", { required: true })} className={styles.modal.input} placeholder="e.g. Production Line 1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={styles.modal.label}>Type</label>
                    <Controller name="departmentType" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect value={field.value} onChange={field.onChange} options={typeOptions} />
                        )}
                    />
                </div>
                <div>
                    <label className={styles.modal.label}>Status</label>
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

        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.modal.cancelBtn}>Cancel</button>
          <button form="dept-form" type="submit" className={styles.modal.confirmBtn}>
            {mode === 'create' ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}