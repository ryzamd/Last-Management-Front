import { useState, useEffect, useMemo, useCallback } from 'react';
import { InventoryService } from '@/services/inventory.service';
import { InventoryItem } from '@/types/inventory';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';

export const useInventory = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<InventoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPage: number, currentSize: number) => {
      setIsLoading(true);
      try {
          const result = await InventoryService.getAll(currentPage, currentSize);
          setData(result.items);
          setTotal(result.total);
        } catch (error) {
          console.error("Failed to fetch inventory", error);
          toast.error("Failed to load inventory data");
        } finally {
            setIsLoading(false);
        }
  }, []);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [fetchData, page, pageSize]);

  // Updated Client-side filtering logic to match new fields
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item =>
        (item.lastCode?.toLowerCase().includes(lowerTerm) || false) ||
        (item.sizeLabel?.toLowerCase().includes(lowerTerm) || false) ||
        (item.locationName?.toLowerCase().includes(lowerTerm) || false)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setSelectedItem(null);
    setModalMode('create');
  };

  const handleOpenEdit = (item: InventoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleSubmit = async (formData: Partial<InventoryItem>) => {
    try {
      await InventoryService.create(formData);
      toast.success("Stock updated successfully!");

      setModalMode(null);
      fetchData(page, pageSize);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    items: filteredData,
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
    handleSubmit
  };
};