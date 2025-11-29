import { useState, useEffect, useMemo, useCallback } from 'react';
import { DepartmentService, Department } from '@/services/department.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from './useToast';

export const useDepartments = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [data, setData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchData = useCallback(async () => {
      setIsLoading(true);
      try {
          const result = await DepartmentService.getAll();
          setData(result);
        } catch (error) {
          console.error("Failed to fetch departments", error);
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
        item.departmentName.toLowerCase().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    if (!window.confirm("Are you sure you want to delete this Department?")) return;

    try {
      await DepartmentService.delete(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete.");
    }
  };

  const handleSubmit = async (formData: Partial<Department>) => {
    try {
      await DepartmentService.create(formData);
      toast.success("New Department created!");
      setIsCreateOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return {
    departments: filteredData,
    isLoading,
    searchTerm, setSearchTerm,
    isAdmin,
    isCreateOpen, setIsCreateOpen,
    handleOpenCreate,
    handleDelete,
    handleSubmit
  };
};