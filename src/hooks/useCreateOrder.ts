import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/useToast';
import { PurchaseOrderService } from '@/services/purchaseOrder.service';
import { LocationService } from '@/services/location.service';
import { DepartmentService } from '@/services/department.service';
import { LastNameService } from '@/services/lastName.service';
import { CreatePurchaseOrderRequest, PurchaseOrderItemDto } from '@/types/purchaseOrder';
import { LastSizeService } from '@/services/lastSize.service';

export const useCreateOrder = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const toast = useToast();
  
  const { register, handleSubmit, setValue, control, formState: { errors }, } = useForm<CreatePurchaseOrderRequest>();
  
  const [items, setItems] = useState<PurchaseOrderItemDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dữ liệu cho Dropdown
  const [locations, setLocations] = useState<{value: string, label: string}[]>([]);
  const [departments, setDepartments] = useState<{value: string, label: string}[]>([]);
  const [lastNames, setLastNames] = useState<{value: string, label: string, code: string}[]>([]);
  const [sizes, setSizes] = useState<{value: string, label: string}[]>([]);

  // Fetch dữ liệu ban đầu
  useEffect(() => {
    const loadData = async () => {
      try {
        const [locRes, deptRes, nameRes, sizeRes] = await Promise.all([
          LocationService.getAll(1, 100, undefined, true),
          DepartmentService.getAll(),
          LastNameService.getAll(1, 100, undefined, 'Active'),
          LastSizeService.getAll()
        ]);

        setLocations(locRes.items.map(l => ({ value: l.id, label: l.locationName })));
        
        // DepartmentService trả về List hay PagedResult?
        // Giả sử API Department trả về List trực tiếp, nếu là PagedResult thì dùng deptRes.items
        const deptList = Array.isArray(deptRes) ? deptRes : (deptRes as any).items || [];
        setDepartments(deptList.map((d: any) => ({ value: d.departmentName, label: d.departmentName })));

        setLastNames(nameRes.items.map(l => ({ value: l.id, label: `${l.lastCode} - ${l.article}`, code: l.lastCode })));
        
        const sizeList = Array.isArray(sizeRes) ? sizeRes : (sizeRes as any).items || [];
        setSizes(sizeList.map((s: any) => ({ value: s.id!, label: s.sizeLabel })));

      } catch (error) {
        console.error("Failed to load dependency data", error);
        toast.error("Could not load form data. Please check connection.");
      }
    };
    loadData();
  }, []);

  // Tự động điền RequestedBy nếu là Admin
  useEffect(() => {
    if (isAuthenticated && user?.username) {
      setValue('requestedBy', user.username);
    }
  }, [isAuthenticated, user, setValue]);

  // Thêm item vào giỏ tạm
  const addItem = (item: PurchaseOrderItemDto) => {
    const exists = items.some(i => i.lastNameId === item.lastNameId && i.lastSizeId === item.lastSizeId);
    if (exists) {
      toast.warning("This item and size combination is already in the list.");
      return;
    }
    setItems([...items, item]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Submit đơn hàng
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
      toast.error(error.response?.data?.message || "Failed to create order");
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
    locations,
    departments,
    lastNames,
    sizes,
    
    items,
    addItem,
    removeItem
  };
};