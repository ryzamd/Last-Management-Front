import { useState, useEffect, useMemo, useCallback } from 'react';
import { LastNameService } from '@/services/lastName.service';
import { LastName } from '@/types/lastName';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';

export const useLastNames = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<LastName[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<LastName | null>(null);

  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPage: number, currentSize: number) => {
      setIsLoading(true);
      try {
          // Note: Backend currently supports filter by customerId/status but NOT text search
          // We fetch data and filter client-side for search term
          const result = await LastNameService.getAll(currentPage, currentSize);
          setData(result.items);
          setTotal(result.total);
        } catch (error) {
          console.error("Failed to fetch last names", error);
          toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
  }, []);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [fetchData, page, pageSize]);

  // Client-side filtering logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item =>
        item.lastCode.toLowerCase().includes(lowerTerm) ||
        item.article.toLowerCase().includes(lowerTerm) ||
        item.lastType.toLowerCase().includes(lowerTerm) ||
        (item.customerName?.toLowerCase().includes(lowerTerm) || false)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setSelectedItem(null);
    setModalMode('create');
  };

  const handleOpenEdit = (item: LastName, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this Last Name?")) return;

    try {
      await LastNameService.delete(id);
      toast.success("Deleted successfully");
      fetchData(page, pageSize);
    } catch (error: any) {
        // Handle 409 Conflict (Constrained delete)
        if (error.message.includes("Cannot delete") || error.response?.status === 409) {
            setAlertMessage(error.message || "Cannot delete Last Name due to existing dependencies.");
        } else {
            toast.error("Failed to delete.");
        }
    }
  };

  const handleSubmit = async (formData: Partial<LastName>) => {
    try {
      if (modalMode === 'create') {
        await LastNameService.create(formData);
        toast.success("New Last Name created!");
      } else if (modalMode === 'edit' && selectedItem?.id) {
        await LastNameService.update(selectedItem.id, formData);
        toast.success("Updated successfully");
      }

      setModalMode(null);
      fetchData(page, pageSize);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    lastNames: filteredData,
    total,
    isLoading,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    isAdmin,
    
    modalMode, setModalMode,
    selectedItem,
    
    alertMessage, setAlertMessage,
    
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit
  };
};