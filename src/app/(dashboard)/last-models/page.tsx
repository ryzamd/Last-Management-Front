"use client";
import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
import { useLastModels } from "@/hooks/useLastModels";
import { lastModelStyles as styles } from "@/styles/lastModel.styles";
import LastModelTable from "@/components/features/lastModels/LastModelTable";
import LastModelModal from "@/components/features/lastModels/LastModelModal";
import ModelAssociationModal from "@/components/features/lastModels/ModelAssociationModal";
import AlertModal from "@/components/common/AlertModal";
import Link from "next/link";

export default function LastModelsPage() {
  const {
    models,
    total,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    isAdmin,
    modalMode, setModalMode,
    selectedItem,
    linkedLastNames,
    availableLastNames,
    isLinking,
    alertMessage, setAlertMessage,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleSubmit,
    handleOpenAssociate,
    handleLinkLastName,
    handleUnlinkLastName
  } = useLastModels();

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

      {/* 2. Table Header */}
      <div className={styles.tableHeader.container}>
        <div className={styles.tableHeader.titleWrapper}>
          <h1 className={styles.tableHeader.title}>LAST MODELS</h1>
        </div>
        
        <div className={styles.tableHeader.actions}>
          <div className={styles.tableHeader.searchBox}>
            <FaMagnifyingGlass className={styles.tableHeader.searchIcon} />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.tableHeader.searchInput}
            />
          </div>
          
          {isAdmin && (
            <button onClick={handleOpenCreate} className={styles.tableHeader.createBtn}>
              <FaPlus /> Create
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <LastModelTable
        data={models}
        isAdmin={isAdmin}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onAssociate={handleOpenAssociate}
      />

      {/* Pagination */}
      <div className={styles.pagination.container}>
        <div className="flex items-center">
          <span className={styles.pagination.info}>
            Showing {(page - 1) * pageSize + 1} of {total} items
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

      {/* Modals */}
      {/* Create / Edit Modal */}
      <LastModelModal
        mode={modalMode === 'create' || modalMode === 'edit' ? modalMode : null}
        item={selectedItem}
        onClose={() => setModalMode(null)}
        onSubmit={handleSubmit}
      />

      {/* Association Modal */}
      <ModelAssociationModal
        isOpen={modalMode === 'associate'}
        model={selectedItem}
        linkedLastNames={linkedLastNames}
        availableLastNames={availableLastNames}
        isLinking={isLinking}
        onClose={() => setModalMode(null)}
        onLink={handleLinkLastName}
        onUnlink={handleUnlinkLastName}
      />

      <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)}/>
    </div>
  );
}