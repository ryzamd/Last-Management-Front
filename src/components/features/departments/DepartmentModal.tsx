import { Controller, useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { departmentStyles as styles } from "@/styles/department.styles";
import { Department } from "@/services/department.service";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Department>) => void;
}

export default function DepartmentModal({ isOpen, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, control } = useForm<Department>({
    defaultValues: { isActive: true }
  });
  
  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  if (!isOpen) return null;

  const onFormSubmit = (data: any) => {
    const processedData = {...data, isActive: String(data.isActive) === "true"};
    onSubmit(processedData);
    reset();
  };

  return (
    <div className={styles.modal.overlay}>
      <div className={styles.modal.container}>
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>New Department</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={styles.modal.content}>
          <form id="dept-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            
            <div>
                <label className={styles.modal.label}>Department Name</label>
                <input {...register("departmentName", { required: true })} className={styles.modal.input} placeholder="e.g. Sales, Marketing" />
            </div>

            <div>
                <label className={styles.modal.label}>Status</label>
                <Controller name="isActive" control={control}
                    render={({ field }) => (
                        <CustomSelect
                            value={String(field.value)}
                            onChange={(val) => field.onChange(val === "true")}
                            options={statusOptions}
                        />
                    )}
                />
            </div>

          </form>
        </div>

        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.modal.cancelBtn}>Cancel</button>
          <button form="dept-form" type="submit" className={styles.modal.confirmBtn}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}