"use client";
import Link from "next/link";
import { FaPlus, FaRocket } from "react-icons/fa6";
import { usePurchaseOrderList } from "@/hooks/usePurchaseOrderList";
import { purchaseOrderStyles as styles } from "@/styles/purchaseOrder.styles";
import PurchaseOrderTable from "@/components/features/purchaseOrders/PurchaseOrderTable";
import PurchaseOrderModal from "@/components/features/purchaseOrders/PurchaseOrderModal";
import CustomSelect from "@/components/ui/CustomSelect";
import OrderActionModal from "@/components/features/purchaseOrders/OrderActionModal";

export default function PurchaseOrdersPage() {
  const {
    orders,
    total,
    page, setPage,
    pageSize, setPageSize,
    statusFilter, setStatusFilter,
    isAdmin,
    
    selectedOrder,
    isDetailOpen,
    
    actionModal,
    isProcessing,
    
    handleOpenDetail,
    handleCloseDetail,
    handleConfirm,
    handleDeny,
    handleCloseActionModal,
    handleSubmitAction
  } = usePurchaseOrderList();

  const totalPages = Math.ceil(total / pageSize);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Denied", label: "Denied" },
  ];

  return (
    <div className={styles.listPageWrapper}>
      {/* Navigation */}
      <div className="w-full flex justify-start items-center mb-6">
        <Link href="/" className="flex items-center gap-3 text-white/80 hover:text-white transition-all group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-space-500 to-space-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <FaRocket className="text-white text-lg" />
          </div>
          <span className="text-2xl font-phudu font-bold tracking-wider">LAST MANAGEMENT</span>
        </Link>
      </div>

      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-4">
        <div>
            <h1 className="text-3xl font-phudu font-bold text-white tracking-tight">PURCHASE ORDERS</h1>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Filter */}
            <div className="w-48">
                <CustomSelect
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                    placeholder="Filter Status"
                />
            </div>

            {/* Create Button */}
            <Link href="/purchase-orders/create" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-lg text-white font-grotesk font-bold text-sm transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                <FaPlus /> New Order
            </Link>
        </div>
      </div>

      {/* Main Table */}
      <PurchaseOrderTable
        data={orders}
        onView={handleOpenDetail}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center text-xs font-mono text-space-400 mt-4">
        <div className="flex items-center">
          <span>Showing {(page - 1) * pageSize + 1} of {total} entries</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-space-900 border border-space-700 rounded px-2 py-1 ml-3 focus:outline-none"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 rounded border border-space-700 hover:bg-space-800 disabled:opacity-50 transition-colors"
          >
            Prev
          </button>
          <span className="px-2 py-1 text-white font-bold">Page {page}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 rounded border border-space-700 hover:bg-space-800 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <PurchaseOrderModal
        isOpen={isDetailOpen}
        order={selectedOrder}
        isAdmin={isAdmin}
        isProcessing={isProcessing}
        onClose={handleCloseDetail}
        onConfirm={handleConfirm}
        onDeny={handleDeny}
      />

      {/* Action Modal (New) */}
      <OrderActionModal
        isOpen={actionModal.isOpen}
        type={actionModal.type}
        onClose={handleCloseActionModal}
        onSubmit={handleSubmitAction}
        isProcessing={isProcessing}
      />
    </div>
  );
}