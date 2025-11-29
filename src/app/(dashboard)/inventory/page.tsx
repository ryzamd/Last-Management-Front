  "use client";
  import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
  import { useInventory } from "@/hooks/useInventory";
  import { inventoryStyles } from "@/styles/inventory.styles";
  import InventoryTable from "@/components/features/inventory/InventoryTable";
  import InventoryModal from "@/components/features/inventory/InventoryModal";
  import AdjustStockModal from "@/components/features/inventory/AdjustStockModal"; // New Import
  import Link from "next/link";

  export default function InventoryPage() {
    const {
      items,
      total,
      page, setPage,
      pageSize, setPageSize,
      searchTerm, setSearchTerm,
      isAdmin,
      locationOptions,
      lastNameOptions,
      sizeOptions,
      modalMode, setModalMode,
      selectedItem,
      isSubmitting,
      handleOpenCreate,
      handleOpenEdit,
      handleOpenAdjust,
      handleSubmit,
      handleAdjustSubmit
    } = useInventory();

    const totalPages = Math.ceil(total / pageSize);

    return (
      <div className={inventoryStyles.pageWrapper}>
        {/* 1. Navigation */}
        <div className={inventoryStyles.navigation.container}>
          <Link href="/" className={inventoryStyles.navigation.link}>
            <div className={inventoryStyles.navigation.iconBox}>
              <FaRocket className={inventoryStyles.navigation.icon} />
            </div>
            <span className={inventoryStyles.navigation.brandName}>LAST MANAGEMENT</span>
          </Link>
        </div>

        {/* 2. Header */}
        <div className={inventoryStyles.tableHeader.container}>
          <div className={inventoryStyles.tableHeader.titleWrapper}>
            <h1 className={inventoryStyles.tableHeader.title}>INVENTORY</h1>
          </div>
          
          <div className={inventoryStyles.tableHeader.actions}>
            <div className={inventoryStyles.tableHeader.searchBox}>
              <FaMagnifyingGlass className={inventoryStyles.tableHeader.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={inventoryStyles.tableHeader.searchInput}
              />
            </div>
            
            {isAdmin && (
              <button onClick={handleOpenCreate} className={inventoryStyles.tableHeader.createBtn}>
                <FaPlus /> Create
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <InventoryTable
          data={items}
          isAdmin={isAdmin}
          onEdit={handleOpenEdit}
          onAdjust={handleOpenAdjust}
        />

        {/* Pagination */}
        <div className={inventoryStyles.pagination.container}>
          <div className="flex items-center">
            <span className={inventoryStyles.pagination.info}>
              Showing {(page - 1) * pageSize + 1} of {total} items
            </span>
            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className={inventoryStyles.pagination.select}>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className={inventoryStyles.pagination.nav}>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={inventoryStyles.pagination.pageBtn}>
              Previous
            </button>
            <span className="text-white font-bold">Page {page}</span>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className={inventoryStyles.pagination.pageBtn}>
              Next
            </button>
          </div>
        </div>

        {/* Modals */}
        {/* Create / Edit Meta Data */}
        <InventoryModal
          mode={modalMode === 'create' || modalMode === 'edit' ? modalMode : null}
          item={selectedItem}
          locationOptions={locationOptions}
          lastNameOptions={lastNameOptions}
          sizeOptions={sizeOptions}
          onClose={() => setModalMode(null)}
          onSubmit={handleSubmit}
        />

        {/* Adjust Stock (Audit Trail) */}
        <AdjustStockModal
          isOpen={modalMode === 'adjust'}
          item={selectedItem}
          onClose={() => setModalMode(null)}
          onSubmit={handleAdjustSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }