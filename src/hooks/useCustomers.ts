import { useState, useEffect, useMemo, useCallback } from 'react';
import { CustomerService } from '@/services/customer.service';
import { Customer, CustomerLastName } from '@/types/customer';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';

export const useCustomers = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'details' | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [relatedLastNames, setRelatedLastNames] = useState<CustomerLastName[]>([]);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPage: number, currentSize: number) => {
      setIsLoading(true);
        
      try {
          const result = await CustomerService.getAll(currentPage, currentSize);
          setData(result.items);
          setTotal(result.total);

        } catch (error) {
          console.error("Failed to fetch customers", error);
          toast.error("Failed to load customer data");

        } finally {
            setIsLoading(false);
        }
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(c =>
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [fetchData, page, pageSize]);

  const handleOpenDetails = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalMode('details');
    
    setIsFetchingDetails(true);
    try {
      const result = await CustomerService.getLastNamesByCustomer(customer.id);
      setRelatedLastNames(result.items);

    } catch (error) {
      console.error("Failed to fetch related last names", error);
      toast.error("Could not load customer details");

    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleOpenCreate = () => {
    if (!isAdmin) return;

    setSelectedCustomer({ customerName: '', status: 'Active' } as Customer);
    setModalMode('create');
  };

  const handleOpenEdit = (customer: Customer, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAdmin) return;

    setSelectedCustomer(customer);
    setModalMode('edit');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await CustomerService.delete(id);
      toast.success("Customer deleted successfully");
      fetchData(page, pageSize);

    } catch (error: any) {
      if (error.message.includes("Cannot delete")) {
       setAlertMessage(error.message || "An error occurred while deleting.");
        
      }else{
       toast.error(error.message || "An error occurred while deleting.");
      }
    }
  };

  const handleSubmit = async (formData: Partial<Customer>) => {
    try {
      if (modalMode === 'create') {
        await CustomerService.create(formData);
        toast.success("New customer created!");

      } else if (modalMode === 'edit' && selectedCustomer?.id) {
        await CustomerService.update(selectedCustomer.id, formData);
        toast.success("Customer updated successfully");
      }

      setModalMode(null);
      fetchData(page, pageSize);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    customers: filteredData,
    total,
    isLoading,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    isAdmin,
    
    modalMode, setModalMode,
    selectedCustomer,
    relatedLastNames,
    isFetchingDetails,
    
    alertMessage, setAlertMessage,
    
    handleOpenDetails,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit
  };
};