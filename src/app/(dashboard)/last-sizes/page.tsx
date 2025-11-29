"use client";
import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
import { useLastSizes } from "@/hooks/useLastSizes";
import { lastSizeStyles } from "@/styles/lastSize.styles";
import LastSizeTable from "@/components/features/lastSizes/LastSizeTable";
import LastSizeModal from "@/components/features/lastSizes/LastSizeModal";
import Link from "next/link";

export default function LastSizesPage() {
  const {
    lastSizes,
    searchTerm, setSearchTerm,
    isAdmin,
    modalMode, setModalMode,
    selectedItem,
    sizeOptions,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit
  } = useLastSizes();

  return (
    <div className={lastSizeStyles.pageWrapper}>
      {/* 1. Top Navigation */}
      <div className={lastSizeStyles.navigation.container}>
        <Link href="/" className={lastSizeStyles.navigation.link}>
          <div className={lastSizeStyles.navigation.iconBox}>
            <FaRocket className={lastSizeStyles.navigation.icon} />
          </div>
          <span className={lastSizeStyles.navigation.brandName}>LAST MANAGEMENT</span>
        </Link>
      </div>

      {/* 2. Table Header */}
      <div className={lastSizeStyles.tableHeader.container}>
        <div className={lastSizeStyles.tableHeader.titleWrapper}>
          <h1 className={lastSizeStyles.tableHeader.title}>LAST SIZES</h1>
        </div>
        
        <div className={lastSizeStyles.tableHeader.actions}>
          <div className={lastSizeStyles.tableHeader.searchBox}>
            <FaMagnifyingGlass className={lastSizeStyles.tableHeader.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={lastSizeStyles.tableHeader.searchInput}
            />
          </div>
          
          {isAdmin && (
            <button onClick={handleOpenCreate} className={lastSizeStyles.tableHeader.createBtn}>
              <FaPlus /> Create
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <LastSizeTable
        data={lastSizes}
        isAdmin={isAdmin}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <LastSizeModal
        mode={modalMode}
        item={selectedItem}
        sizeOptions={sizeOptions}
        onClose={() => setModalMode(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}