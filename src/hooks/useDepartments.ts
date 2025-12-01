import { useState, useEffect, useMemo, useCallback } from 'react';
import { Department } from '@/types/department';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';
import { DepartmentService } from '@/services/department.service';

export const useDepartments = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<Department[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<Department | null>(null);

  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPage: number, currentSize: number) => {
      setIsLoading(true);
      try {
          const result = await DepartmentService.getAll(currentPage, currentSize);
          setData(result.items);
          setTotal(result.total);
        } catch (error) {
          console.error("Failed to fetch departments", error);
          toast.error("Failed to load department data");
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
        item.departmentName.toLowerCase().includes(lowerTerm) ||
        item.departmentCode.toLowerCase().includes(lowerTerm) ||
        item.departmentType.toLowerCase().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setSelectedItem(null);
    setModalMode('create');
  };

  const handleOpenEdit = (item: Department, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      await DepartmentService.delete(id);
      toast.success("Department deleted successfully");
      fetchData(page, pageSize);
    } catch (error: any) {
        // Handle constraint errors specially
        if (error.message.includes("Cannot delete") || error.response?.status === 409) {
            setAlertMessage(error.message || "Cannot delete department due to existing dependencies.");
        } else {
            toast.error("Failed to delete department.");
        }
    }
  };

  const handleSubmit = async (formData: Partial<Department>) => {
    try {
      if (modalMode === 'create') {
        await DepartmentService.create(formData);
        toast.success("New department created!");
      } else if (modalMode === 'edit' && selectedItem?.id) {
        await DepartmentService.update(selectedItem.id, formData);
        toast.success("Department updated successfully");
      }

      setModalMode(null);
      fetchData(page, pageSize);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    departments: filteredData,
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