import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { customerStyles } from "@/styles/customer.styles";
import { Customer, CustomerLastName } from "@/types/customer";
import StatusBadge from "@/components/common/StatusBadge";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  mode: 'create' | 'edit' | 'details' | null;
  customer: Customer | null;
  lastNames: CustomerLastName[]; // For details mode
  isLoadingDetails: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Customer>) => void;
}

export default function CustomerModal({ mode, customer, lastNames, isLoadingDetails, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, setValue, control } = useForm<Customer>();

  useEffect(() => {
    if (customer) {
      setValue("customerName", customer.customerName);
      setValue("status", customer.status);
    } else {
      reset();
    }
  }, [customer, setValue, reset]);

  if (!mode) return null;

  const isDetails = mode === 'details';
  const title = isDetails ? "Customer Details" : mode === 'create' ? "New Customer" : "Edit Customer";
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" },
  ];

  return (
    <div className={customerStyles.modal.overlay}>
      <div className={customerStyles.modal.container}>
        {/* Header */}
        <div className={customerStyles.modal.header}>
          <h2 className={customerStyles.modal.title}>{title}</h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={customerStyles.modal.content}>
          {isDetails ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={customerStyles.modal.label}>Customer Name</label>
                  <p className="text-lg text-white font-grotesk">{customer?.customerName}</p>
                </div>
                <div>
                  <label className={customerStyles.modal.label}>Status</label>
                  <div><StatusBadge status={customer?.status || 'Active'} /></div>
                </div>
              </div>

              <div>
                <label className={customerStyles.modal.label}>Associated Last Names ({lastNames.length})</label>
                <div className="bg-space-950 rounded-lg border border-space-800 overflow-hidden mt-2">
                  {isLoadingDetails ? (
                    <div className="p-4 text-center text-space-500 text-xs font-mono">Loading data...</div>
                  ) : lastNames.length === 0 ? (
                    <div className="p-4 text-center text-space-500 text-xs font-mono">No records found</div>
                  ) : (
                    <table className="w-full text-left text-xs font-mono text-space-300">
                      <thead className="bg-space-800/50 text-space-500">
                        <tr>
                          <th className="p-3">Code</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Article</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-space-800/30">
                        {lastNames.map((item) => (
                          <tr key={item.id}>
                            <td className="p-3 text-white font-bold">{item.lastCode}</td>
                            <td className="p-3">{item.lastType}</td>
                            <td className="p-3">{item.article}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form id="customer-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className={customerStyles.modal.label}>Customer Name</label>
                <input {...register("customerName", { required: true })} className={customerStyles.modal.input} placeholder="Enter name" />
              </div>
              
              <div>
                <label className={customerStyles.modal.label}>Status</label>
                <Controller name="status" control={control} defaultValue="Active"
                  render={({ field }) => (
                    <CustomSelect value={field.value} onChange={field.onChange} options={statusOptions}/>
                  )}
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className={customerStyles.modal.footer}>
          <button onClick={onClose} className={customerStyles.modal.cancelBtn}>
            {isDetails ? "Close" : "Cancel"}
          </button>
          {!isDetails && (
            <button form="customer-form" type="submit" className={customerStyles.modal.confirmBtn}>
              {mode === 'create' ? "Create Customer" : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}