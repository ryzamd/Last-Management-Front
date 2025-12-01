import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/useToast';
import { PurchaseOrderService } from '@/services/purchaseOrder.service';
import { LastNameService } from '@/services/lastName.service';
import { CreatePurchaseOrderRequest, PurchaseOrderItemDto } from '@/types/purchaseOrder';
import { DepartmentService } from '@/services/department.service';

export const useCreateOrder = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const toast = useToast();
  
  const { register, handleSubmit, setValue, control, formState: { errors }, } = useForm<CreatePurchaseOrderRequest>();
  
  const [items, setItems] = useState<PurchaseOrderItemDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [departments, setDepartments] = useState<{value: string, label: string}[]>([]);
  const [targetDepartments, setTargetDepartments] = useState<{value: string, label: string}[]>([]);
  const [lastNames, setLastNames] = useState<{value: string, label: string, code: string}[]>([]);

  // Fetch dữ liệu ban đầu
  useEffect(() => {
    const loadData = async () => {
      try {
        const [deptRes, nameRes] = await Promise.all([
          DepartmentService.getAll(1, 100),
          LastNameService.getAll(1, 100, undefined, 'Active'),
        ]);

        const deptList = deptRes.items;
        setDepartments(deptList.map(d => ({ value: d.departmentName, label: d.departmentName })));
        
        setTargetDepartments(deptList.map(d => ({ value: d.id, label: d.departmentName })));

        setLastNames(nameRes.items.map(l => ({ value: l.id, label: `${l.lastCode} - ${l.article}`, code: l.lastCode })));
        
      } catch (error) {
        console.error("Failed to load dependency data", error);
        toast.error("Could not load form data. Please check connection.");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.username) {
      setValue('requestedBy', user.username);
    }
  }, [isAuthenticated, user, setValue]);

  const addItem = (item: PurchaseOrderItemDto) => {
    // Check duplicate: LastName + Model + Size
    const exists = items.some(i =>
        i.lastNameId === item.lastNameId &&
        i.lastModelId === item.lastModelId &&
        i.lastSizeId === item.lastSizeId
    );
    
    if (exists) {
      toast.warning("This item configuration is already in the list.");
      return;
    }
    setItems([...items, item]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const onSubmit = async (data: CreatePurchaseOrderRequest) => {
    if (items.length === 0) {
      toast.error("Please add at least one item to the order.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CreatePurchaseOrderRequest = {
        ...data,
        items: items
      };

      await PurchaseOrderService.create(payload);
      toast.success("Purchase Order created successfully!");
      router.push('/purchase-orders');
    } catch (error: any) {
        if (error.response?.status === 409 && error.response.data?.message?.includes('not associated')) {
            toast.error("Error: One of the selected items has unlinked Last Name and Model.");
        } else {
            toast.error(error.response?.data?.message || "Failed to create order");
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isAuthenticated,
    control,
    departments,
    targetDepartments,
    lastNames,
    items,
    addItem,
    removeItem
  };
};