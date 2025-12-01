import { useState, useEffect, useMemo, useCallback } from 'react';
import { LastSizeService } from '@/services/lastSize.service';
import { LastNameService } from '@/services/lastName.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';
import { LastSize } from '@/types/lastSize';

export const useLastSizes = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<LastSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [lastNameMap, setLastNameMap] = useState<Record<string, string>>({});
  const [lastNameOptions, setLastNameOptions] = useState<{ value: string; label: string }[]>([]);

  // Filter State
  const [filterLastNameId, setFilterLastNameId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<LastSize | null>(null);
  
  const fetchData = useCallback(async () => {
      setIsLoading(true);
      try {
          const [sizesResult, namesResult] = await Promise.all([
            LastSizeService.getAll(),
            LastNameService.getAll(1, 1000)
          ]);

          setData(sizesResult);

          const map: Record<string, string> = {};
          const options = namesResult.items.map(ln => {
            map[ln.id] = ln.lastCode;
            return { value: ln.id, label: `${ln.lastCode} (${ln.article})` };
          });
          
          setLastNameMap(map);
          setLastNameOptions(options);

        } catch (error) {
          console.error("Failed to fetch data", error);
          toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const processedData = useMemo(() => {
    let result = [...data];

    if (filterLastNameId) {
        result = result.filter(item => item.lastNameId === filterLastNameId);
    }

    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(item =>
            item.sizeLabel.toLowerCase().includes(lowerTerm)
        );
    }

    result.sort((a, b) => {
        const nameA = lastNameMap[a.lastNameId] || '';
        const nameB = lastNameMap[b.lastNameId] || '';
        
        const nameCompare = nameA.localeCompare(nameB);
        if (nameCompare !== 0) return nameCompare;

        return a.sizeValue - b.sizeValue;
    });

    return result;
  }, [data, filterLastNameId, searchTerm, lastNameMap]);

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
    lastSizes: processedData,
    isLoading,
    searchTerm, setSearchTerm,
    filterLastNameId, setFilterLastNameId,
    lastNameOptions,
    lastNameMap,
    isAdmin,
    modalMode, setModalMode,
    selectedItem,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit
  };
};