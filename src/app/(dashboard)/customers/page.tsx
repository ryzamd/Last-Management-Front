"use client";
import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
import { useCustomers } from "@/hooks/useCustomers";
import { customerStyles } from "@/styles/customer.styles";
import CustomerTable from "@/components/features/customers/CustomerTable";
import CustomerModal from "@/components/features/customers/CustomerModal";
import AlertModal from "@/components/common/AlertModal";
import Link from "next/link";

export default function CustomersPage() {
  const {
    customers,
    total,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    isAdmin,
    
    modalMode, setModalMode,
    selectedCustomer,
    relatedLastNames,
    isFetchingDetails,
    
    alertMessage, setAlertMessage,
    
    handleOpenDetails,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit
  } = useCustomers();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={customerStyles.pageWrapper}>
      {/* 1. Top Navigation: Back to Dashboard */}
      <div className={customerStyles.navigation.container}>
        <Link href="/" className={customerStyles.navigation.link}>
          <div className={customerStyles.navigation.iconBox}>
            <FaRocket className={customerStyles.navigation.icon} />
          </div>
          <span className={customerStyles.navigation.brandName}>LAST MANAGEMENT</span>
        </Link>
      </div>

      {/* 2. Table Header: Title + Actions (Nằm ngay trên table) */}
      <div className={customerStyles.tableHeader.container}>
        <div className={customerStyles.tableHeader.titleWrapper}>
          <h1 className={customerStyles.tableHeader.title}>CUSTOMERS</h1>
        </div>
        
        <div className={customerStyles.tableHeader.actions}>
          <div className={customerStyles.tableHeader.searchBox}>
            <FaMagnifyingGlass className={customerStyles.tableHeader.searchIcon} />
            <input
              type="text"
              placeholder="Search customers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={customerStyles.tableHeader.searchInput}
            />
          </div>
          
          {isAdmin && (
            <button onClick={handleOpenCreate} className={customerStyles.tableHeader.createBtn}>
              <FaPlus /> Create
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <CustomerTable
        data={customers}
        isAdmin={isAdmin}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onView={handleOpenDetails}
      />

      {/* Pagination */}
      <div className={customerStyles.pagination.container}>
        <div className="flex items-center">
          <span className={customerStyles.pagination.info}>
            Showing {(page - 1) * pageSize + 1} of {total} entries
          </span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className={customerStyles.pagination.select}>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className={customerStyles.pagination.nav}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={customerStyles.pagination.pageBtn}>
            Previous
          </button>
          <span className="text-white font-bold">Page {page}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className={customerStyles.pagination.pageBtn}>
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <CustomerModal
        mode={modalMode}
        customer={selectedCustomer}
        lastNames={relatedLastNames}
        isLoadingDetails={isFetchingDetails}
        onClose={() => setModalMode(null)}
        onSubmit={handleSubmit}
      />

      <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)}/>
    </div>
  );
}