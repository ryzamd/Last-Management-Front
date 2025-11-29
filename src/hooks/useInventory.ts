import { useState, useEffect, useMemo, useCallback } from 'react';
import { InventoryService } from '@/services/inventory.service';
import { LocationService } from '@/services/location.service';
import { LastNameService } from '@/services/lastName.service';
import { LastSizeService } from '@/services/lastSize.service';
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
  
  // Dropdown Data
  const [locationOptions, setLocationOptions] = useState<{ value: string; label: string }[]>([]);
  const [lastNameOptions, setLastNameOptions] = useState<{ value: string; label: string }[]>([]);
  const [sizeOptions, setSizeOptions] = useState<{ value: string; label: string }[]>([]);

  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'adjust' | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Inventory Data
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

  // Fetch Master Data
  const fetchMasterData = useCallback(async () => {
    try {
      const [locRes, nameRes, sizeRes] = await Promise.all([
        LocationService.getAll(1, 100, undefined, true),
        LastNameService.getAll(1, 100, undefined, 'Active'),
        LastSizeService.getAll()
      ]);

      setLocationOptions(locRes.items.map(l => ({ value: l.id, label: l.locationName })));
      setLastNameOptions(nameRes.items.map(l => ({ value: l.id, label: `${l.lastCode} - ${l.article}` })));
      const sizes = Array.isArray(sizeRes) ? sizeRes : (sizeRes as any).items || [];
      setSizeOptions(sizes.map((s: any) => ({ value: s.id!, label: s.sizeLabel })));

    } catch (error) {
      console.error("Failed to load master data", error);
    }
  }, []);

  useEffect(() => {
    fetchData(page, pageSize);
    fetchMasterData();
  }, [fetchData, fetchMasterData, page, pageSize]);

  // Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item =>
        (item.lastCode?.toLowerCase().includes(lowerTerm) || false) ||
        (item.sizeLabel?.toLowerCase().includes(lowerTerm) || false) ||
        (item.locationName?.toLowerCase().includes(lowerTerm) || false)
    );
  }, [data, searchTerm]);

  // Handlers
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

  const handleOpenAdjust = (item: InventoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('adjust');
  };

  const handleSubmit = async (formData: Partial<InventoryItem>) => {
    try {
      await InventoryService.createOrUpdate(formData);
      const message = modalMode === 'create' ? "Stock created successfully!" : "Stock updated successfully!";
      toast.success(message);
      setModalMode(null);
      fetchData(page, pageSize);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleAdjustSubmit = async (id: string, quantityChange: number, type: string, reason: string) => {
    setIsSubmitting(true);
    try {
        await InventoryService.adjustStock(id, {
            quantityChange,
            movementType: type as any,
            reason
        });
        toast.success("Stock adjusted successfully!");
        setModalMode(null);
        fetchData(page, pageSize);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Adjustment failed");
    } finally {
        setIsSubmitting(false);
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
    locationOptions,
    lastNameOptions,
    sizeOptions,
    modalMode, setModalMode,
    selectedItem,
    isSubmitting,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenAdjust,
    handleSubmit,
    handleAdjustSubmit
  };
};