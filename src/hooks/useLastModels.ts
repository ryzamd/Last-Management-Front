import { useState, useEffect, useMemo, useCallback } from 'react';
import { LastModelService } from '@/services/lastModel.service';
import { LastModel, LastNameModel } from '@/types/lastModel';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';
import { LastNameService } from '@/services/lastName.service';

export const useLastModels = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<LastModel[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'associate' | null>(null);
  const [selectedItem, setSelectedItem] = useState<LastModel | null>(null);

  // Association Data
  const [linkedLastNames, setLinkedLastNames] = useState<LastNameModel[]>([]);
  const [availableLastNames, setAvailableLastNames] = useState<{value: string, label: string}[]>([]);
  const [isLinking, setIsLinking] = useState(false);

  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPage: number, currentSize: number) => {
      setIsLoading(true);
      try {
          const result = await LastModelService.getAll(currentPage, currentSize);
          setData(result.items);
          setTotal(result.total);
        } catch (error) {
          console.error("Failed to fetch models", error);
          toast.error("Failed to load model data");
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
        item.modelName.toLowerCase().includes(lowerTerm) ||
        (item.description?.toLowerCase().includes(lowerTerm) || false)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setSelectedItem(null);
    setModalMode('create');
  };

  const handleOpenEdit = (item: LastModel, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this Model?")) return;

    try {
      await LastModelService.delete(id);
      toast.success("Model deleted successfully");
      fetchData(page, pageSize);
    } catch (error: any) {
        if (error.message.includes("Cannot delete") || error.response?.status === 409) {
            setAlertMessage(error.message || "Cannot delete model due to existing dependencies.");
        } else {
            toast.error("Failed to delete model.");
        }
    }
  };

  const handleSubmit = async (formData: Partial<LastModel>) => {
    try {
      if (modalMode === 'create') {
        await LastModelService.create(formData);
        toast.success("New Model created!");
      } else if (modalMode === 'edit' && selectedItem?.id) {
        await LastModelService.update(selectedItem.id, formData);
        toast.success("Model updated successfully");
      }

      setModalMode(null);
      fetchData(page, pageSize);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleOpenAssociate = async (item: LastModel, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItem(item);
    setModalMode('associate');
    
    // Load linked data
    try {
        const [linked, all] = await Promise.all([
            LastModelService.getLastNamesByModel(item.id!),
            LastNameService.getAll(1, 100, undefined, 'Active') // Get active last names
        ]);
        
        setLinkedLastNames(linked);
        
        // Populate dropdown options
        setAvailableLastNames(all.items.map(ln => ({
            value: ln.id,
            label: `${ln.lastCode} (${ln.article})`
        })));

    } catch (error) {
        console.error("Failed to load associations", error);
        toast.error("Failed to load linked data");
    }
  };

  const handleLinkLastName = async (lastNameId: string) => {
    if (!selectedItem?.id) return;
    setIsLinking(true);
    try {
        await LastModelService.assignLastNameToModel(selectedItem.id, lastNameId);
        toast.success("Linked successfully");
        
        // Refresh linked list
        const updated = await LastModelService.getLastNamesByModel(selectedItem.id);
        setLinkedLastNames(updated);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to link LastName");
    } finally {
        setIsLinking(false);
    }
  };

  const handleUnlinkLastName = async (lastNameId: string) => {
    if (!selectedItem?.id) return;
    if (!window.confirm("Unlink this LastName?")) return;

    try {
        await LastModelService.removeLastNameFromModel(selectedItem.id, lastNameId);
        toast.success("Unlinked successfully");
        
        // Refresh linked list
        const updated = await LastModelService.getLastNamesByModel(selectedItem.id);
        setLinkedLastNames(updated);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to unlink. Check inventory dependencies.");
    }
  };

  return {
    models: filteredData,
    total,
    isLoading,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    isAdmin,
    modalMode, setModalMode,
    selectedItem,
    linkedLastNames,
    availableLastNames,
    isLinking,
    alertMessage, setAlertMessage,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit,
    handleOpenAssociate,
    handleLinkLastName,
    handleUnlinkLastName
  };
};