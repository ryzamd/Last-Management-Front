"use client";
import { FaRocket } from "react-icons/fa6";
import Link from "next/link";
import { useStockMovements } from "@/hooks/useStockMovements";
import { stockMovementStyles as styles } from "@/styles/stockMovement.styles";
import StockMovementTable from "@/components/features/stockMovements/StockMovementTable";
import StockMovementModal from "@/components/features/stockMovements/StockMovementModal";
import CustomSelect from "@/components/ui/CustomSelect";

export default function StockMovementsPage() {
  const {
    movements,
    total,
    page, setPage,
    pageSize, setPageSize,
    movementType, setMovementType,
    movementTypes,
    selectedMovement,
    isDetailOpen,
    isLoadingDetail,
    handleOpenDetail,
    handleCloseDetail
  } = useStockMovements();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Top Navigation */}
      <div className={styles.navigation.container}>
        <Link href="/" className={styles.navigation.link}>
          <div className={styles.navigation.iconBox}>
            <FaRocket className={styles.navigation.icon} />
          </div>
          <span className={styles.navigation.brandName}>LAST MANAGEMENT</span>
        </Link>
      </div>

      {/* 2. Header */}
      <div className={styles.tableHeader.container}>
        <div className={styles.tableHeader.titleWrapper}>
          <h1 className={styles.tableHeader.title}>STOCK HISTORY</h1>
        </div>
        
        <div className={styles.tableHeader.actions}>
          <div className="w-48">
            <CustomSelect
                value={movementType}
                onChange={setMovementType}
                options={movementTypes}
                placeholder="All Movements"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <StockMovementTable
        data={movements}
        onView={handleOpenDetail}
      />

      {/* Pagination */}
      <div className={styles.pagination.container}>
        <div className="flex items-center">
          <span className={styles.pagination.info}>
            Showing {(page - 1) * pageSize + 1} of {total} records
          </span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className={styles.pagination.select}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className={styles.pagination.nav}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={styles.pagination.pageBtn}>
            Previous
          </button>
          <span className="text-white font-bold">Page {page}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className={styles.pagination.pageBtn}>
            Next
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <StockMovementModal
        isOpen={isDetailOpen}
        movement={selectedMovement}
        isLoading={isLoadingDetail}
        onClose={handleCloseDetail}
      />
    </div>
  );
}