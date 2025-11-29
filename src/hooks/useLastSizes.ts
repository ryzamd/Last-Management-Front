import { useState, useEffect, useMemo, useCallback } from 'react';
import { LastSizeService, LastSize } from '@/services/lastSize.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';

export const useLastSizes = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<LastSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<LastSize | null>(null);
  
  const sizeOptions = useMemo(() => {
    return data.map(s => ({ value: s.id!, label: s.sizeLabel }));
  }, [data]);

  const fetchData = useCallback(async () => {
      setIsLoading(true);
      try {
          const result = await LastSizeService.getAll();
          setData(result);
        } catch (error) {
          console.error("Failed to fetch last sizes", error);
          toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item =>
        item.sizeLabel.toLowerCase().includes(lowerTerm) ||
        item.sizeValue.toString().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setSelectedItem(null);
    setModalMode('create');
  };

  const handleOpenEdit = (item: LastSize, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this Size?")) return;

    try {
      await LastSizeService.delete(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete.");
    }
  };

  const handleSubmit = async (formData: Partial<LastSize>) => {
    try {
      if (modalMode === 'create') {
        await LastSizeService.create(formData);
        toast.success("New Size created!");
      } else if (modalMode === 'edit' && selectedItem?.id) {
        await LastSizeService.update(selectedItem.id, formData);
        toast.success("Updated successfully");
      }

      setModalMode(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    lastSizes: filteredData,
    isLoading,
    searchTerm, setSearchTerm,
    isAdmin,
    modalMode, setModalMode,
    selectedItem,
    sizeOptions,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit
  };
};