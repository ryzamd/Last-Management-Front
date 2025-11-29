"use client";
import { FaMagnifyingGlass, FaPlus, FaRocket } from "react-icons/fa6";
import { useDepartments } from "@/hooks/useDepartments";
import { departmentStyles as styles } from "@/styles/department.styles";
import DepartmentTable from "@/components/features/departments/DepartmentTable";
import DepartmentModal from "@/components/features/departments/DepartmentModal";
import Link from "next/link";

export default function DepartmentsPage() {
  const {
    departments,
    searchTerm, setSearchTerm,
    isAdmin,
    isCreateOpen, setIsCreateOpen,
    handleOpenCreate,
    handleDelete,
    handleSubmit
  } = useDepartments();

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
          <h1 className={styles.tableHeader.title}>DEPARTMENTS</h1>
        </div>
        
        <div className={styles.tableHeader.actions}>
          <div className={styles.tableHeader.searchBox}>
            <FaMagnifyingGlass className={styles.tableHeader.searchIcon} />
            <input
              type="text"
              placeholder="Search"
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
      <DepartmentTable
        data={departments}
        isAdmin={isAdmin}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <DepartmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}