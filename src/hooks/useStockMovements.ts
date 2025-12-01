import { useState, useEffect, useCallback } from 'react';
import { StockMovementService } from '@/services/stockMovement.service';
import { useToast } from './useToast';
import { StockMovementDto } from '@/types/stockMovement';

export const useStockMovements = () => {
  const toast = useToast();

  const [data, setData] = useState<StockMovementDto[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [movementType, setMovementType] = useState<string>("");

  const [selectedMovement, setSelectedMovement] = useState<StockMovementDto | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  
  const movementTypes = [
    { value: "", label: "All Types" },
    { value: "Purchase", label: "Purchase" },
    { value: "Adjustment", label: "Adjustment" },
    { value: "Damage", label: "Damage" },
    { value: "Transfer", label: "Transfer" },
    { value: "Reserve", label: "Reserve" },
  ];

  const fetchData = useCallback(async () => {
      setIsLoading(true);
      try {
          const result = await StockMovementService.getAll(page, pageSize, movementType || undefined);
          setData(result.items);
          setTotal(result.total);
        } catch (error) {
          console.error("Failed to fetch stock movements", error);
          toast.error("Failed to load history");
        } finally {
            setIsLoading(false);
        }
  }, [page, pageSize, movementType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDetail = async (movement: StockMovementDto) => {
    setIsDetailOpen(true);
    setIsLoadingDetail(true);
    try {
        const detail = await StockMovementService.getById(movement.id);
        setSelectedMovement(detail || movement);
    } catch (error) {
        console.error("Failed to fetch movement detail", error);
        toast.error("Failed to load details");
        setSelectedMovement(movement);
    } finally {
        setIsLoadingDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedMovement(null);
  };

  return {
    movements: data,
    total,
    isLoading,
    page, setPage,
    pageSize, setPageSize,
    movementType, setMovementType,
    movementTypes,
    selectedMovement,
    isDetailOpen,
    isLoadingDetail,
    handleOpenDetail,
    handleCloseDetail,
    refresh: fetchData
  };
};