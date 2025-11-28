import { useState, useEffect, useMemo, useCallback } from 'react';
import { LocationService } from '@/services/location.service';
import { Location } from '@/types/location';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';

export const useLocations = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<Location[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<Location | null>(null);

  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPage: number, currentSize: number) => {
      setIsLoading(true);
      try {
          const result = await LocationService.getAll(currentPage, currentSize);
          setData(result.items);
          setTotal(result.total);
        } catch (error) {
          console.error("Failed to fetch locations", error);
          toast.error("Failed to load location data");
        } finally {
            setIsLoading(false);
        }
  }, []);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [fetchData, page, pageSize]);

  // Client-side filtering
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item => 
        item.locationName.toLowerCase().includes(lowerTerm) || 
        item.locationCode.toLowerCase().includes(lowerTerm) ||
        item.locationType.toLowerCase().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setSelectedItem(null);
    setModalMode('create');
  };

  const handleOpenEdit = (item: Location, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this location?")) return;

    try {
      await LocationService.delete(id);
      toast.success("Location deleted successfully");
      fetchData(page, pageSize);
    } catch (error: any) {
        // Handle constraint errors specially
        if (error.message.includes("Cannot delete") || error.response?.status === 409) {
            setAlertMessage(error.message || "Cannot delete location due to existing dependencies.");
        } else {
            toast.error("Failed to delete location.");
        }
    }
  };

  const handleSubmit = async (formData: Partial<Location>) => {
    try {
      if (modalMode === 'create') {
        await LocationService.create(formData);
        toast.success("New location created!");
      } else if (modalMode === 'edit' && selectedItem?.id) {
        await LocationService.update(selectedItem.id, formData);
        toast.success("Location updated successfully");
      }

      setModalMode(null);
      fetchData(page, pageSize);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    locations: filteredData,
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