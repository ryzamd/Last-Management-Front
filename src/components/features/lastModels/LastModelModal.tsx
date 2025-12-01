import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { lastModelStyles as styles } from "@/styles/lastModel.styles";
import { LastModel } from "@/types/lastModel";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  mode: 'create' | 'edit' | null;
  item: LastModel | null;
  onClose: () => void;
  onSubmit: (data: Partial<LastModel>) => void;
}

export default function LastModelModal({ mode, item, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<LastModel>();

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  useEffect(() => {
    if (item && mode === 'edit') {
      setValue("modelName", item.modelName);
      setValue("description", item.description);
      setValue("status", item.status);
    } else {
      reset({ status: 'Active' });
    }
  }, [item, mode, setValue, reset]);

  if (!mode) return null;

  const title = mode === 'create' ? "New Model" : "Edit Model";

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
          <form id="model-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div>
                <label className={styles.modal.label}>Model Name</label>
                <input {...register("modelName", { required: true })} className={styles.modal.input} placeholder="e.g. ON 067" autoFocus />
            </div>

            <div>
                <label className={styles.modal.label}>Description</label>
                <textarea {...register("description")} className={`${styles.modal.input} resize-none h-24`} placeholder="Optional description..." />
            </div>

            <div>
                <label className={styles.modal.label}>Status</label>
                <Controller name="status" control={control}
                    render={({ field }) => (
                        <CustomSelect value={field.value} onChange={field.onChange} options={statusOptions} />
                    )}
                />
            </div>

          </form>
        </div>

        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.modal.cancelBtn}>Cancel</button>
          <button form="model-form" type="submit" className={styles.modal.confirmBtn}>
            {mode === 'create' ? "Create Model" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}