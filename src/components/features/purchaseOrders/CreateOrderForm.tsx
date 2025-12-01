import { useCreateOrder } from "@/hooks/useCreateOrder";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa6";
import OrderItemsEditor from "./OrderItemsEditor";
import Link from "next/link";
import { Controller } from "react-hook-form";
import CustomSelect from "@/components/ui/CustomSelect";

export default function CreateOrderForm() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isAuthenticated,
    targetDepartments,
    departments,
    lastNames,
    items,
    control,
    addItem,
    removeItem
  } = useCreateOrder();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      
      {/* Header */}
      <div className={styles.header.wrapper}>
        <h2 className={styles.header.title}>Create Purchase Order</h2>
        <p className={styles.header.subtitle}>Fill in the details to request new inventory stock.</p>
      </div>

      <div className={styles.body}>
        
        {/* Section 1: General Info */}
        <div className={styles.section.wrapper}>
          <div className={styles.section.headerWrapper}>
            <FaClipboardList className={styles.section.icon} />
            <h3 className={styles.section.title}>General Information</h3>
          </div>
          
          <div className={styles.section.grid}>
            {/* Requested By */}
            <div className={styles.inputGroup.wrapper}>
              <label className={styles.inputGroup.label}>Requested By</label>
              <input
                {...register("requestedBy", { required: "Requester name is required" })}
                className={`${styles.inputGroup.input} ${isAuthenticated ? styles.inputGroup.readonly : ''}`}
                placeholder="Enter requester name"
                readOnly={isAuthenticated}
              />
              {errors.requestedBy && <p className={styles.inputGroup.error}>{errors.requestedBy.message}</p>}
            </div>

            {/* Department (Text/Select) */}
            <div className={styles.inputGroup.wrapper}>
              <label className={styles.inputGroup.label}>Requesting Department</label>
              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={departments}
                    placeholder="Select or Type Department"
                  />
                )}
              />
              {errors.department && <p className={styles.inputGroup.error}>{errors.department.message}</p>}
            </div>

            {/* Target Department*/}
            <div className={`${styles.inputGroup.wrapper} md:col-span-2`}>
              <label className={styles.inputGroup.label}>Target Department</label>
              <Controller
                name="departmentId"
                control={control}
                rules={{ required: "Target Department is required" }}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={targetDepartments}
                    placeholder="Select Department"
                  />
                )}
              />
              {errors.departmentId && <p className={styles.inputGroup.error}>{errors.departmentId.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Items */}
        <div className={styles.section.wrapper}>
          <div className={styles.section.headerWrapper}>
            <FaBoxOpen className={styles.section.icon} />
            <h3 className={styles.section.title}>Order Items</h3>
          </div>
          
          <OrderItemsEditor
              lastNames={lastNames}
              items={items}
              onAdd={addItem}
              onRemove={removeItem}
          />
        </div>

      </div>

      {/* Footer */}
      <div className={styles.footer.wrapper}>
        <Link href="/" className={styles.footer.cancelBtn}>
          Cancel
        </Link>
        <button
            type="submit"
            disabled={isSubmitting}
            className={styles.footer.submitBtn(isSubmitting)}
        >
            {isSubmitting ? "Processing" : "Submit Order"}
        </button>
      </div>
    </form>
  );
}