import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { lastNameStyles } from "@/styles/lastName.styles";
import { LastName } from "@/types/lastName";
import CustomSelect from "@/components/ui/CustomSelect";
import { CustomerService } from "@/services/customer.service";

interface Props {
  mode: 'create' | 'edit' | null;
  item: LastName | null;
  onClose: () => void;
  onSubmit: (data: Partial<LastName>) => void;
}

interface Option {
  value: string;
  label: string;
}

export default function LastNameModal({ mode, item, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<LastName>();
  const [customerOptions, setCustomerOptions] = useState<Option[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!mode) return;
      
      setIsLoadingCustomers(true);
      try {
        const result = await CustomerService.getAll(1, 100);
        const options = result.items.map(c => ({
          value: c.id,
          label: c.customerName
        }));
        setCustomerOptions(options);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, [mode]);

  useEffect(() => {
    if (item && mode === 'edit') {
      setValue("lastCode", item.lastCode);
      setValue("lastType", item.lastType);
      setValue("article", item.article);
      setValue("lastStatus", item.lastStatus);
      setValue("customerId", item.customerId);
    } else {
      reset({ lastStatus: 'Active' });
    }
  }, [item, mode, setValue, reset]);

  if (!mode) return null;

  const title = mode === 'create' ? "New Last Name" : "Edit Last Name";

  return (
    <div className={lastNameStyles.modal.overlay}>
      <div className={lastNameStyles.modal.container}>
        <div className={lastNameStyles.modal.header}>
          <h2 className={lastNameStyles.modal.title}>{title}</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={lastNameStyles.modal.content}>
          <form id="lastname-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className={lastNameStyles.modal.groupContainer}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={lastNameStyles.modal.label}>Last Code</label>
                        <input {...register("lastCode", { required: true })} className={lastNameStyles.modal.input} placeholder="Enter Last Code" />
                    </div>
                    <div>
                        <label className={lastNameStyles.modal.label}>Type</label>
                        <input {...register("lastType", { required: true })} className={lastNameStyles.modal.input} placeholder="Enter Type" />
                    </div>
                </div>

                <div>
                    <label className={lastNameStyles.modal.label}>Article</label>
                    <input {...register("article", { required: true })} className={lastNameStyles.modal.input} placeholder="Enter Article" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={lastNameStyles.modal.label}>Customer</label>
                    <Controller name="customerId" control={control} rules={{ required: true }}
                        render={({ field }) => (
                            <CustomSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={customerOptions}
                              placeholder={isLoadingCustomers ? "Loading customers" : "Select Customer"}
                            />
                        )}
                    />
                </div>
                <div>
                    <label className={lastNameStyles.modal.label}>Status</label>
                    <Controller name="lastStatus" control={control}
                        render={({ field }) => (
                            <CustomSelect value={field.value} onChange={field.onChange} options={statusOptions} />
                        )}
                    />
                </div>
            </div>

          </form>
        </div>

        <div className={lastNameStyles.modal.footer}>
          <button onClick={onClose} className={lastNameStyles.modal.cancelBtn}>Cancel</button>
          <button form="lastname-form" type="submit" className={lastNameStyles.modal.confirmBtn}>
            {mode === 'create' ? "Create Last" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}