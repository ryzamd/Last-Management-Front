"use client";
import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
import { useLocations } from "@/hooks/useLocations";
import { locationStyles } from "@/styles/location.styles";
import LocationTable from "@/components/features/locations/LocationTable";
import LocationModal from "@/components/features/locations/LocationModal";
import AlertModal from "@/components/common/AlertModal";
import Link from "next/link";

export default function LocationsPage() {
  const {
    locations,
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
  } = useLocations();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={locationStyles.pageWrapper}>
      {/* 1. Top Navigation */}
      <div className={locationStyles.navigation.container}>
        <Link href="/" className={locationStyles.navigation.link}>
          <div className={locationStyles.navigation.iconBox}>
            <FaRocket className={locationStyles.navigation.icon} />
          </div>
          <span className={locationStyles.navigation.brandName}>LAST MANAGEMENT</span>
        </Link>
      </div>

      {/* 2. Table Header */}
      <div className={locationStyles.tableHeader.container}>
        <div className={locationStyles.tableHeader.titleWrapper}>
          <h1 className={locationStyles.tableHeader.title}>LOCATIONS</h1>
        </div>
        
        <div className={locationStyles.tableHeader.actions}>
          <div className={locationStyles.tableHeader.searchBox}>
            <FaMagnifyingGlass className={locationStyles.tableHeader.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={locationStyles.tableHeader.searchInput}
            />
          </div>
          
          {isAdmin && (
            <button onClick={handleOpenCreate} className={locationStyles.tableHeader.createBtn}>
              <FaPlus /> Create
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <LocationTable
        data={locations}
        isAdmin={isAdmin}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className={locationStyles.pagination.container}>
        <div className="flex items-center">
          <span className={locationStyles.pagination.info}>
            Showing {(page - 1) * pageSize + 1} of {total} items
          </span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className={locationStyles.pagination.select}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className={locationStyles.pagination.nav}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={locationStyles.pagination.pageBtn}>
            Previous
          </button>
          <span className="text-white font-bold">Page {page}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className={locationStyles.pagination.pageBtn}>
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <LocationModal
        mode={modalMode}
        item={selectedItem}
        onClose={() => setModalMode(null)}
        onSubmit={handleSubmit}
      />

      <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)}/>
    </div>
  );
}