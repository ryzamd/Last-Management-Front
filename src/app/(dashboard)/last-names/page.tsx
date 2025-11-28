"use client";
import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
import { useLastNames } from "@/hooks/useLastNames";
import { lastNameStyles } from "@/styles/lastName.styles";
import LastNameTable from "@/components/features/lastNames/LastNameTable";
import LastNameModal from "@/components/features/lastNames/LastNameModal";
import AlertModal from "@/components/common/AlertModal";
import Link from "next/link";

export default function LastNamesPage() {
  const {
    lastNames,
    total,
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
  } = useLastNames();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={lastNameStyles.pageWrapper}>
      {/* 1. Top Navigation */}
      <div className={lastNameStyles.navigation.container}>
        <Link href="/" className={lastNameStyles.navigation.link}>
          <div className={lastNameStyles.navigation.iconBox}>
            <FaRocket className={lastNameStyles.navigation.icon} />
          </div>
          <span className={lastNameStyles.navigation.brandName}>LAST MANAGEMENT</span>
        </Link>
      </div>

      {/* 2. Table Header */}
      <div className={lastNameStyles.tableHeader.container}>
        <div className={lastNameStyles.tableHeader.titleWrapper}>
          <h1 className={lastNameStyles.tableHeader.title}>LAST NAMES</h1>
        </div>
        
        <div className={lastNameStyles.tableHeader.actions}>
          <div className={lastNameStyles.tableHeader.searchBox}>
            <FaMagnifyingGlass className={lastNameStyles.tableHeader.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={lastNameStyles.tableHeader.searchInput}
            />
          </div>
          
          {isAdmin && (
            <button onClick={handleOpenCreate} className={lastNameStyles.tableHeader.createBtn}>
              <FaPlus /> Create
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <LastNameTable
        data={lastNames}
        isAdmin={isAdmin}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className={lastNameStyles.pagination.container}>
        <div className="flex items-center">
          <span className={lastNameStyles.pagination.info}>
            Showing {(page - 1) * pageSize + 1} of {total} items
          </span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className={lastNameStyles.pagination.select}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className={lastNameStyles.pagination.nav}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={lastNameStyles.pagination.pageBtn}>
            Previous
          </button>
          <span className="text-white font-bold">Page {page}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className={lastNameStyles.pagination.pageBtn}>
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <LastNameModal
        mode={modalMode}
        item={selectedItem}
        onClose={() => setModalMode(null)}
        onSubmit={handleSubmit}
      />

      <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)}/>
    </div>
  );
}