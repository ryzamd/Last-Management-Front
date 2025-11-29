import { useState, useEffect, useCallback } from 'react';
import { PurchaseOrderService } from '@/services/purchaseOrder.service';
import { PurchaseOrder } from '@/types/purchaseOrder';
import { useToast } from './useToast';
import { useAuthStore } from '@/store/useAuthStore';

export const usePurchaseOrderList = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';
  const toast = useToast();

  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Action Modal (Confirm/Deny) - New State
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    type: 'confirm' | 'deny' | null;
    orderId: string | null;
  }>({ isOpen: false, type: null, orderId: null });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await PurchaseOrderService.getAll(page, pageSize, statusFilter || undefined);
      setOrders(result.items);
      setTotal(result.total);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOpenDetail = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    setIsDetailOpen(false);
  };

  // Trigger mở modal Confirm
  const handleConfirm = (id: string) => {
    if (!isAdmin) return;
    setActionModal({ isOpen: true, type: 'confirm', orderId: id });
  };

  // Trigger mở modal Deny
  const handleDeny = (id: string) => {
    if (!isAdmin) return;
    setActionModal({ isOpen: true, type: 'deny', orderId: id });
  };

  const handleCloseActionModal = () => {
    setActionModal({ isOpen: false, type: null, orderId: null });
  };

  // Xử lý submit từ Modal
  const handleSubmitAction = async (reason?: string) => {
    const { type, orderId } = actionModal;
    if (!orderId || !type) return;

    setIsProcessing(true);
    try {
      if (type === 'confirm') {
        await PurchaseOrderService.confirm(orderId);
        toast.success("Order confirmed successfully");
      } else {
        await PurchaseOrderService.deny(orderId, reason || "");
        toast.success("Order denied");
      }
      
      handleCloseActionModal();
      handleCloseDetail(); // Đóng luôn detail nếu đang mở
      fetchOrders(); // Refresh list
    } catch (error: any) {
      toast.error(error.message || `Failed to ${type} order`);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    orders,
    total,
    isLoading,
    page, setPage,
    pageSize, setPageSize,
    statusFilter, setStatusFilter,
    isAdmin,
    
    selectedOrder,
    isDetailOpen,
    
    // Exposed for Action Modal
    actionModal,
    isProcessing,
    
    handleOpenDetail,
    handleCloseDetail,
    handleConfirm,
    handleDeny,
    handleCloseActionModal,
    handleSubmitAction,
    
    refresh: fetchOrders
  };
};